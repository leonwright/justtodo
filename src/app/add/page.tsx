import React from 'react';
import {createPost } from '@/app/_actions/actions';

const AddPost = () => {
  return (
    <div>
      <form action={createPost} className='p-4 flex flex-col items-center gap-4'>
        <input type='text' name='title' placeholder='Title' className='p-2 border border-gray-300 rounded-md text-black' />
        <input type='submit' value='Add Post' className='p-2 bg-blue-500 text-white rounded-md cursor-pointer w-1/4' />
      </form>
    </div>
  );
};

export default AddPost;