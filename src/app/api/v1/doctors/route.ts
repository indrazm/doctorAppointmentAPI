import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"

export async function GET(req: NextRequest) {
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

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { phoneNumber, fullName, poliId, schedule } = body
    const createDoctor = await prisma.doctor.create({
        data: {
            fullName,
            poliId,
            phoneNumber,
            schedule,
        },
    })

    if (!createDoctor) {
        return NextResponse.json({ status: 500, message: "Not able to create doctor..." })
    }

    return NextResponse.json({ status: 200, message: "Doctor data created succesfully", doctor: createDoctor })
}
