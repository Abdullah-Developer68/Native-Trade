"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth.client";
import { redirect } from "next/dist/server/api-utils";

const Logout = () => {
  const handleLogout = async () => {
    const { error } = await authClient.signOut({
      onRequest: (ctx: any) => {
        //show loading
        console.log("Logging out...");
      },
      onSuccess: (ctx: any) => {
        //redirect to the homepage or sign in page
        redirect("/signin");
      },
      onError: (ctx: any) => {
        // display the error message
        alert(ctx.error.message);
      },
    });
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;