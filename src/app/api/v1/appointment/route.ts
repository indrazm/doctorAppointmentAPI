import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"
import { generateRandomCharacters } from "@/lib/generateRandomStr"

export async function GET(req: NextRequest) {
    const appointmentId = req.nextUrl.searchParams.get("appointmentId")!
    if (appointmentId) {
        const appointment = await prisma.appointment.findFirst({
            where: {
                id: appointmentId,
            },
            include: {
                doctor: true,
                user: true,
            },
        })
        return NextResponse.json({ status: 200, message: "Fetch successful", data: appointment })
    }

    const appointment = await prisma.appointment.findMany({
        include: {
            doctor: true,
            user: true,
        },
    })

    return NextResponse.json({ status: 200, message: "Fetch successful", data: appointment })
}

export async function POST(req: NextRequest) {
    const id = generateRandomCharacters(6)
    const body = await req.json()
    const { doctorId, userId, schedule } = body

    const createAppointment = await prisma.appointment.create({
        data: {
            id,
            doctorId,
            userId,
            schedule,
        },
    })

    if (!createAppointment) {
        return NextResponse.json({ status: 500, message: "Error creating appointment ", data: createAppointment })
    }

    return NextResponse.json({ status: 200, message: "Create appointment succesfully", data: createAppointment })
}
