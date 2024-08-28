import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center" href="/">
          <PenLine className="h-6 w-6 text-gray-800" />
          <span className="ml-2 text-lg font-semibold">Docs4All</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <nav className="space-y-2 sticky top-8">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#introduction">Introduction</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#information-collection">Information Collection</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#information-use">Information Use</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#information-protection">Information Protection</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#information-sharing">Information Sharing</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#cookies">Cookies</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#changes">Changes to This Policy</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
            </nav>
          </aside>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <section id="introduction" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p>
                Welcome to Docs4All&apos;s Privacy Policy. At Docs4All, we are
                committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your information when
                you use our AI-powered document creation and collaboration
                platform.
              </p>
            </section>
            <section id="information-collection" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Information Collection
              </h2>
              <p>
                We collect information that you provide directly to us, such as
                when you create an account, use our services, or communicate
                with us. This may include your name, email address, and any
                other information you choose to provide. We also automatically
                collect certain information about your device and how you
                interact with our platform.
              </p>
            </section>
            <section id="information-use" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information Use</h2>
              <p>
                We use the information we collect to provide, maintain, and
                improve our services, to communicate with you, to monitor and
                analyze trends and usage, and to carry out any other purpose for
                which the information was collected.
              </p>
            </section>
            <section id="information-protection" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Information Protection
              </h2>
              <p>
                We implement a variety of security measures to maintain the
                safety of your personal information. However, no method of
                transmission over the Internet or electronic storage is 100%
                secure, so we cannot guarantee absolute security.
              </p>
            </section>
            <section id="information-sharing" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Information Sharing
              </h2>
              <p>
                We do not sell or rent your personal information to third
                parties. We may share your information with third-party service
                providers who perform services on our behalf, subject to
                confidentiality agreements.
              </p>
            </section>
            <section id="cookies" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track
                activity on our platform and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
            </section>
            <section id="changes" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Changes to This Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the Last Updated date.
              </p>
            </section>
            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at privacy@docs4all.com.
              </p>
            </section>
            <p className="text-sm mt-8">Last Updated: June 15, 2024</p>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p>© 2024 Docs4All. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/termsofservice"
          >
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
