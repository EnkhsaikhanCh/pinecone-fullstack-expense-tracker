import { AuthHeader } from "@/components/AuthHeader";
import { AuthFooter } from "@/components/AuthFooter";
import { LoginForm } from "./components/LoginForm";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
        <AuthHeader label="Welcome Back" />
        <LoginForm />
        <AuthFooter
          label="Sign up"
          href="/register"
          text="Don't have account?"
        />
      </div>
    </main>
  );
}
