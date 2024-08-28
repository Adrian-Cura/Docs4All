import { Button } from "@/components/ui/button";

import { PenLine, Users, Zap } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <PenLine className="h-6 w-6 text-primary" />
          <span className="sr-only">Docs4All</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-base hover:text-purple-500">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="text-base bg-black hover:text-purple-500">
              Sign Up
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Docs4All
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create AI-powered documents and collaborate with your team in
                  real-time.
                </p>
              </div>
              <div>
                <Link href="/dashboard">
                  <Button className=" hover:text-purple-500" variant="outline">
                    Your Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-4 md:py-8  bg-slate-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-10 w-10 text-primary" />
                <h2 className="text-xl font-bold">AI-Powered Creation</h2>
                <p>
                  Harness the power of AI to create, edit, and enhance your
                  documents effortlessly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Users className="h-10 w-10 text-primary" />
                <h2 className="text-xl font-bold">Team Collaboration</h2>
                <p>
                  Create organizations and work seamlessly with your team in
                  real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <PenLine className="h-10 w-10 text-primary" />
                <h2 className="text-xl font-bold">Intuitive Interface</h2>
                <p>
                  Enjoy a user-friendly interface designed for productivity and
                  ease of use.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 Docs4All. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/termsofservice"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/privacy"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Hero;
