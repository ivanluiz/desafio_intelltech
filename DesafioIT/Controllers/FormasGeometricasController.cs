using DesafioIT.Config;
using DesafioIT.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormasGeometricasController : ControllerBase
    {
        private readonly Contexto _context;

        public FormasGeometricasController(Contexto context)
        {
            _context = context;
        }

        // GET: api/FormasGeometricas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormaGeometrica>>> GetFormaGeometrica()
        {
            return await _context.FormaGeometrica.ToListAsync();
        }

        // GET: api/FormasGeometricas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FormaGeometrica>> GetFormaGeometrica(Guid id)
        {
            var formaGeometrica = await _context.FormaGeometrica.FindAsync(id);

            if (formaGeometrica == null)
            {
                return NotFound();
            }

            return formaGeometrica;
        }

        // PUT: api/FormasGeometricas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormaGeometrica(Guid id, FormaGeometrica formaGeometrica)
        {
            if (id != formaGeometrica.Id)
            {
                return BadRequest();
            }

            _context.Entry(formaGeometrica).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormaGeometricaExists(id))
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

        // POST: api/FormasGeometricas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FormaGeometrica>> PostFormaGeometrica(FormaGeometrica formaGeometrica)
        {
            _context.FormaGeometrica.Add(formaGeometrica);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormaGeometrica", new { id = formaGeometrica.Id }, formaGeometrica);
        }

        // DELETE: api/FormasGeometricas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormaGeometrica(Guid id)
        {
            var formaGeometrica = await _context.FormaGeometrica.FindAsync(id);
            if (formaGeometrica == null)
            {
                return NotFound();
            }

            _context.FormaGeometrica.Remove(formaGeometrica);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FormaGeometricaExists(Guid id)
        {
            return _context.FormaGeometrica.Any(e => e.Id == id);
        }
    }
}
