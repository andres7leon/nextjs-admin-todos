import { Todo } from "@prisma/client";


export const updateTodo = async (id: string, complete: boolean):Promise <Todo> => {
  const body = { complete };
  const dbTodo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then( res => res.json() );

  console.log('res dbTodo update', dbTodo);

  return dbTodo;

};

export const createTodo = async (description: string):Promise <Todo> => {
  const body = { description };
  const dbTodo = await fetch(`/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then( res => res.json() );

  console.log('res dbTodo Create', dbTodo);

  return dbTodo;

};

export const removeTodo = async ():Promise <Todo> => {
  const dbTodo = await fetch(`/api/todos`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then( res => res.json() );

  console.log('res dbTodo Remove', dbTodo);

  return dbTodo;

};