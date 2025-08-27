import { signIn } from "@/lib/auth";


export default function LoginButton() {
    return (
        <button className="button-lg" onClick={async () => {
            "use server"
            await signIn()
        }}>
            Log in
        </button>
    );
}