import React from 'react';
import {cookieBasedClient, isAuthenticated} from "@/utils/amplify-utils";
import {AuthMode} from "@aws-amplify/data-schema-types";

const PostDetail = async ({ params }: { params: { id: string } }) => {
  if (!params) return null;

  const isSignedIn = await isAuthenticated();
  const authMode = (isSignedIn ? 'userPool' : 'identityPool') as AuthMode;
  const { data: post } = await cookieBasedClient.models.Post.get({
    id: params.id,
  }, {
    authMode,
    selectionSet: ["title", "id"],
  });

  const { data: comments } = await cookieBasedClient.models.Comment.list({
    filter: {
      postId: { eq: params.id }
    },
    authMode,
    selectionSet: ["content", "id"],
  });

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl pb-10">Post Detail</h1>
      <div>
        <div>Title: {post?.title}</div>
      </div>
      <h2 className="text-2xl pb-10">Comments</h2>
      <div>
        {comments.map((comment, idx) => (
          <div key={idx}>{comment.content}</div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;