import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-8xl font-bold text-primary/20">404</div>
      <h1 className="text-3xl font-bold text-foreground dark:text-white">
        Page Not Found
      </h1>
      <p className="max-w-md text-foreground/60">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90"
      >
        Go Home
      </Link>
    </div>
  );
}