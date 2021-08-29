using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DesafioIT.Config;
using DesafioIT.Model;

namespace DesafioIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiretoriosController : ControllerBase
    {
        private readonly Contexto _context;

        public DiretoriosController(Contexto context)
        {
            _context = context;
        }

        // GET: api/Diretorios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diretorio>>> GetDiretorio()
        {
            return await _context.Diretorio.ToListAsync();
        }

        // GET: api/Diretorios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Diretorio>> GetDiretorio(Guid id)
        {
            var diretorio = await _context.Diretorio.FindAsync(id);

            if (diretorio == null)
            {
                return NotFound();
            }

            return diretorio;
        }

        // PUT: api/Diretorios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiretorio(Guid id, [FromForm]Diretorio diretorio)
        {
            if (id != diretorio.Id)
            {
                return BadRequest();
            }

            _context.Entry(diretorio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiretorioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Diretorios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Diretorio>> PostDiretorio([FromForm]Diretorio diretorio)
        {
            _context.Diretorio.Add(diretorio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiretorio", new { id = diretorio.Id }, diretorio);
        }

        // DELETE: api/Diretorios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiretorio(Guid id)
        {
            var diretorio = await _context.Diretorio.FindAsync(id);
            if (diretorio == null)
            {
                return NotFound();
            }

            _context.Diretorio.Remove(diretorio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiretorioExists(Guid id)
        {
            return _context.Diretorio.Any(e => e.Id == id);
        }
    }
}
