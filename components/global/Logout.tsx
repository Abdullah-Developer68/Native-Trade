"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth.client";

const Logout = () => {
  const handleLogout = async () => {
    const { error } = await authClient.signOut({
      onRequest: (ctx: any) => {
        //show loading
      },
      onSuccess: (ctx: any) => {
        //redirect to the homepage or sign in page
        window.location.href = "/signin";
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