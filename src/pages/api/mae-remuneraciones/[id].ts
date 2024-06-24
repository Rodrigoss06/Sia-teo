import { prisma } from "@/lib/prisma";
import { MAE_Remuneraciones } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  remuneracion?: MAE_Remuneraciones
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        console.log(req.query)
        const { id } = req.query
        console.log(id)
        const remuneracion = await prisma.mAE_Remuneraciones.findFirst({where:{
            ID_REMUNERACIONES: Number(id)
        }})
        console.log(remuneracion)
        res.status(200).json({message:"get remuneracion", remuneracion:remuneracion!})

    } else if (req.method === "DELETE") {
      console.log(req.query)
      const { id } = req.query
      console.log(id)
      const remuneracion = await prisma.mAE_Remuneraciones.delete({where:{
          ID_REMUNERACIONES: Number(id)
      }})
      console.log(remuneracion)
      res.status(200).json({message:"get remuneracion", remuneracion:remuneracion!})
      
    }
}

