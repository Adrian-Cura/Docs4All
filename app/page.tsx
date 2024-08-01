import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div>
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
      <label>Requires authentication</label>
      <div>
        <Button>
          <SignInButton>Sign In</SignInButton>
        </Button>
      </div>
      <div>
        {" "}
        <Button>
          <SignUpButton>Sign Up</SignUpButton>
        </Button>
      </div>
    </div>
  );
}
