import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"

export async function GET() {
    const poli = await prisma.poli.findMany({})
    return NextResponse.json({ status: 200, message: "Fetch successful", data: poli })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { poliName, poliSlug } = body

    const createPoli = await prisma.poli.create({
        data: {
            poliName,
            poliSlug,
        },
    })

    return NextResponse.json({ status: 200, message: "Poli created succesfully", data: createPoli })
}
