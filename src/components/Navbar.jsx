"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';


const Navbar =()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const {data : session,isPending } = useSession()
//  console.log(session?.user, `ispending= ${isPending}`)
const user = session?.user
const router = useRouter()

const handleSignOut = async()=>{
  await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); 
    },
  },
})
}
  const navItems = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Company",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <header className="flex h-20 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <Xmark className="size-5" />
              ) : (
                <Bars className="size-5" />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              <span className="text-blue-500">hire</span>
              <span className="text-orange-500">loop</span>
            </Link>
          </div>

         <div className="hidden md:flex gap-5 items-center justify-center">
               {/* Desktop Navigation */}
          <ul className=" flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
            <div className="h-5 w-px bg-white" />
          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user?
             <> 
             Hello!! {user?.name}
             <Button variant="ghost" onClick={handleSignOut}>Sign-out</Button>
             </> 
            : 
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-violet-400 hover:text-violet-300"
            >
              Sign In
            </Link>}

            <Button
              as={Link}
              href="/register"
              color="primary"
              radius="md"
              className="font-medium"
            >
              Get Started
            </Button>
          </div>
         </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-gray-300 hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-white/10 pt-4 flex flex-col gap-3">
              <Link
                href="/auth/signin"
                className="px-3 py-2 text-violet-400"
              >
                Sign In
              </Link>

              <Button
                as={Link}
                href="/register"
                color="primary"
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar