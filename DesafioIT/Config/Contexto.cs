using Microsoft.EntityFrameworkCore;

namespace DesafioIT.Config
{
    public class Contexto: DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Model.Diretorio> Diretorio { get; set; }
        public DbSet<Model.FormaGeometrica> FormaGeometrica { get; set; }

    }
}
