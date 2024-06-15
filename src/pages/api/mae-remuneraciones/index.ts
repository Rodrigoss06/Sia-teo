import { prisma } from "@/lib/prisma";
import { MAE_Remuneraciones } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  remuneraciones?: MAE_Remuneraciones[],
  remuneracion?:MAE_Remuneraciones
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const remuneraciones:MAE_Remuneraciones[] = await prisma.mAE_Remuneraciones.findMany()
                console.log(remuneraciones)
                res.status(200).json({message:"get remuneraciones", remuneraciones:remuneraciones})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching remuneraciones"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.data)
                const remuneracion = JSON.parse(req.body.data)
                console.log(remuneracion)
                const newRemuneracion = await prisma.mAE_Remuneraciones.create({data:remuneracion})
                console.log(newRemuneracion)
                res.status(200).json({message:"POST remuneraciones",remuneracion:newRemuneracion})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching remuneraciones"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT remuneraciones"})
            } catch (error) {
                res.status(500).json({error:"Error fetching remuneraciones"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE remuneraciones"})
            } catch (error) {
                res.status(500).json({error:"Error fetching remuneraciones"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}

