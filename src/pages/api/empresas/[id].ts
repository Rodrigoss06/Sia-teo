import { prisma } from "@/lib/prisma";
import { MAE_Empresa } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  empresa?: MAE_Empresa
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        console.log(req.query)
        const { id } = req.query
        console.log(id)
        const empresa = await prisma.mAE_Empresa.findFirst({where:{
            ID_EMPRESA: String(id)
        }})
        console.log(empresa)
        res.status(200).json({message:"get empresa", empresa:empresa!})

    }
}

