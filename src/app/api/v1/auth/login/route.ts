import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

export async function GET() {
    return NextResponse.json({ message: "Hey There!" })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password } = body
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    })

    if (!user) {
        return NextResponse.json({ status: 404, message: "Account not found, please check your credential" })
    }

    const hashedPassword = user?.hashedPassword
    const isMatch = await bcrypt.compare(password, hashedPassword)

    if (!isMatch) {
        return NextResponse.json({ status: 500, message: "Invalid password" })
    }

    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY
    const token = await jwt.sign(user, secretKey)

    return NextResponse.json({ status: 200, message: "Logged in succesfully", data: { user, token } })
}
