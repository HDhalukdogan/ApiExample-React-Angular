using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiExample.Data;
using ApiExample.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ApiExample.Hubs;
using System.Security.Claims;

namespace ApiExample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleEntitiesController : ControllerBase
    {
        private readonly ApiExampleContext _context;
        private readonly IHubContext<WorkHub> _hubContext;

        public SampleEntitiesController(ApiExampleContext context, IHubContext<WorkHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/SampleEntities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SampleEntity>>> GetSampleEntity()
        {
            // if (true)
            // {
            //     return BadRequest("test error");
            // }
            return await _context.SampleEntity.ToListAsync();
        }

        // GET: api/SampleEntities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SampleEntity>> GetSampleEntity(int id)
        {
            var sampleEntity = await _context.SampleEntity.FindAsync(id);

            if (sampleEntity == null)
            {
                return NotFound();
            }

            return sampleEntity;
        }

        // PUT: api/SampleEntities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSampleEntity(int id, SampleEntity sampleEntity)
        {
            if (id != sampleEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(sampleEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SampleEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSampleEntity", sampleEntity);
        }

        // POST: api/SampleEntities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Roles ="admin")]
        [HttpPost]
        public async Task<ActionResult<SampleEntity>> PostSampleEntity(SampleEntity sampleEntity)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _context.SampleEntity.Add(sampleEntity);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.User(userId).SendAsync("Created",$"Created From {userId}");
            //await _hubContext.Clients.All.SendAsync("Created","Created From User");
            return CreatedAtAction("GetSampleEntity", new { id = sampleEntity.Id }, sampleEntity);
        }

        // DELETE: api/SampleEntities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSampleEntity(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var sampleEntity = await _context.SampleEntity.FindAsync(id);
            if (sampleEntity == null)
            {
                return NotFound();
            }

            _context.SampleEntity.Remove(sampleEntity);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.User(userId).SendAsync("Deleted",$"Deleted From {userId}");
            return NoContent();
        }

        private bool SampleEntityExists(int id)
        {
            return _context.SampleEntity.Any(e => e.Id == id);
        }
    }
}
