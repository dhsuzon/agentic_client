"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, fetchAndSetToken } from "@/lib/auth-client";
import { Button, Card, TextField, Input, Label } from "@heroui/react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (email: string, password: string) => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email format";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!validate(email, password)) return;
    setLoading(true);
    try {
      const result = await signIn.email({ email, password });
      if (result.error) {
        toast.error(result.error.message || "Invalid credentials");
      } else {
        await fetchAndSetToken();
        toast.success("Welcome back!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn.email({ email: "demo@tutorialspoint.com", password: "demo123456" });
      if (result.error) {
        toast.error("Demo account unavailable. Sign up first.");
      } else {
        await fetchAndSetToken();
        toast.success("Logged in as Demo User");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card.Root className="w-full max-w-md">
        <Card.Header className="flex-col items-center gap-2 pt-8">
          <Card.Title className="text-2xl font-bold">Welcome Back</Card.Title>
          <Card.Description>Sign in to your account</Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField.Root isRequired isInvalid={!!errors.email}>
              <Label>Email</Label>
              <Input.Root
                type="email"
                name="email"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email}</p>
              )}
            </TextField.Root>
            <TextField.Root isRequired isInvalid={!!errors.password}>
              <Label>Password</Label>
              <Input.Root
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-default-400"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <FiEyeOff /> : <FiEye />}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-danger">{errors.password}</p>
              )}
            </TextField.Root>
            <Button
              type="submit"
              variant="primary"
              className="mt-2 w-full"
              isDisabled={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-default-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground/50">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="ghost"
              className="w-full gap-2"
              onPress={() => signIn.social({ provider: "google" })}
            >
              <FcGoogle className="text-lg" />
              Google
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2"
              isDisabled={loading}
              onPress={handleDemoLogin}
            >
              <FiLock className="text-lg" />
              Demo Login
            </Button>
          </div>
        </Card.Content>

        <Card.Footer className="justify-center pb-8">
          <p className="text-sm text-foreground/60">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
