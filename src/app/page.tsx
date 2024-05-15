import Image from "next/image";
import {cookieBasedClient, isAuthenticated} from "@/utils/amplify-utils";
import Post from "@/components/post/Post";
import {onDeletePost} from "@/app/_actions/actions";
import {AuthMode} from "@aws-amplify/data-schema-types";

export default async function Home() {
  const isUserSignedIn = await isAuthenticated();
  const authMode: AuthMode = (isUserSignedIn ? 'userPool' : 'identityPool') as AuthMode;

  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: [ "title", "id"],
    authMode
  })

  console.log('posts ', posts)
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl pb-10">List of All Titles</h1>
        {posts.map((post, idx) => (
          <Post post={post} onDelete={onDeletePost} key={idx} isSignedIn={isUserSignedIn}/>
        ))}
    </main>
  );
}
