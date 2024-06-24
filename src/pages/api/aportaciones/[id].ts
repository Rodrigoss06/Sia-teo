import { prisma } from "@/lib/prisma";
import { TRS_Aportaciones } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  aportaciones?: TRS_Aportaciones
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        const { id } = req.query
        const aportaciones = await prisma.tRS_Aportaciones.findFirst({where:{
            ID_APORTACIONES: Number(id)
        }})
        console.log(aportaciones)
        res.status(200).json({message:"get aportaciones", aportaciones:aportaciones!})

    } else if (req.method === "DELETE") {
      const { id } = req.query
      const aportaciones = await prisma.tRS_Aportaciones.delete ({where:{
          ID_APORTACIONES: Number(id)
      }})
      console.log(aportaciones)
      res.status(200).json({message:"get aportaciones", aportaciones:aportaciones!})
    }
}

