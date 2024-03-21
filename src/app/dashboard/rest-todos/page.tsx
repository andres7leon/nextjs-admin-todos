export const dynamic = 'auto';
export const revalidate = 0;

import prisma from "../../../lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

// export const metadata: Metadata = {
//   title: '...',
//   description: '...',
// }
 

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
  console.log('construidoooo..');

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