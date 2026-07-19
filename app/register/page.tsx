"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button, Card, TextField, Input, Label, InputGroup } from "@heroui/react";
import Link from "next/link";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (nameVal: string, emailVal: string, passwordVal: string) => {
    const errs: Record<string, string> = {};
    if (!nameVal.trim()) errs.name = "Name is required";
    if (!emailVal) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(emailVal)) errs.email = "Invalid email format";
    if (!passwordVal) errs.password = "Password is required";
    else if (passwordVal.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const validateField = (field: string, value: string) => {
    const errs = validate(
      field === "name" ? value : name,
      field === "email" ? value : email,
      field === "password" ? value : password
    );
    return errs[field] || "";
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = field === "name" ? name : field === "email" ? email : password;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
  };

  const handleChange = (field: string, value: string) => {
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else if (field === "password") setPassword(value);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(name, email, password);
    setErrors(errs);
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const result = await signUp.email({ name, email, password });
      if (result.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        toast.success("Account created! Please sign in.");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card.Root className="w-full max-w-md rounded-xl">
        <Card.Header className="flex-col items-center gap-2 pt-8">
          <Card.Title className="text-2xl font-bold">Create Account</Card.Title>
          <Card.Description>Start your learning journey</Card.Description>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField.Root isRequired isInvalid={!!errors.name}>
              <Label>Full Name</Label>
              <Input.Root
                name="name"
                value={name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </TextField.Root>
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
                  placeholder="Create a password"
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
