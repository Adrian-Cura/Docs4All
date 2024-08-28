import { Link2Icon, MoreVertical, PenBox, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { toast } from "sonner";

interface props {
  docId: string;
}

const DocumentOptions = ({ docId }: props) => {
  const date = new Date();
  const dateString = date.toDateString();

  const deleteDocument = async () => {
    await deleteDoc(doc(db, "Documents", docId));
    toast("Document has been deleted", {
      description: dateString,
    });
  };

  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast("Link copied!", {
          description: dateString,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => copyUrlToClipboard()}
            className="flex gap-2"
          >
            <Link2Icon className="h-4 w-4" /> Share Link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteDocument()}
            className="flex gap-2 text-red-500 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DocumentOptions;
