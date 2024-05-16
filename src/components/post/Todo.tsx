"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { Schema } from "../../../amplify/data/resource";
import { markTodoAs } from "@/app/_actions/actions";

const Todo = ({
  todo,
  onDelete,
  isSignedIn,
}: {
  todo: Pick<Schema["Todo"]["type"], 'title' | 'id' | 'isDone'>;
  onDelete: (id: string) => void;
  isSignedIn: boolean;
}) => {
  const router = useRouter();
  const onDetail = () => {
    router.push(`/viewtodo/${todo.id}`);
  }

  return (
    <div className="flex mt-1 w-full justify-between items-center">
      <button onClick={onDetail}>
        <div className="flex gap-2">
          <div>{todo.title}</div>
        </div>
      </button>
      <input type="hidden" name="id" id="id" value={todo.id!} />
      <div>
        {isSignedIn && (
          <>
            <button
              className="bg-blue-500 text-white rounded-md p-2 mr-2"
              onClick={() => router.push(`/edit/${todo.id}`)}>Edit
            </button>
            <button
              className="bg-blue-500 text-white rounded-md p-2 mr-2"
              onClick={() => markTodoAs(!todo.isDone, todo.id!)}>{todo.isDone ? 'Not Done' : 'Done'}
            </button>
            <button
              className="bg-red-500 text-white rounded-md p-2"
              onClick={() => onDelete(todo.id!)}>Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;