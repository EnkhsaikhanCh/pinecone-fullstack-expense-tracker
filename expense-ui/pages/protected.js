import { useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/router";

const Page = () => {
  const { currentUser, isLoading } = useState(AuthContext);
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  if (!currentUser.isAuthenticated) {
    router.push("/login");
  }

  return <div>Protected Page</div>;
};

export default Page;
