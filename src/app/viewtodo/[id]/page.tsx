import React from 'react';
import {redirect} from "next/navigation";
import {cookieBasedClient, isAuthenticated} from "@/utils/amplify-utils";
import {AuthMode} from "@aws-amplify/data-schema-types";
import { EditButton } from '@/components/formfields'

const PostDetail = async ({ params }: { params: { id: string } }) => {
  if (!params) return null;

  const isSignedIn = await isAuthenticated();
  const authMode = (isSignedIn ? 'userPool' : 'identityPool') as AuthMode;
  const { data: todo } = await cookieBasedClient.models.Todo.get({
    id: params.id,
  }, {
    authMode,
    selectionSet: ["title", "id", "description", "isDone"],
  });

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div>
        <h1 className='text-3xl mb-10'>{todo?.title}</h1>
      </div>
      <h2 className="text-xl mb-2">Description</h2>
      <div>
        <div>{todo?.description}</div>
      </div>
      <h2 className="text-xl mb-2 mt-8">Status</h2>
      <div>
        <div>{todo?.isDone ? 'Done' : 'Not Done'}</div>
      </div>
      {isSignedIn && <EditButton postId={todo?.id!} />}
    </div>
  );
};

export default PostDetail;