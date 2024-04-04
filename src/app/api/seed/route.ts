
import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'test1@prod.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin'],
      todos: {
        create: [
          { description: 'Piedra del almaa 1' },
          { description: 'Piedra del almaa 2' },
          { description: 'Piedra del almaa 3' },
          { description: 'Piedra del almaa 4' },
        ]
      }
    }
  });

  // await prisma.todo.create({
  //   data: {
  //     description: 'Piedra del almaa 1',
  //   }
  // })
  // await prisma.todo.create({
  //   data: {
  //     description: 'Piedra del almaa 2',
  //   }
  // })
  // await prisma.todo.create({
  //   data: {
  //     description: 'Piedra del almaa 3',
  //   }
  // })
  // await prisma.todo.create({
  //   data: {
  //     description: 'Piedra del almaa 4',
  //   }
  // })

  return NextResponse.json({ message: 'seed execute' })
}