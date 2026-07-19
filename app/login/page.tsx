"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp, fetchAndSetToken } from "@/lib/auth-client";
import { Button, Card, TextField, Input, Label, InputGroup } from "@heroui/react";
import Link from "next/link";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (emailVal: string, passwordVal: string) => {
    const errs: Record<string, string> = {};
    if (!emailVal) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(emailVal)) errs.email = "Invalid email format";
    if (!passwordVal) errs.password = "Password is required";
    else if (passwordVal.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const validateField = (field: string, value: string) => {
    const errs = validate(
      field === "email" ? value : email,
      field === "password" ? value : password
    );
    return errs[field] || "";
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = field === "email" ? email : password;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
  };

  const handleChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    else if (field === "password") setPassword(value);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(email, password);
    setErrors(errs);
    setTouched({ email: true, password: true });
    if (Object.keys(errs).length > 0) return;
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
      let result = await signIn.email({
        email: "demo@gmail.com",
        password: "demo676540",
      });

      if (result.error?.status === 404) {
        const signUpResult = await signUp.email({
          name: "Demo User",
          email: "demo@gmail.com",
          password: "demo676540",
        });
        if (signUpResult.error) {
          toast.error("Demo account unavailable. Sign up first.");
          setLoading(false);
          return;
        }
        result = await signIn.email({
          email: "demo@gmail.com",
          password: "demo676540",
        });
      }

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
      <Card.Root className="w-full max-w-md rounded-xl">
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
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email}</p>
              )}
            </TextField.Root>
            <TextField.Root isRequired isInvalid={!!errors.password}>
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Input
                  name="password"
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pr-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? <FiEyeOff className="text-default-400" /> : <FiEye className="text-default-400" />}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
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
