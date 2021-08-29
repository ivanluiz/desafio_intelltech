using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioIT.Model
{
    [Table("Diretorio")]
    public class Diretorio
    {
        [Column("Id")]
        public Guid Id { get; set; }
        [Column("Nome")]
        public string Nome { get; set; }

        public ICollection<FormaGeometrica> FormasGeometricas { get; set; }

        public Diretorio()
        {
            this.Id = Guid.NewGuid();
        }
    }
}
