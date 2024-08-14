import { Link2Icon, MoreVertical, PenBox, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface props {
  docId: string;
}

const DocumentOptions = ({ docId }: props) => {
  const DeleteDocument = async () => {
    await deleteDoc(doc(db, "Documents", docId));
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex gap-2">
            <Link2Icon className="h-4 w-4" /> Share Link
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <PenBox className="h-4 w-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => DeleteDocument()}
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
