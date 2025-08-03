using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// Frontend tarafında hata yönetimini ve interceptor'ları test etmek için kullanılan sahte (mock) hata endpoint'leri.
[ApiController]
[Route("/api/[controller]")]
public class ErrorController : ControllerBase
{
    // 404 Not Found durumunu test etmek için. (Örn: bulunamayan bir ürün sayfası)
    [HttpGet("not-found")]
    public IActionResult NotFoundError()
    {
        return NotFound(); // Standart 404 yanıtı döner.
    }

    // 400 Bad Request durumunu test etmek için. (Örn: anlamsız bir istek)
    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest(); // Standart 400 yanıtı döner.
    }

    // 401 Unauthorized durumunu test etmek için. (Örn: token gerektiren bir sayfaya yetkisiz erişim)
    [HttpGet("unauthorized")]
    public IActionResult UnAuthorizedError()
    {
        return Unauthorized(); // Standart 401 yanıtı döner.
    }

    // Model validasyon hatası (400) durumunu test etmek için. (Örn: kayıt formundaki eksik/yanlış bilgi)
    [HttpGet("validation-error")]
    public IActionResult ValidationError()
    {
        // Hata listesine manuel olarak birkaç örnek ekleniyor.
        ModelState.AddModelError("validation error 1", "Bu birinci zorunlu alan hatası.");
        ModelState.AddModelError("validation error 2", "Bu da ikinci hata detayı.");
        // ModelState'teki hataları içeren standart bir ValidationProblem yanıtı döner.
        return ValidationProblem();
    }

    // 500 Internal Server Error durumunu test etmek için.
    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        // Kasıtlı olarak bir exception fırlatılır.
        // Bu hatanın projedeki ExceptionMiddleware tarafından yakalanıp işlenmesi beklenir.
        throw new Exception("Bu, sunucu tarafında oluşan bir hata simülasyonudur.");
    }
}