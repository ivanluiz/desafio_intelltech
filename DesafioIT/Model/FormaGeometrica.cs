using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DesafioIT.Model
{
    [Table("FormaGeometrica")]
    public class FormaGeometrica
    {
        [Column("Id")]
        public Guid Id { get; set; }
        [Column("Nome")]
        public string Nome { get; set; }
        [Column("Tipo")]
        public Enum.Tipo Tipo { get; set; }
        [Column("Cor")]
        public string Cor { get; set; }
        [Column("Tamanho")]
        public int Tamanho { get; set; }

        [ForeignKey("DiretorioId")]
        public Diretorio Diretorio { get; set; }

        [Column("DiretorioId")]
        public Guid DiretorioId { get; set; }

        public FormaGeometrica()
        {
            this.Id = Guid.NewGuid();
        }
    }
}
