// Funcion para validar si el valor es numerico
function is_numeric(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
} 


module.exports = {
  is_numeric
}