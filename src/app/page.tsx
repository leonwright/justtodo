import Image from "next/image";
import {cookieBasedClient, isAuthenticated} from "@/utils/amplify-utils";
import Todo from "@/components/post/Todo";
import {onDeleteTodo} from "@/app/_actions/actions";
import {AuthMode} from "@aws-amplify/data-schema-types";
import Link from 'next/link';
import { redirect } from 'next/navigation'

export default async function Home() {
  const isUserSignedIn = await isAuthenticated();
  const authMode: AuthMode = (isUserSignedIn ? 'userPool' : 'identityPool') as AuthMode;

  const { data: todos } = await cookieBasedClient.models.Todo.list({
    selectionSet: [ "title", "id", "description", "isDone"],
    authMode
  })

  const doneTodos = todos.filter(todo => todo.isDone);
  const notDoneTodos = todos.filter(todo => !todo.isDone);

  if (!isUserSignedIn) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-4xl pb-10 text-blue-500">Welcome to our Todo App!</h1>
        <p className="text-lg text-gray-500 mb-10">Please sign in to manage your todos.</p>
        <Link href="/signin">
          <span className="bg-blue-500 text-white rounded-md p-2">Sign In</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl pb-10 text-blue-500">What to do?</h1>

      <div className="flex flex-col w-full max-w-2xl rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl pb-4 text-blue-400">Not Done</h2>
        {notDoneTodos.length > 0 ? (
          notDoneTodos.map((todo, idx) => (
            <Todo todo={todo} onDelete={onDeleteTodo} key={idx} isSignedIn={isUserSignedIn}/>
          ))
        ) : (
          <p className="text-lg text-gray-500">Nothing to do, <Link className='text-blue-500' href="/add">add something?</Link></p>
        )}
      </div>

      <div className="flex flex-col w-full max-w-2xl rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl pb-4 text-blue-400">Done</h2>
        {doneTodos.map((todo, idx) => (
          <Todo todo={todo} onDelete={onDeleteTodo} key={idx} isSignedIn={isUserSignedIn}/>
        ))}
      </div>
    </main>
  );
}
