"use client";

import { useSession, signOut as authSignOut, fetchAndSetToken } from "@/lib/auth-client";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBook, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { getApiToken, setApiToken } from "@/lib/api";
import { useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (session?.user && !getApiToken()) {
      fetchAndSetToken();
    }
  }, [session]);

  const handleSignOut = async () => {
    await authSignOut();
    setApiToken(null);
    router.push("/");
  };

  const navLinks = session
    ? [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore" },
        { href: "/courses/manage", label: "My Classes" },
        { href: "/courses/new", label: "Add Course" },
        { href: "/about", label: "About" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore" },
        { href: "/about", label: "About" },
        { href: "/login", label: "My Classes" },
      ];

  return (
    <nav className="sticky top-0 z-50 border-b border-default-200 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <FiBook className="text-xl text-primary" />
          <span className="text-xl font-bold">TutorialsPoint</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="text-foreground/80"
              onPress={() => router.push(link.href)}
            >
              {link.label}
            </Button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isPending ? null : session ? (
            <>
              <span className="text-sm text-foreground/60">
                {session.user.name || session.user.email}
              </span>
              <Button isIconOnly variant="ghost" onPress={handleSignOut}>
                <FiLogOut className="text-lg" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onPress={() => router.push("/login")}>
                Login
              </Button>
              <Button variant="primary" onPress={() => router.push("/register")}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <Button
          isIconOnly
          variant="ghost"
          className="md:hidden"
          onPress={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
        </Button>
      </div>

      {menuOpen && (
        <div className="border-t border-default-200 bg-background p-4 md:hidden">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="w-full justify-start"
              onPress={() => {
                router.push(link.href);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </Button>
          ))}
          <div className="mt-2 border-t border-default-200 pt-2">
            {session ? (
              <Button
                variant="ghost"
                className="w-full justify-start text-danger"
                onPress={handleSignOut}
              >
                <FiLogOut className="mr-2" /> Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="w-full"
                  onPress={() => {
                    router.push("/login");
                    setMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  className="mt-2 w-full"
                  onPress={() => {
                    router.push("/register");
                    setMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
