//Librerias
var joi = require('joi');
//Metodo para el schema de validacion de que  cada objeto antes de tocar la peticion se valide con el formato que le corresponde
var usersSchema = joi.object().keys({
    ID: joi.string(),
    NAME: joi.string(),
    LASTNAME: joi.string(),
    MLASTNAME: joi.string(),
    EMAIL: joi.string().email(),
    CARD: joi.number(),
    AMOUNT: joi.number().precision(2),
    AMOUNCREDIT: joi.number().precision(2)
});
  
module.exports = usersSchema