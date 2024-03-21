
import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(request: Request) { 

  await prisma.todo.deleteMany();

  await prisma.todo.create({
    data: {
      description: 'Piedra del almaa 1',
    }
  })
  await prisma.todo.create({
    data: {
      description: 'Piedra del almaa 2',
    }
  })
  await prisma.todo.create({
    data: {
      description: 'Piedra del almaa 3',
    }
  })
  await prisma.todo.create({
    data: {
      description: 'Piedra del almaa 4',
    }
  })

  return NextResponse.json({ message: 'seed execute' })
}