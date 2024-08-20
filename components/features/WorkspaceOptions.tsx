import { db } from "@/firebaseConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { MoreVertical, PenBox, Trash2 } from "lucide-react";

interface componentProps {
  workspaceId: string;
  getWorkspaceList: () => void;
}

function WorkspaceOptions({ workspaceId, getWorkspaceList }: componentProps) {
  const DeleteWorkspaceAndDocuments = async () => {
    // Referencia a la colección "Documents" dentro de este Workspace
    const documentsRef = collection(db, "Documents");

    // Consulta para obtener los documentos relacionados con el workspaceId
    const q = query(documentsRef, where("workspaceId", "==", workspaceId));

    // Obtener los documentos que coinciden con la consulta
    const querySnapshot = await getDocs(q);

    // Borrar cada documento relacionado con el Workspace
    const deleteDocumentPromises = querySnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );

    // Esperar a que se borren todos los documentos
    await Promise.all(deleteDocumentPromises);

    // Ahora borrar el documento de Workspace
    await deleteDoc(doc(db, "Workspace", workspaceId));

    // Funcion para renderizar los workspaces nuevamente actualizados
    getWorkspaceList();
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex gap-2">
            <PenBox className="h-4 w-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => DeleteWorkspaceAndDocuments()}
            className="flex gap-2 text-red-500 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default WorkspaceOptions;
