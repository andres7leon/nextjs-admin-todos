'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const toogleTodo = async (id: string, complete: boolean) => {

  const todo = await prisma.todo.findFirst({ where: { id: id }});

  if ( !todo ) {
    throw new Error('Todo not found');
  }

  const updateTodo = await prisma.todo.update({
    where: { id: id },
    data: { complete }
  });

  revalidatePath('/dashboard/server-todos')
  return updateTodo;

}

export const addTodo = async (description: string)  => {

  try {
  
    const todo = await prisma.todo.create({
      data: {description}
    });
    
    revalidatePath('/dashboard/server-todos')

    return todo;

  } catch (error) {
    return {
      message: 'error creating todo' 
    }
  }

}

export const deleteCompletedAction = async ():Promise<void | string> => {

  try {  
    
    await prisma.todo.deleteMany({ where: { complete: true } } );
    
    revalidatePath('/dashboard/server-todos')
    
    return;

  } catch (error) {
    return 'error deleting completed todos';
  }

}