import { prisma } from "@/lib/prisma";
import { MAE_Trabajadores } from "@prisma/client";
import { error } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  empleados?: MAE_Trabajadores[]
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const empleados:MAE_Trabajadores[] = await prisma.mAE_Trabajadores.findMany()
                console.log(empleados)
                res.status(200).json({message:"get empleados", empleados:empleados})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching empleados"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.newEmpleado)
                const empleado = JSON.parse(req.body.newEmpleado)
                console.log(empleado)
                const newEmpleado = await prisma.mAE_Trabajadores.create({data:empleado})
                console.log(newEmpleado)
                res.status(200).json({message:"POST empleados"})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching empleados"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT empleados"})
            } catch (error) {
                res.status(500).json({error:"Error fetching empleados"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE empleados"})
            } catch (error) {
                res.status(500).json({error:"Error fetching empleados"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}

