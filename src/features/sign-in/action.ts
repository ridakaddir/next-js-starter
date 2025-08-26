"use server"
import { signIn } from "@/lib/auth"

export async function SignInAction() {
    await signIn("fusionauth")
}