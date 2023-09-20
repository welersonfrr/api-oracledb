import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { Order } from "../models/order.model";
import { Veiculo } from "../models/veiculo.model";

dotenv.config();

let conn;
const oracledb = require("oracledb");
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectString: process.env.DB_ORACLE_CONNECT_STRING,
};

export class VeiculoController {
  public async getVeiculo(req: Request, res: Response) {
    try {
      const { placa } = req.query;
      conn = await oracledb.getConnection(config);

      const query = await conn.execute(
        `
        SELECT 
            TRIM(DA3_COD) DA3_COD, TRIM(DA3_X_PLA2) DA3_X_PLA2, TRIM(DA3_DESC) DA3_DESC,
            TRIM(DUT_DESCRI) DUT_DESCRI, TRIM(DA4_NOME) DA4_NOME
        FROM DA3010
        LEFT JOIN DUT010
            ON DA3_TIPVEI = DUT_TIPVEI
            AND DUT010.D_E_L_E_T_ <> '*'
        LEFT JOIN DA4010
            ON DA3_MOTORI = DA4_COD
            AND DA4010.D_E_L_E_T_ <> '*'

        WHERE (TRIM(DA3_COD) = :PLACA OR TRIM(DA3_PLACA) = :PLACA)
        AND DA3010.D_E_L_E_T_ <> '*'
        `,
        {
          PLACA: placa,
        }
      );
      const data = new Veiculo(
        query.rows[0][0],
        query.rows[0][1],
        query.rows[0][2],
        query.rows[0][3],
        query.rows[0][4]
      );
      return res.status(200).send({
        sucess: true,
        msg: "Veiculo controller",
        data: data,
      });
    } catch (error: any) {
      return res.status(500).send({
        sucess: false,
        msg: error.toString(),
      });
    }
  }
}
