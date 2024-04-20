import { AuthFooter } from "@/components/AuthFooter";
import { SignUpForm } from "./components/SignUpForm";
import { AuthHeader } from "@/components/AuthHeader";

export default function Home() {
  return (
    <main className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
      <AuthHeader label="Create Geld account" />
      <SignUpForm />
      <AuthFooter
        label="Log in"
        href="/login"
        text="Already have an account?"
      />
    </main>
  );
}
