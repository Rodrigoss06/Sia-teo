import { prisma } from "@/lib/prisma";
import { TRS_Aportaciones } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  aportaciones?: TRS_Aportaciones[],
  aportacion?:TRS_Aportaciones
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            try {
                const aportaciones:TRS_Aportaciones[] = await prisma.tRS_Aportaciones.findMany()
                console.log(aportaciones)
                res.status(200).json({message:"get aportaciones", aportaciones:aportaciones})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
        case "POST":
            try {
                console.log(req.body.data)
                const aportacion = JSON.parse(req.body.data)
                console.log(aportacion)
                const newAportacion = await prisma.tRS_Aportaciones.create({data:aportacion})
                console.log(newAportacion)
                res.status(200).json({message:"POST aportaciones",aportacion:newAportacion})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
        case "PUT":
            try {
                res.status(200).json({message:"PUT aportaciones"})
            } catch (error) {
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
        case "DELETE":
            try {
                res.status(200).json({message:"DELETE aportaciones"})
            } catch (error) {
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
    
        default:
            break;
    }
}

