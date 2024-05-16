import React from 'react';
import { updateTodo } from '@/app/_actions/actions';

import { InputField, TextAreaField, CheckboxField } from '@/components/formfields';
import {cookieBasedClient, isAuthenticated} from "@/utils/amplify-utils";
import {AuthMode} from "@aws-amplify/data-schema-types";

const EditTodo = async ({ params }: { params: { id: string } }) => {
  if (!params) return null;

  const isSignedIn = await isAuthenticated();
  const authMode = (isSignedIn ? 'userPool' : 'identityPool') as AuthMode;
  const { data: todo } = await cookieBasedClient.models.Todo.get({
    id: params.id,
  }, {
    authMode,
    selectionSet: ["title", "id", "description", "isDone"],
  });

  if (!todo) return null;
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <form action={updateTodo} className='flex flex-col items-start lg:items-center gap-4 p-6 lg:p-24'>
        <input type='hidden' name='id' id='id' value={todo.id!} />
        <label htmlFor='title' className='text-lg mb-2'>Title</label>
        <InputField id='title' name='title' placeholder='Enter the title' required={true} className='p-2 border border-gray-300 rounded-md text-black w-full' value={todo.title} />

        <label htmlFor='description' className='text-lg mb-2'>Description</label>
        <TextAreaField id='description' name='description' placeholder='Enter the description' required={true} className='p-2 border border-gray-300 rounded-md text-black w-full' value={todo.description} />

        <label htmlFor='isDone' className='text-lg mb-2'>Status (Check if the Task is already done)</label>
        <CheckboxField id='isDone' name='isDone' className='w-6 h-6 text-blue-500 rounded p-2 border' checked={todo.isDone} />

        <input type='submit' value='Update Todo' className='p-2 bg-blue-500 text-white rounded-md cursor-pointer w-full lg:w-1/4 mt-4' />
      </form>
    </div>
  );
};

export default EditTodo;