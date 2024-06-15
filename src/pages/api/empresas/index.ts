import { prisma } from "@/lib/prisma";
import {  MAE_Empresa } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  empresas?: MAE_Empresa[];
  empresa?:MAE_Empresa
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const empresas:MAE_Empresa[] = await prisma.mAE_Empresa.findMany()
                console.log(empresas)
                res.status(200).json({message:"get empresas", empresas:empresas})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching empresas"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.data)
                const Empresa = JSON.parse(req.body.data)
                console.log(Empresa)
                const newEmpresa = await prisma.mAE_Empresa.create({data:Empresa})
                console.log(newEmpresa)
                res.status(200).json({message:"POST empresas de pago", empresa:newEmpresa})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching empresas de pago"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT empresas de pago"})
            } catch (error) {
                res.status(500).json({error:"Error fetching empresas de pago"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE empresas de pago"})
            } catch (error) {
                res.status(500).json({error:"Error fetching empresas de pago"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}
