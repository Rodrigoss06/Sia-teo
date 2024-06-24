import { prisma } from "@/lib/prisma";
import { MAE_Descuentos } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  descuentos?: MAE_Descuentos
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        console.log(req.query)
        const { id } = req.query
        console.log(id)
        const descuentos = await prisma.mAE_Descuentos.findFirst({where:{
            ID_DESCUENTO: Number(id)
        }})
        console.log(descuentos)
        res.status(200).json({message:"get descuentos", descuentos:descuentos!})

    } else if (req.method === "DELETE") {
      console.log(req.query)
      const { id } = req.query
      console.log(id)
      const descuentos = await prisma.mAE_Descuentos.delete({where:{
          ID_DESCUENTO: Number(id)
      }})
      console.log(descuentos)
      res.status(200).json({message:"get descuentos", descuentos:descuentos!})
      
    }
}

