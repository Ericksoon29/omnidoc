//Librerias
const UsersModel = require("../models/users");
const sqlConfig = require("../db/config");
const mysql = require("mysql");
const util = require("../util/util");

//Metodo para crear usuarios con la cuenta minima de 1,000
async function createUsers(req, res) {
  try {
    if (req.body.AMOUNT <= 1000) {
      res
        .status(500)
        .send({
          code: 500,
          message: "El monto debe ser minimo de $1,000",
          data: { errorDetail: error },
        });
    } else {
      const error = UsersModel.validate(req.body).error;
      if (error) {
        res
          .status(500)
          .send({
            code: 500,
            message:
              "Ocurrio un error al tratar de insertar el usuario, error de validacion",
            data: { errorDetail: error },
          });
      } else {
        const connection = mysql.createConnection(sqlConfig);
        connection.connect(function (err) {
          if (err) {
            res
              .status(500)
              .send({
                code: 500,
                message: "Ocurrio un error al tratar de insertar usuario",
                data: { errorDetail: error },
              });
          }
        });
        let insert =
          "INSERT into users (NAME, LASTNAME, MLASTNAME, EMAIL, CARD, AMOUNT, AMOUNCREDIT ) VALUES ('" +
          req.body.NAME +
          "','" +
          req.body.LASTNAME +
          "','" +
          req.body.MLASTNAME +
          "','" +
          req.body.EMAIL +
          "'," +
          req.body.CARD +
          "," +
          req.body.AMOUNT +
          "," +
          req.body.AMOUNT +
          ")";
        await connection.query(insert, function (err, result) {
          if (err) {
            res
              .status(500)
              .send({
                code: 500,
                message:
                  "Ocurrio un error al tratar de insertar usuario, error: ",
                data: { errorDetail: err },
              });
          } else {
            res
              .status(200)
              .send({
                code: 200,
                message:
                  "¡Felicidades tu cuenta ha sido de alta con un saldo de " +
                  req.body.AMOUNT +
                  " en tu cuenta de debito, tambien fue exitosa tu apertura de cuenta de credito con un saldo de " +
                  req.body.AMOUNT,
                data: {},
              });
          }
        });
      }
    }
  } catch (err) {
    res
      .status(500)
      .send({
        code: 500,
        message: "Ocurrio un error al tratar de insertar module",
        data: { errorDetail: err },
      });
  }
}

//Metodo para consultar saldo de cuentas credito y debito
async function consulAmount(req, res) {
  const error = UsersModel.validate(req.body).error;
  if (error) {
    res
      .status(500)
      .send({
        code: 500,
        message:
          "Ocurrio un error al tratar de insertar el usuario, error de validacion",
        data: { errorDetail: error },
      });
  } else {
    const connection = mysql.createConnection(sqlConfig);
    connection.connect(function (err) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario",
            data: { errorDetail: error },
          });
      }
    });
    let insert =
      "SELECT AMOUNT, AMOUNCREDIT FROM users WHERE CARD=" + req.body.CARD;
    console.log(insert);
    await connection.query(insert, function (err, result) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario, error: ",
            data: { errorDetail: err },
          });
      } else {
        console.log(result);
        res
          .status(200)
          .send({
            code: 200,
            message:
              "Su saldo al dia de hoy es de, Saldo debito: " +
              result[0].AMOUNT +
              " Saldo credito: " +
              result[0].AMOUNCREDIT,
            data: result,
          });
      }
    });
  }
}

//Metodo para quitar saldo de cuentas debito
async function removeAmount(req, res) {
  const error = UsersModel.validate(req.body).error;
  if (error) {
    res
      .status(500)
      .send({
        code: 500,
        message:
          "Ocurrio un error al tratar de insertar el usuario, error de validacion",
        data: { errorDetail: error },
      });
  } else {
    const connection = mysql.createConnection(sqlConfig);
    connection.connect(function (err) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario",
            data: { errorDetail: error },
          });
      }
    });
    let insert = "SELECT AMOUNT FROM users WHERE CARD = " + req.body.CARD;
    await connection.query(insert, async function (err, result) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario, error: ",
            data: { errorDetail: err },
          });
      } else {
        const sumaDinero = result[0].AMOUNT - req.body.AMOUNT;
        if (util.is_numeric(sumaDinero) && sumaDinero < 0) {
          res
            .status(500)
            .send({
              code: 500,
              message:
                "Ocurrio un error, no se puede retirar mas cantidad de la que tienes en tu cuenta",
              data: {},
            });
        } else {
          let insert =
            "UPDATE users SET AMOUNT = " +
            sumaDinero +
            " WHERE CARD = " +
            req.body.CARD;
          await connection.query(insert, function (error, result2) {
            if (error) {
              res
                .status(500)
                .send({
                  code: 500,
                  message:
                    "Ocurrio un error al tratar de insertar usuario, error: ",
                  data: { errorDetail: err },
                });
            } else {
              res
                .status(200)
                .send({
                  code: 200,
                  message:
                    "Se retiro correctamente la cantidad de " +
                    req.body.AMOUNT +
                    " tu saldo Cuenta Debito: " +
                    sumaDinero,
                  data: {},
                });
            }
          });
        }
      }
    });
  }
}

