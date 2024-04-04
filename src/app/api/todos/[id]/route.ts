import { getUserServerSession } from '@/app/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

import * as yup from 'yup';

export async function GET(request: Request, segments: any) { 

  const todos = await prisma.todo.findFirst({
    where: {
      id: segments.params.id
    }
  });

  if (todos) {
    return NextResponse.json(todos);
  }
  
  return NextResponse.json({
    message: 'No todos found for this id.'
  }, {status: 404});

}


const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function PUT(request: Request, segments: any) { 

  const user = await getUserServerSession();

  if ( !user ) {
    return null;
  }

  const {description, complete} = await request.json();;

  const updateTodos = await prisma.todo.update({
    where: {
      id: segments.params.id
    },
    data: { 
      description,
      complete
     }
  });

  if (updateTodos) {
    return NextResponse.json(updateTodos);
  }
  
  return NextResponse.json({
    message: 'No todos found for this id.'
  }, {status: 404});

}