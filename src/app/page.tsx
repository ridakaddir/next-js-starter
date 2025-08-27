
import LoginButton from "@/features/login/LoginButton";
import LogoutButton from "@/features/login/LogoutButton";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    return (
      <>
        <h1>Welcome, {session.user.email}!</h1>
        <LogoutButton />
      </>
    );
  }

  return (
    <LoginButton />
  );
}
