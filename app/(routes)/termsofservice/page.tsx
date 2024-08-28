import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <PenLine className="h-6 w-6" />
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
                <a href="#acceptance">Acceptance of Terms</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#changes">Changes to Terms</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#access">Access and Use of the Service</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#account">Account Registration</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#content">User-Generated Content</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#proprietary">Proprietary Rights</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#privacy">Privacy</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#termination">Termination</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#disclaimer">Disclaimer of Warranties</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#limitation">Limitation of Liability</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#governing-law">Governing Law</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#contact">Contact Information</a>
              </Button>
            </nav>
          </aside>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <section id="acceptance" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Docs4All service, you agree to be
                bound by these Terms of Service. If you disagree with any part
                of the terms, you may not access the service.
              </p>
            </section>
            <section id="changes" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any
                time. We will provide notice of any significant changes. Your
                continued use of the Service after such modifications
                constitutes your acceptance of the new Terms.
              </p>
            </section>
            <section id="access" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Access and Use of the Service
              </h2>
              <p>
                Docs4All grants you a limited, non-exclusive, non-transferable,
                and revocable license to use the Service for creating AI-powered
                documents and collaborating with your team. You agree not to use
                the Service for any unlawful purposes or to conduct any unlawful
                activity.
              </p>
            </section>
            <section id="account" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Account Registration
              </h2>
              <p>
                To access certain features of the Service, you must register for
                an account. We use Clerk for authentication services. You are
                responsible for maintaining the confidentiality of your account
                and password. You agree to accept responsibility for all
                activities that occur under your account.
              </p>
            </section>
            <section id="content" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                User-Generated Content
              </h2>
              <p>
                You retain all rights to any content you submit, post or display
                on or through the Service. By submitting, posting or displaying
                content, you grant Docs4All a worldwide, non-exclusive,
                royalty-free license to use, reproduce, adapt, publish,
                translate and distribute your content in any existing or future
                media.
              </p>
            </section>
            <section id="proprietary" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Proprietary Rights
              </h2>
              <p>
                You acknowledge and agree that Docs4All (or Docs4All&apos;s
                licensors) own all legal right, title and interest in and to the
                Service, including any intellectual property rights which
                subsist in the Service (whether those rights happen to be
                registered or not, and wherever in the world those rights may
                exist).
              </p>
            </section>
            <section id="privacy" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how
                we collect, use, protect, and when we share personal
                information. By using our Service, you agree that we can use
                such data in accordance with our Privacy Policy. We use Google
                Firebase as our database service, and your use of the Service is
                also subject to Google&apos;s applicable terms and policies.
              </p>
            </section>
            <section id="termination" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p>
                We may terminate or suspend access to our Service immediately,
                without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms. All
                provisions of the Terms which by their nature should survive
                termination shall survive termination.
              </p>
            </section>
            <section id="disclaimer" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided &quot;as is&quot; without warranty of
                any kind, either express or implied, including, but not limited
                to, the implied warranties of merchantability, fitness for a
                particular purpose, or non-infringement.
              </p>
            </section>
            <section id="limitation" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Limitation of Liability
              </h2>
              <p>
                In no event shall Docs4All, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                access to or use of or inability to access or use the Service.
              </p>
            </section>
            <section id="governing-law" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of [Your Jurisdiction], without regard to its conflict
                of law provisions.
              </p>
            </section>
            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <p>
                If you have any questions about these Terms, please contact us
                at terms@docs4all.com.
              </p>
            </section>
            <p className="text-sm mt-8">Last Updated: June 15, 2024</p>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs">© 2023 Docs4All. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline" href="/privacy">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
