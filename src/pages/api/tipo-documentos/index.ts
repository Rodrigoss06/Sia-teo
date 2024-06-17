import { prisma } from "@/lib/prisma";
import { MAE_Tipo_Documento } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  documentos?: MAE_Tipo_Documento[],
  documento?:MAE_Tipo_Documento
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const documentos:MAE_Tipo_Documento[] = await prisma.mAE_Tipo_Documento.findMany()
                console.log(documentos)
                res.status(200).json({message:"get documentos", documentos:documentos})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching documentos"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.data)
                const documento = JSON.parse(req.body.data)
                console.log(documento)
                const newdocumento = await prisma.mAE_Tipo_Documento.create({data:documento})
                console.log(newdocumento)
                res.status(200).json({message:"POST documentos",documento:newdocumento})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching documentos"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT documentos"})
            } catch (error) {
                res.status(500).json({error:"Error fetching documentos"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE documentos"})
            } catch (error) {
                res.status(500).json({error:"Error fetching documentos"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}

