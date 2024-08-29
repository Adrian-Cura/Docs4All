"use client";
import { db } from "@/firebaseConfig";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { LoaderPinwheel, PenBox, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "../ui/input";
import { useState } from "react";

interface componentProps {
  workspaceId: string;
  getWorkspaceList: () => void;
}

function WorkspaceOptions({ workspaceId, getWorkspaceList }: componentProps) {
  const [workspaceNameValue, setWorkspaceNameValue] = useState<
    string | undefined
  >();

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const DeleteWorkspaceAndDocuments = async () => {
    setLoading(true);
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
    setOpenDialog(false);
    setLoading(false);
  };

  const updateWorkspaceName = async (
    key: string,
    value: string | undefined
  ) => {
    setLoading(true);
    const docRef = doc(db, "Workspace", workspaceId);
    await updateDoc(docRef, { [key]: value });
    getWorkspaceList();
    setOpenDialog(false);
    setLoading(false);
  };

  return (
    <div className="flex justify-end items-center gap-2 border-l-2 px-1 ">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div className=" cursor-pointer">
            <PenBox className="h-4 w-4" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Workspace name</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Input
                maxLength={15}
                onChange={(e) => setWorkspaceNameValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-purple-600 hover:bg-purple-700 "
              disabled={!workspaceNameValue}
              onClick={() =>
                updateWorkspaceName("workspaceName", workspaceNameValue)
              }
              type="submit"
            >
              {loading ? (
                <LoaderPinwheel className=" animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex gap-2 text-red-500 focus:text-red-600 cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              workspace and its documents from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" onClick={() => DeleteWorkspaceAndDocuments()}>
              {loading ? (
                <LoaderPinwheel className=" animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default WorkspaceOptions;
