"use server"

import {cookieBasedClient} from "@/utils/amplify-utils";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function createPost(formData: FormData) {
  const { data } = await cookieBasedClient.models.Post.create({
    title: formData.get('title')?.toString() || '',
  })

  console.log('data ', data)

  redirect('/')
}

export async function onDeletePost(id: string) {
  await cookieBasedClient.models.Post.delete({ id })
  revalidatePath('/')
}