import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"

const bcrypt = require("bcrypt")
const saltRounds = 10

export async function GET() {
    return NextResponse.json({ message: "Hey There!" })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, fullName, phoneNumber, password, role } = body
    const hash = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            phoneNumber,
            hashedPassword: hash,
            role,
        },
    })

    if (!user) {
        return NextResponse.json({ status: 500, message: "Not able to create account..." })
    }

    return NextResponse.json({ status: 200, message: "Account created", data: { user } })
}