//Metodo para agregar fondos a mi cuenta de debito
async function addAmount(req, res) {
  const error = UsersModel.validate(req.body).error;
  if (error) {
    res
      .status(500)
      .send({
        code: 500,
        message:
          "Ocurrio un error al tratar de insertar el usuario, error de validacion",
        data: { errorDetail: error },
      });
  } else {
    const connection = mysql.createConnection(sqlConfig);
    connection.connect(function (err) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario",
            data: { errorDetail: error },
          });
      }
    });
    let insert = "SELECT AMOUNT FROM users WHERE CARD = " + req.body.CARD;
    await connection.query(insert, async function (err, result) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario, error: ",
            data: { errorDetail: err },
          });
      } else {
        const sumaDinero = result[0].AMOUNT + req.body.AMOUNT;
        let insert =
          "UPDATE users SET AMOUNT = " +
          sumaDinero +
          " WHERE CARD = " +
          req.body.CARD;
        await connection.query(insert, function (error, result2) {
          if (error) {
            res
              .status(500)
              .send({
                code: 500,
                message:
                  "Ocurrio un error al tratar de insertar usuario, error: ",
                data: { errorDetail: err },
              });
          } else {
            res
              .status(200)
              .send({
                code: 200,
                message:
                  "Se retiro correctamente la cantidad de " +
                  req.body.AMOUNT +
                  " tu saldo es: " +
                  sumaDinero,
                data: {},
              });
          }
        });
      }
    });
  }
}

//Metodo para quitar saldo de cuentas credito
async function removeAmountCredit(req, res) {
  const error = UsersModel.validate(req.body).error;
  if (error) {
    res
      .status(500)
      .send({
        code: 500,
        message:
          "Ocurrio un error al tratar de insertar el usuario, error de validacion",
        data: { errorDetail: error },
      });
  } else {
    const connection = mysql.createConnection(sqlConfig);
    connection.connect(function (err) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario",
            data: { errorDetail: error },
          });
      }
    });
    let insert = "SELECT AMOUNCREDIT FROM users WHERE CARD = " + req.body.CARD;
    await connection.query(insert, async function (err, result) {
      if (err) {
        res
          .status(500)
          .send({
            code: 500,
            message: "Ocurrio un error al tratar de insertar usuario, error: ",
            data: { errorDetail: err },
          });
      } else {
        const comision = req.body.AMOUNT + req.body.AMOUNT * 0.05;
        const sumaDinero = result[0].AMOUNCREDIT - comision;
        if (util.is_numeric(sumaDinero) && sumaDinero < 0) {
          res
            .status(500)
            .send({
              code: 500,
              message:
                "Ocurrio un error, no se puede retirar mas cantidad de la que tienes en tu cuenta, recuerda que por cada retiro se te cobrara 5%",
              data: {},
            });
        } else {
          let insert =
            "UPDATE users SET AMOUNT = " +
            sumaDinero +
            " WHERE CARD = " +
            req.body.CARD;
          await connection.query(insert, function (error, result2) {
            if (error) {
              res
                .status(500)
                .send({
                  code: 500,
                  message:
                    "Ocurrio un error al tratar de insertar usuario, error: ",
                  data: { errorDetail: err },
                });
            } else {
              res
                .status(200)
                .send({
                  code: 200,
                  message:
                    "Se retiro correctamente la cantidad de " +
                    req.body.AMOUNT +
                    " tu saldo Cuenta Debito: " +
                    sumaDinero,
                  data: {},
                });
            }
          });
        }
      }
    });
  }
}

module.exports = {
  createUsers,
  consulAmount,
  removeAmount,
  addAmount,
  removeAmountCredit,
};
