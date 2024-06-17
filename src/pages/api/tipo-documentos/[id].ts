import { prisma } from "@/lib/prisma";
import { MAE_Tipo_Documento } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  documentos?: MAE_Tipo_Documento
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        console.log(req.query)
        const { id } = req.query
        console.log(id)
        const documentos = await prisma.mAE_Tipo_Documento.findFirst({where:{
            ID_TIPO: Number(id)
        }})
        console.log(documentos)
        res.status(200).json({message:"get documentos", documentos:documentos!})

    }
}

