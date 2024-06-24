import { prisma } from "@/lib/prisma";
import { TRS_Boleta_Pago_Detalle } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  boleta_pago?: TRS_Boleta_Pago_Detalle
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        console.log(req.query)
        const { id } = req.query
        console.log(id)
        const boleta_pago = await prisma.tRS_Boleta_Pago_Detalle.findFirst({where:{
            ID_BOLETA_PAGO_DETALLE: Number(id)
        }})
        console.log(boleta_pago)
        res.status(200).json({message:"get boleta_pago", boleta_pago:boleta_pago!})

    }else if (req.method === "DELETE") {
      console.log(req.query)
        const { id } = req.query
        console.log(id)
        const boleta_pago = await prisma.tRS_Boleta_Pago_Detalle.delete({where:{
            ID_BOLETA_PAGO_DETALLE: Number(id)
        }})
        console.log(boleta_pago)
        res.status(200).json({message:"get boleta_pago", boleta_pago:boleta_pago!})
    }
}

