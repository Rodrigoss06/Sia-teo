import { prisma } from "@/lib/prisma";
import {  TRS_Boleta_Pago } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  boletas_pagos?: TRS_Boleta_Pago[];
  boleta_pago?:TRS_Boleta_Pago
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const boletas:TRS_Boleta_Pago[] = await prisma.tRS_Boleta_Pago.findMany()
                res.status(200).json({message:"get boletas", boletas_pagos:boletas})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:`Error fetching boletas: ${error}`})
            }
            break;
        case "POST":
            try {
                const newBoleta = JSON.parse(req.body.data)
                const newBoletaPago = await prisma.tRS_Boleta_Pago.create({data:newBoleta})
                res.status(200).json({message:"POST boletas de pago", boleta_pago:newBoletaPago})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:`Error fetching boletas de pago: ${error}`})
            }
            break;
        default:
            break;
    }
}
