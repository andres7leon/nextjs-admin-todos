import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../lib/prisma'
import * as yup from 'yup';
import { getUserServerSession } from '@/app/auth/actions/auth-actions';

export async function GET(request: Request) { 

  const { searchParams } = new URL(request.url)
  const take = searchParams.get('take') ?? '10';
  const skip = searchParams.get('skip') ?? '0';



  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip,
  });

  return NextResponse.json(todos);
}




const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 

  const user = await getUserServerSession();

  if ( !user ) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {
    const {complete, description} = await postSchema.validate( await request.json() );
  
    const todo = await prisma.todo.create({
      data: {complete, description, userId: user.id}
    });
  
    return NextResponse.json(todo);

  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }


}

export async function DELETE(request: Request) { 

  const user = await getUserServerSession();

  if ( !user ) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {  
    
    await prisma.todo.deleteMany({ where: { complete: true, userId: user.id } } );
  
    return NextResponse.json('Ok delete all completed todos');

  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }


}