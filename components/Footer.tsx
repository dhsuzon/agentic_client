import Link from "next/link";
import {
  FiBook,
  FiMail,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-default-200 bg-default-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <FiBook className="text-xl text-primary" />
              <span className="text-lg font-bold">TutorialsPoint</span>
            </div>
            <p className="text-sm text-foreground/60">
              AI-powered learning platform for modern education. Learn, teach,
              and grow with cutting-edge courses.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground dark:text-white">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2 text-sm text-foreground/60">
              <Link href="/explore" className="hover:text-foreground">
                Explore
              </Link>
              <Link href="/courses/manage" className="hover:text-foreground">
                My Classes
              </Link>
              <Link href="/courses/new" className="hover:text-foreground">
                Add Course
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground dark:text-white">
              Help & Support
            </h3>
            <div className="flex flex-col gap-2 text-sm text-foreground/60">
              <Link href="/help" className="hover:text-foreground">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact Us
              </Link>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-foreground dark:text-white">
              Connect
            </h3>
            <div className="flex flex-col gap-2 text-sm text-foreground/60">
              <a
                href="mailto:diderhossainsuzon@gmail.com"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <FiMail /> diderhossainsuzon@gmail.com
              </a>
              <a
                href="tel:01871601665"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <FiPhone /> 01871601665
              </a>
              <span className="flex items-center gap-2">
                <FiMapPin /> Jalalabad
              </span>
            </div>
            <div className="mt-3 flex gap-3">
              <a
                href="https://github.com/dhsuzon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <FiGithub className="text-xl" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground">
                <FiTwitter className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/dider-hossain-suzon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <FiLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-default-200 pt-6 text-center text-sm text-foreground/40">
          &copy; {new Date().getFullYear()} TutorialsPoint. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
