import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, FileText, Sparkles, Zap, Users } from "lucide-react";

const WorkspaceHero = () => {
  return (
    <div className="min-h-screen w-full p-8   ">
      <div className="max-w-6xl   mx-auto pl-72">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Workspace</h1>
          <p className="text-xl text-muted-foreground">
            Your intelligent workspace for creation and collaboration
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Create Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Start writing with our intuitive editor. Create documents,
                notes, reports, and more with ease.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Utilize AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Harness the power of AI to generate content, get ideas, and
                automatically improve your writing.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Collaborate in Real-Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Work with your team in real-time. Share documents, comment, and
                edit collaboratively.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">
            Create your document and discover how Docs4All can transform your
            way of working.
          </p>
          <h4>
            What are you waiting for? press the plus button on your left to
            start!
          </h4>
        </section>
      </div>
    </div>
  );
};

export default WorkspaceHero;
