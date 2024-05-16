"use server"

import {cookieBasedClient} from "@/utils/amplify-utils";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function createTodo(formData: FormData) {
  const { data } = await cookieBasedClient.models.Todo.create({
    title: formData.get('title')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    isDone: false,
  })
  redirect('/')
}

export async function markTodoAs(isDone: boolean, id: string) {
  await cookieBasedClient.models.Todo.update({
    id,
    isDone
  })
  revalidatePath('/')
}

export async function updateTodo(formData: FormData) {
  console.log(formData)
  await cookieBasedClient.models.Todo.update({
    id: formData.get('id')?.toString() || '',
    title: formData.get('title')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    isDone: formData.get('isDone') === 'on',
  })
  redirect('/')

}

export async function onDeleteTodo(id: string) {
  await cookieBasedClient.models.Todo.delete({ id })
  revalidatePath('/')
}