using API.Data;
using API.DTO;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// Bu sınıfın bir API controller olduğunu ve rotasının "api/account" olacağını belirtir.
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase // API controller'ları için temel sınıf
{
    // ASP.NET Core Identity üzerinden kullanıcı yönetimi (kullanıcı bulma, parola kontrolü vb.) için kullanılır.
    private readonly UserManager<AppUser> _userManager;
    // JWT (JSON Web Token) oluşturmak için kullanılan özel servis.
    private readonly TokenService _tokenService;
    // Entity Framework Core veritabanı bağlamı, veritabanı işlemleri için kullanılır.
    private readonly DataContext _context;

    // Gerekli servisleri Dependency Injection ile alır (kullanıcı yönetimi, token servisi, veritabanı).
    public AccountController(UserManager<AppUser> userManager, TokenService tokenService, DataContext context)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _context = context;
    }

    // "api/account/login" adresine gelen HTTP POST isteklerini karşılar.
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO model)
    {
        // Veritabanında kullanıcı adına göre kullanıcıyı arar.
        var user = await _userManager.FindByNameAsync(model.UserName);

        // Kullanıcı bulunamazsa hata döndürür.
        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "username hatalı" });
        }

        // Kullanıcının girdiği parolanın doğru olup olmadığını kontrol eder.
        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        // Parola doğruysa...
        if (result)
        {
            // Kullanıcının veritabanında kayıtlı sepetini getirir veya oluşturur.
            var userCart = await GetOrCreate(model.UserName);
            // Kullanıcının tarayıcısındaki cookie'ye bağlı anonim sepetini getirir veya oluşturur.
            var cookieCart = await GetOrCreate(Request.Cookies["customerId"]!);

            // Eğer kullanıcının önceden bir sepeti varsa...
            if (userCart != null)
            {
                // Kullanıcının eski sepetindeki ürünleri, cookie sepetine taşır (sepet birleştirme).
                foreach (var item in userCart.CartItems)
                {
                    cookieCart.AddItem(item.Product, item.Quantity);
                }
                // Eski kullanıcı sepetini veritabanından siler.
                _context.Carts.Remove(userCart);
            }

            // Birleştirilmiş sepeti artık giriş yapan kullanıcıya atar.
            cookieCart.CustomerId = model.UserName;
            // Yapılan tüm değişiklikleri veritabanına kaydeder.
            await _context.SaveChangesAsync();

            // Başarılı bir şekilde giriş yapıldığını ve kullanıcı bilgilerini (token ile birlikte) döndürür.
            return Ok(new UserDTO
            {
                Name = user.Name!,
                Token = await _tokenService.GenerateToken(user)
            });
        }

        // Parola yanlışsa "Yetkisiz" (401 Unauthorized) hatası döndürür.
        return Unauthorized();
    }

    // CustomerId'ye göre bir sepeti getiren veya yoksa oluşturan özel bir metot.
    private async Task<Cart> GetOrCreate(string custId)
    {
        // Veritabanında ilgili sepeti, içindeki ürünlerle birlikte arar.
        var cart = await _context.Carts
                        .Include(i => i.CartItems)
                        .ThenInclude(i => i.Product)
                        .Where(i => i.CustomerId == custId)
                        .FirstOrDefaultAsync();

        // Sepet bulunamazsa yeni bir tane oluşturur.
        if (cart == null)
        {
            // Eğer giriş yapmış bir kullanıcı varsa onun adını alır.
            var customerId = User.Identity?.Name;

            // Eğer anonim bir kullanıcı ise (giriş yapmamışsa)...
            if (string.IsNullOrEmpty(customerId))
            {
                // Yeni bir benzersiz ID oluşturur ve bunu tarayıcıya cookie olarak kaydeder.
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1), // Cookie'nin geçerlilik süresi
                    IsEssential = true // Temel bir cookie olduğunu belirtir
                };

                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }

            // Yeni sepeti oluşturur.
            cart = new Cart { CustomerId = customerId };

            // Yeni sepeti veritabanına ekler ve kaydeder.
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        // Bulunan veya yeni oluşturulan sepeti döndürür.
        return cart;
    }

    // "api/account/register" adresine gelen HTTP POST isteklerini karşılar.
    [HttpPost("register")]
    public async Task<IActionResult> CreateUser(RegisterDTO model)
    {
        // Gelen modelin geçerlilik kurallarına (örn: required, email format) uyup uymadığını kontrol eder.
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Gelen bilgilerle yeni bir kullanıcı nesnesi oluşturur.
        var user = new AppUser
        {
            Name = model.Name,
            UserName = model.UserName,
            Email = model.Email
        };

        // Kullanıcıyı veritabanına kaydetmeye çalışır (parolayı hash'leyerek).
        var result = await _userManager.CreateAsync(user, model.Password);

        // Kayıt işlemi başarılı olursa...
        if (result.Succeeded)
        {
            // Yeni kullanıcıya "Customer" rolünü atar.
            await _userManager.AddToRoleAsync(user, "Customer");
            // Başarılı olduğunu belirten "201 Created" durum kodunu döndürür.
            return StatusCode(201);
        }

        // Kayıt başarısız olursa, hataları (örn: parola çok kısa) döndürür.
        return BadRequest(result.Errors);
    }

    // Bu endpoint'e sadece yetkili (giriş yapmış) kullanıcıların erişebileceğini belirtir.
    [Authorize]
    // "api/account/getuser" adresine gelen HTTP GET isteklerini karşılar.
    [HttpGet("getuser")]
    public async Task<ActionResult<UserDTO>> GetUser()
    {
        // Token'dan gelen bilgiye göre o anki giriş yapmış kullanıcıyı bulur.
        var user = await _userManager.FindByNameAsync(User.Identity?.Name!);

        // Kullanıcı bulunamazsa (güvenlik amaçlı kontrol) hata döndürür.
        if (user == null)
        {
            return BadRequest(new ProblemDetails { Title = "username ya da parola hatalı" });
        }

        // Kullanıcı bilgilerini ve yeni bir token'ı döndürür.
        return new UserDTO
        {
            Name = user.Name!,
            Token = await _tokenService.GenerateToken(user)
        };
    }
}