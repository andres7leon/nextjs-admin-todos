'use client'
import { Todo } from '@prisma/client'
import React, { startTransition, useOptimistic } from 'react'

import styles from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo;
  toggleTodo: { (id: string, complete: boolean): Promise<Todo> } | any;
}

export const TodoItem = ({todo, toggleTodo}: Props) => {

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue
    })
  );

  const onToggleTodo = async () => {

    try {
      startTransition(() => toggleTodoOptimistic( !todoOptimistic.complete ) );
      await toggleTodo( todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic( !todoOptimistic.complete ) );
    }

  }

  return (
    <>
      <div className={ todoOptimistic.complete ? styles.todoDone : styles.todoPending }>
        <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>

          {/* <div onClick={ () => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)} */}
          <div onClick={ onToggleTodo }
           className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-50
            bg-blue-100
          `}>
            {
              todoOptimistic.complete ? 
              <IoCheckboxOutline className='text-2xl'  color='black'/>:
              <IoSquareOutline className='text-2xl' color='black'/>
            }
          </div>

          <div className='text-center sm:text-left text-black'>
            {
              todoOptimistic.description
            }
          </div>

        </div>
      </div>
    </>
  )
}
