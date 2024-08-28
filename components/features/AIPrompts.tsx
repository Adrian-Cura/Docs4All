"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { LayoutGrid, Loader2Icon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { chatSession } from "@/GoogleAIModel";
import { RemirrorJSON } from "remirror";

interface AIPromptsProps {
  setGenerateAIOutput: (outputAi: RemirrorJSON) => void;
}

const AIPrompts: React.FC<AIPromptsProps> = ({ setGenerateAIOutput }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generateFromAI = async () => {
    setLoading(true);
    const PROMPT =
      "The next prompt MUST be in ProsemirrorNode format " + userInput;

    try {
      const result = await chatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      // Si la respuesta parece ser un JSON válido
      try {
        const outputAi: RemirrorJSON = JSON.parse(responseText);
        setGenerateAIOutput(outputAi);
      } catch (e) {
        // Si no es un JSON válido, tratamos la respuesta como texto plano
        setGenerateAIOutput(responseText);
      }
    } catch (error) {
      console.error("Error fetching AI response: ", error);
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <div className={open ? "opacity-0" : ""}>
      <Button
        variant="outline"
        className="flex gap-2"
        onDoubleClick={() => setOpen(true)}
      >
        <LayoutGrid className="h-4 w-4" /> Double click me!
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Template</DialogTitle>
            <DialogDescription>
              <div>
                <h2 className="my-5">Be creative!</h2>
                <Input
                  className="text-black font-medium"
                  placeholder="Ex. Project Idea"
                  onChange={(event) => setUserInput(event?.target.value)}
                />
                <div className="mt-5 flex gap-5 justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={!userInput || loading}
                    onClick={() => generateFromAI()}
                  >
                    {loading ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIPrompts;
