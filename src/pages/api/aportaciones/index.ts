import { prisma } from "@/lib/prisma";
import { MAE_Aportaciones } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  aportaciones?: MAE_Aportaciones[],
  aportacion?:MAE_Aportaciones
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const aportaciones:MAE_Aportaciones[] = await prisma.mAE_Aportaciones.findMany()
                console.log(aportaciones)
                res.status(200).json({message:"get aportaciones", aportaciones:aportaciones})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.newAportacion)
                const aportacion = JSON.parse(req.body.newAportacion)
                console.log(aportacion)
                const newAportacion = await prisma.mAE_Aportaciones.create({data:aportacion})
                console.log(newAportacion)
                res.status(200).json({message:"POST aportaciones"})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT aportaciones"})
            } catch (error) {
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE aportaciones"})
            } catch (error) {
                res.status(500).json({error:"Error fetching aportaciones"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}

