using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// Bu sınıfın bir API controller olduğunu ve rotasının "/api/cart" olacağını belirtir.
[ApiController]
[Route("/api/[controller]")]
public class CartController : ControllerBase
{
    // Veritabanı işlemleri için gerekli olan DataContext'i Dependency Injection ile alır.
    private readonly DataContext _context;
    public CartController(DataContext context)
    {
        _context = context;
    }

    // "api/cart" adresine gelen GET isteklerini karşılar ve kullanıcının sepetini döndürür.
    [HttpGet]
    public async Task<ActionResult<CartDTO>> GetCart()
    {
        // Kullanıcının sepetini bulur (veya oluşturur) ve onu DTO formatına çevirerek döndürür.
        return CartToDTO(await GetOrCreate(GetCustomerId()));
    }

    // "api/cart" adresine gelen POST isteklerini karşılar ve sepete yeni ürün ekler.
    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        // Önce kullanıcının sepetini alır veya oluşturur.
        var cart = await GetOrCreate(GetCustomerId());

        // Eklenmek istenen ürünü veritabanında bulur.
        var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);

        // Ürün veritabanında yoksa "Bulunamadı" (404 Not Found) hatası döndürür.
        if (product == null)
            return NotFound("the product is not in database");

        // Ürünü ve adedini sepet entity'sinin kendi metodunu kullanarak ekler.
        cart.AddItem(product, quantity);

        // Değişikliklerin veritabanına kaydedilip edilmediğini kontrol eder.
        var result = await _context.SaveChangesAsync() > 0;

        // Başarılı olursa, "201 Created" durum kodu ile güncel sepet bilgisini döndürür.
        if (result)
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));

        // Bir sorun oluşursa "Hatalı İstek" (400 Bad Request) hatası döndürür.
        return BadRequest(new ProblemDetails { Title = "The product can not be added to cart" });
    }

    // "api/cart" adresine gelen DELETE isteklerini karşılar ve sepetten ürün siler.
    [HttpDelete]
    public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        // Önce kullanıcının sepetini alır.
        var cart = await GetOrCreate(GetCustomerId());

        // Ürünü ve adedini sepet entity'sinin kendi metodunu kullanarak siler.
        cart.DeleteItem(productId, quantity);

        // Değişiklikleri veritabanına kaydeder.
        var result = await _context.SaveChangesAsync() > 0;

        // Başarılı olursa, güncel sepet bilgisini döndürür.
        if (result)
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));

        // Bir sorun oluşursa hata döndürür.
        return BadRequest(new ProblemDetails { Title = "Problem removing item from the cart" });
    }

    // O anki kullanıcının kimliğini (ID'sini) belirleyen özel bir metot.
    private string GetCustomerId()
    {
        // Eğer kullanıcı giriş yapmışsa kullanıcı adını, yapmamışsa tarayıcıdaki cookie'den "customerId"yi döndürür.
        return User.Identity?.Name ?? Request.Cookies["customerId"]!;
    }
    
    // Verilen 'custId'ye göre bir sepeti bulan; yoksa yeni bir sepet oluşturan yardımcı metot.
    private async Task<Cart> GetOrCreate(string custId)
    {
        // Veritabanında ilgili sepeti, içindeki ürünlerle birlikte (Include) arar.
        var cart = await _context.Carts
                        .Include(i => i.CartItems)
                        .ThenInclude(i => i.Product)
                        .Where(i => i.CustomerId == custId)
                        .FirstOrDefaultAsync();

        // Sepet bulunamazsa yeni bir tane oluşturur.
        if (cart == null)
        {
            // Giriş yapmış bir kullanıcı varsa onun adını, yoksa null alır.
            var customerId = User.Identity?.Name;

            // Eğer anonim bir kullanıcı ise (giriş yapmamışsa)...
            if (string.IsNullOrEmpty(customerId))
            {
                // Yeni bir benzersiz ID oluşturur ve bunu tarayıcıya 1 aylık bir cookie olarak kaydeder.
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };

                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }

            // Yeni sepeti bellekte oluşturur.
            cart = new Cart { CustomerId = customerId };

            // Yeni sepeti veritabanına ekler ve kaydeder.
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        // Bulunan veya yeni oluşturulan sepeti döndürür.
        return cart;
    }

    // Cart entity nesnesini, frontend'e gönderilecek olan CartDTO nesnesine dönüştüren yardımcı metot.
    private CartDTO CartToDTO(Cart cart)
    {
        return new CartDTO
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            // Sepetteki her bir CartItem'ı, bir CartItemDTO'ya dönüştürür.
            CartItems = cart.CartItems.Select(item => new CartItemDTO
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                Quantity = item.Quantity,
                ImageUrl = item.Product.ImageUrl
            }).ToList()
        };
    }
}