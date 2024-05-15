"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { Schema } from "../../../amplify/data/resource";

const Post = ({
  post,
  onDelete,
  isSignedIn,
}: {
  post: Pick<Schema["Post"]["type"], 'title' | 'id'>;
  onDelete: (id: string) => void;
  isSignedIn: boolean;
}) => {
  const router = useRouter();
  const onDetail = () => {
    router.push(`/posts/${post.id}`);
  }

  return (
    <div className="flex mt-1 w-1/2 justify-between items-center">
      <button onClick={onDetail}>
        <div className="flex gap-2">
          <div>Title:</div>
          <div>{post.title}</div>
        </div>
      </button>
      <input type="hidden" name="id" id="id" value={post.id} />
      {isSignedIn && (
        <button
          className="bg-red-500 text-white rounded-md p-2"
          onClick={() => onDelete(post.id)}>Delete</button>
      )}
    </div>
  );
};

export default Post;