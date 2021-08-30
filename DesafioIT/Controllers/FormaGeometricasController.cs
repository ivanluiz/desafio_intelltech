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
    public class FormaGeometricasController : ControllerBase
    {
        private readonly Contexto _context;

        public FormaGeometricasController(Contexto context)
        {
            _context = context;
        }

        // GET: api/FormaGeometricas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormaGeometrica>>> GetFormaGeometrica()
        {
            var formas = await _context.FormaGeometrica.ToListAsync();

            foreach (var item in formas)
            {
                var diretorio = await _context.Diretorio.FindAsync(item.DiretorioId);
                item.Diretorio = diretorio;
            }

            return formas;
        }

        // GET: api/FormaGeometricas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FormaGeometrica>> GetFormaGeometrica(Guid id)
        {
            var formaGeometrica = await _context.FormaGeometrica.FindAsync(id);

            var diretorio = await _context.Diretorio.FindAsync(formaGeometrica.DiretorioId);
            formaGeometrica.Diretorio = diretorio;

            if (formaGeometrica == null)
            {
                return NotFound();
            }

            return formaGeometrica;
        }

        // PUT: api/FormaGeometricas/5
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

        // POST: api/FormaGeometricas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FormaGeometrica>> PostFormaGeometrica(FormaGeometrica formaGeometrica)
        {
            var diretorio = await _context.Diretorio.FindAsync(formaGeometrica.DiretorioId);
            formaGeometrica.Diretorio = diretorio;

            _context.FormaGeometrica.Add(formaGeometrica);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetFormaGeometrica", new { id = formaGeometrica.Id }, formaGeometrica);
        }

        // DELETE: api/FormaGeometricas/5
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
