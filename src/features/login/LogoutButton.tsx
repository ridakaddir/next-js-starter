import { signOut } from "@/lib/auth";

export default function LogoutButton() {
    return (
        <button className="button-lg" onClick={async () => {
            "use server"
            await signOut()
        }}>
            Log out
        </button>
    );
}
