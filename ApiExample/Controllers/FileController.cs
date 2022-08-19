using ApiExample.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiExample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm]FileModel file, CancellationToken cancellationToken)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot",file.Name != null ? $"{file.Name}{Path.GetExtension(file.FormFile.FileName)}": file.FormFile.FileName);
                using Stream stream = new FileStream(path, FileMode.Create);
                await file.FormFile.CopyToAsync(stream, cancellationToken);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);


            }
        }
    }
}
