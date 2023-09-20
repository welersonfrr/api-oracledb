import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { Order } from "../models/order.model";

dotenv.config();

let conn;
const oracledb = require("oracledb");
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectString: process.env.DB_ORACLE_CONNECT_STRING,
};

export class OrderController {
  public async getOrder(req: Request, res: Response) {
    try {
      const { filial, op } = req.query;
      conn = await oracledb.getConnection(config);

      const query = await conn.execute(
        `SELECT  
              C2_FILIAL FILIAL, C2_NUM OP, C2_PRODUTO CODIGO, NVL(B1_X_CODBE,'') CODBEL,   
              TRIM(B1_X_APELI) PRODUTO, NVL(B5_QE1,'0') QTDPAD, C2_X_LTCTL LOTE, C2_X_DTVLD DTVALIDADE 
         FROM SC2010 SC2 
         
         LEFT JOIN SB1010 SB1 
         ON SB1.D_E_L_E_T_ <> '*' 
         AND SB1.B1_COD = C2_PRODUTO 
         
         LEFT JOIN SB5010 SB5 
         ON SB5.D_E_L_E_T_ <> '*'  
         AND SB5.B5_COD = C2_PRODUTO 
         AND TRIM(SB5.B5_FILIAL) = SUBSTR(:FILIAL,0,2) 
         
         WHERE SC2.D_E_L_E_T_ <> '*' 
         AND C2_FILIAL = :FILIAL 
         AND C2_NUM = :OP `,
        {
          FILIAL: filial,
          OP: op,
        }
      );
      const data = new Order(
        query.rows[0][0],
        query.rows[0][1],
        query.rows[0][2],
        query.rows[0][3],
        query.rows[0][4],
        query.rows[0][5],
        query.rows[0][6],
        query.rows[0][7]
      );
      return res.status(200).send({
        sucess: true,
        msg: "Order controller",
        data: data,
      });
    } catch (error: any) {
      return res.status(500).send({
        sucess: false,
        msg: error.toString(),
        data: [],
      });
    }
  }
}
