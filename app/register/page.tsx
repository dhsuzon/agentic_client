"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, fetchAndSetToken } from "@/lib/auth-client";
import { Button, Card, TextField, Input, Label } from "@heroui/react";
import Link from "next/link";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (name: string, email: string, password: string) => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
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
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!validate(name, email, password)) return;
    setLoading(true);
    try {
      const result = await signUp.email({ name, email, password });
      if (result.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        await fetchAndSetToken();
        toast.success("Account created! Welcome!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card.Root className="w-full max-w-md">
        <Card.Header className="flex-col items-center gap-2 pt-8">
          <Card.Title className="text-2xl font-bold">Create Account</Card.Title>
          <Card.Description>Start your learning journey</Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField.Root isRequired isInvalid={!!errors.name}>
              <Label>Full Name</Label>
              <Input.Root name="name" placeholder="John Doe" />
              {errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </TextField.Root>
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
                placeholder="Create a password"
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
              Create Account <FiArrowRight />
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="justify-center pb-8">
          <p className="text-sm text-foreground/60">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
