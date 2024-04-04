export const dynamic = 'auto';
export const revalidate = 0;

import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import prisma from "../../../lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: '...',
//   description: '...',
// }
 

export default async function RestTodosPage() {

  const user = await getUserServerSession();
  console.log('user ===========', user);

  if ( !user ) {
    redirect('/api/auth/signin');
  }
  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { description: 'asc' } 
  });

  // useEffect(() => {
  //   fetch('/api/todos')
  //   .then( res => res.json())
  //   .then( data => console.log(data));
  // }, [])
  

  return (
    <>
      <div className="w-full m-5 px-5">
        <NewTodo />
      </div>
      <TodosGrid  todos={todos} />
    </>
  );
}