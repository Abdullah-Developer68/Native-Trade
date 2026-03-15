"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { authClient } from "@/lib/auth/auth.client"; //import the auth client
import { redirect } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (userInfo: Inputs, e: any) => {
    e.preventDefault();
    console.log(userInfo);

    const { data, error } = await authClient.signUp.email(
      {
        email: userInfo.email, // user email address
        password: userInfo.password, // user password -> min 8 characters by default
        name: "User", // user display name
        callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        //ctx -> context
        onRequest: (ctx: any) => {
          //show loading
        },
        onSuccess: (ctx: any) => {
          //redirect to the dashboard or sign in page
          redirect("/");
        },
        onError: (ctx: any) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="w-full h-screen flex justify center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignUp;
