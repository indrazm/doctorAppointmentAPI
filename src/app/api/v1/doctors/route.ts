import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"

export async function GET(req: NextRequest) {
    const doctors = await prisma.doctor.findMany({
        include: {
            poli: true,
        },
    })
    return NextResponse.json({ status: 200, message: "Fetch successful", data: doctors })
}
