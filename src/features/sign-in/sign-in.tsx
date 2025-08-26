"use client"
import { SignInAction } from "./action"

export default function SignIn() {
    return (
        <form
            action={async () => {
                await SignInAction()
            }}
        >
            <button type="submit">Signin with FusionAuth</button>
        </form>
    )
} 
