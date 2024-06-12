import { prisma } from "@/lib/prisma";
import { MAE_Horario_Laborado } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  horarios?: MAE_Horario_Laborado[],
  horario?:MAE_Horario_Laborado
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const horarios:MAE_Horario_Laborado[] = await prisma.mAE_Horario_Laborado.findMany()
                console.log(horarios)
                res.status(200).json({message:"get horarios", horarios:horarios})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching horarios"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.newHorario)
                const horario = JSON.parse(req.body.newHorario)
                console.log(horario)
                const newHorario = await prisma.mAE_Horario_Laborado.create({data:horario})
                console.log(newHorario)
                res.status(200).json({message:"POST horarios"})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching horarios"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT horarios"})
            } catch (error) {
                res.status(500).json({error:"Error fetching horarios"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE horarios"})
            } catch (error) {
                res.status(500).json({error:"Error fetching horarios"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}

