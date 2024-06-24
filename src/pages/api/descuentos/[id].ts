import { prisma } from "@/lib/prisma";
import { TRS_Descuentos } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  descuento?: TRS_Descuentos
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        console.log(req.query)
        const { id } = req.query
        console.log(id)
        const descuento = await prisma.tRS_Descuentos.findFirst({where:{
            ID_DESCUENTO_TRANSACCIONAL: Number(id)
        }})
        console.log(descuento)
        res.status(200).json({message:"get descuento", descuento:descuento!})

    }else if (req.method === "DELETE") {
      console.log(req.query)
        const { id } = req.query
        console.log(id)
        const descuento = await prisma.tRS_Descuentos.delete({where:{
            ID_DESCUENTO_TRANSACCIONAL: Number(id)
        }})
        console.log(descuento)
        res.status(200).json({message:"get descuento", descuento:descuento!})
    }
}

