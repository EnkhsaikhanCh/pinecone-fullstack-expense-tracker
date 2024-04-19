import { LogoSVG } from "@/components/image/LogoSVG";
import { SignUpForm } from "@/components/signUp/SignUp";

export default function SignUp() {
  return (
    <main className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
      <div className="flex items-center gap-2">
        <LogoSVG />
        <h1 className="text-2xl font-bold">Gelt</h1>
      </div>
      <div className="mb-3 mt-5 flex h-full flex-col gap-2">
        <h1 className="flex justify-center text-xl font-bold">
          Create Geld account
        </h1>
      </div>
      <SignUpForm />
    </main>
  );
}
