import { prisma } from "@/lib/prisma";
import { MAE_Descuentos } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
  message?: string;
  descuentos?: MAE_Descuentos[],
  descuento?:MAE_Descuentos
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(1)
    switch (req.method) {
        case "GET":
            try {
                const descuentos:MAE_Descuentos[] = await prisma.mAE_Descuentos.findMany()
                console.log(descuentos)
                res.status(200).json({message:"get descuentos", descuentos:descuentos})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching descuentos"})
            }
            break;
        case "POST":
            try {
                console.log(3)
                console.log(req.body.data)
                const descuento = JSON.parse(req.body.data)
                console.log(descuento)
                const newDescuento = await prisma.mAE_Descuentos.create({data:descuento})
                console.log(newDescuento)
                res.status(200).json({message:"POST descuentos", descuento:newDescuento})
            } catch (error) {
                console.log(error)
                res.status(500).json({error:"Error fetching descuentos"})
            }
            break;
        case "PUT":
            try {
                console.log(4)
                res.status(200).json({message:"PUT descuentos"})
            } catch (error) {
                res.status(500).json({error:"Error fetching descuentos"})
            }
            break;
        case "DELETE":
            try {
                console.log(6)
                res.status(200).json({message:"DELETE descuentos"})
            } catch (error) {
                res.status(500).json({error:"Error fetching descuentos"})
            }
            break;
    
        default:
            console.log(5)
            break;
    }
}

