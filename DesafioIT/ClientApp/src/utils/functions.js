
import { QUADRADO, TRIANGULO } from "../constants/enums";

export const formaGeometricoTipo = (tipo) => {
  switch(tipo){
    case QUADRADO:
      return 'Quadrado';
    case TRIANGULO:
      return 'Triângulo';
    default:
      return 'Forma não definida';
  }
}