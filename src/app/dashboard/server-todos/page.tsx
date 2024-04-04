export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: '...',
//   description: '...',
// }
 

export default async function ServerTodosPage() {

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
      <span> Server Actions </span>
      <div className="w-full m-5 px-5">
        <NewTodo />
      </div>
      <TodosGrid  todos={todos} />
    </>
  );
}