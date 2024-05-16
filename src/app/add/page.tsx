import React from 'react';
import { createTodo } from '@/app/_actions/actions';

import { InputField, TextAreaField, CheckboxField } from '@/components/formfields';

const AddTodo = () => {
  return (
    <div className='container flex justify-center mx-auto px-4 sm:px-6 lg:px-8'>
      <form action={createTodo} className='flex flex-col items-start lg:items-center gap-4 w-full max-w-2xl lg:p-24'>
        <label htmlFor='title' className='text-lg mb-2 mt-6'>Title</label>
        <InputField id='title' name='title' placeholder='Enter the title' required={true} className='p-2 border border-gray-300 rounded-md text-black w-full' />

        <label htmlFor='description' className='text-lg mb-2'>Description</label>
        <TextAreaField id='description' name='description' placeholder='Enter the description' required={true} className='p-2 border border-gray-300 rounded-md text-black w-full' />

        <label htmlFor='isDone' className='text-lg mb-2'>Status (Check if the Task is already done)</label>
        <CheckboxField id='isDone' name='isDone' className='w-6 h-6 text-blue-500 rounded p-2 border' />

        <input type='submit' value='Add Todo' className='p-2 bg-blue-500 text-white rounded-md cursor-pointer w-full lg:w-1/4 mt-4' />
      </form>
    </div>
  );
};

export default AddTodo;