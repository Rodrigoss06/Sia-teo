import { prisma } from "@/lib/prisma";
import {  TRS_Boleta_Pago_Detalle } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  boletas_pagos?: TRS_Boleta_Pago_Detalle[];
  boleta_pago?:TRS_Boleta_Pago_Detalle
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const boletas:TRS_Boleta_Pago_Detalle[] = await prisma.tRS_Boleta_Pago_Detalle.findMany()
                console.log(boletas)
                res.status(200).json({message:"get boletas", boletas_pagos:boletas})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching boletas"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.data)
                const newBoleta = JSON.parse(req.body.data)
                console.log(newBoleta)
                const newBoletaPago = await prisma.tRS_Boleta_Pago_Detalle.create({data:newBoleta})
                console.log(newBoletaPago)
                res.status(200).json({message:"POST boletas de pago", boleta_pago:newBoletaPago})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching boletas de pago"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT boletas de pago"})
            } catch (error) {
                res.status(500).json({error:"Error fetching boletas de pago"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE boletas de pago"})
            } catch (error) {
                res.status(500).json({error:"Error fetching boletas de pago"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}
