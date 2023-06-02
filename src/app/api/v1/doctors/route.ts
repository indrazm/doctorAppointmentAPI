import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"

export async function GET(req: NextRequest) {
    "use server"
    const doctorId = req.nextUrl.searchParams.get("doctorId")
    if (doctorId) {
        const doctor = await prisma.doctor.findFirst({
            where: {
                id: doctorId,
            },
            include: {
                poli: true,
            },
        })
        return NextResponse.json({ status: 200, message: "Fetch single successful", data: doctor })
    }

    const doctors = await prisma.doctor.findMany({
        include: {
            poli: true,
        },
    })
    return NextResponse.json({ status: 200, message: "Fetch successful", data: doctors })
}
