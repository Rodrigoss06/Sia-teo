import { prisma } from "@/lib/prisma";
import { MAE_Empleado } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  empleado?: MAE_Empleado
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        console.log(req.query)
        const { id } = req.query
        console.log(id)
        const empleado = await prisma.mAE_Empleado.findFirst({where:{
            ID_EMPLEADO: Number(id)
        }})
        console.log(empleado)
        res.status(200).json({message:"get Empleado", empleado:empleado!})

    }
}


