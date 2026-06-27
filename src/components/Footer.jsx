"use client";

import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black">
      <div className="container mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo Section */}
          <div>
            <Link href="/" className="text-3xl font-bold">
              <span className="text-blue-500">hire</span>
              <span className="text-orange-500">loop</span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-default-500">
              The AI-powered hiring platform connecting talented
              professionals with top companies worldwide.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-content2 hover:bg-primary/20 transition"
              >
                <LogoFacebook />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-content2 hover:bg-primary/20 transition"
              >
                <LogoGithub />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-content2 hover:bg-primary/20 transition"
              >
                <LogoLinkedin />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-primary">
              Product
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="text-default-500 hover:text-white">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link href="#" className="text-default-500 hover:text-white">
                  AI Resume Review
                </Link>
              </li>

              <li>
                <Link href="/companies" className="text-default-500 hover:text-white">
                  Companies
                </Link>
              </li>

              <li>
                <Link href="#" className="text-default-500 hover:text-white">
                  Salary Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-primary">
              For Users
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-default-500 hover:text-white">
                  Career Library
                </Link>
              </li>

              <li>
                <Link href="#" className="text-default-500 hover:text-white">
                  Interview Tips
                </Link>
              </li>

              <li>
                <Link href="#" className="text-default-500 hover:text-white">
                  Resume Builder
                </Link>
              </li>

              <li>
                <Link href="/contact" className="text-default-500 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-primary">
              Company
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-default-500 hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/blog" className="text-default-500 hover:text-white">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/newsroom" className="text-default-500 hover:text-white">
                  Newsroom
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="text-default-500 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-default-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/cookies" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;