"use client";

import { Bell, LoaderPinwheel, PenLine } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import DocumentList from "../features/DocumentList";
import { useAuth, useUser } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { Progress } from "../ui/progress";
import { useRouter } from "next/navigation";
import { ParamsProps } from "@/@types/params";
import NotificationBox from "../features/NotificationBox";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import Link from "next/link";

const SideNav = ({ params }: { params: ParamsProps }) => {
  const [documentList, setDocumentList] = useState<DocumentData[]>([]);
  const { user } = useUser();
  const userId = user?.id;
  const { orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [docsLength, setDocsLength] = useState<number>(1);
  const [workspaceName, setWorkspaceName] = useState<string>();

  const getDocumentList = useCallback(() => {
    const q = query(
      collection(db, "Documents"),
      where("workspaceId", "==", params?.workspaceId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedDocumentList: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        updatedDocumentList.push(doc.data());
      });

      setDocumentList(updatedDocumentList);
      setDocsLength(updatedDocumentList.length);
    });

    return () => unsubscribe();
  }, [params]);
  useEffect(() => {
    getDocumentList();
  }, [params, getDocumentList]);

  useEffect(() => {
    const getWorkspace = async () => {
      const docRef = doc(db, "Workspace", params?.workspaceId);
      const docSnap = await getDoc(docRef);
      setWorkspaceName(docSnap.data()?.workspaceName);
    };
    getWorkspace();
  }, [params, getDocumentList]);

  const CreateNewDocument = async () => {
    if (documentList.length > 4) {
      alert("You have reached the maximum number of documents.");
      return;
    }

    setLoading(true);
    const docId = nanoid();
    await setDoc(doc(db, "Documents", docId), {
      workspaceId: params.workspaceId.toString(),
      emoji: null,
      coverImage: null,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userId: user?.id,
      docId: docId,
      orgId: orgId ? orgId : null,
      documentName: "Untitled document",
      documentOuput: [],
    });
    if (orgId) {
      router.replace(`/workspace/org/${orgId}/${params.workspaceId}/${docId}`);
    } else {
      router.replace(
        `/workspace/personal/${userId}/${params.workspaceId}/${docId}`
      );
    }

    setLoading(false);
  };

  return (
    <div className="h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md ">
      <div className="flex justify-between items-center">
        <Link
          className="flex items-center justify-center ml-3"
          href="/dashboard"
        >
          <PenLine className="h-6 w-6 text-primary" />
          <span className="sr-only">Docs4All</span>
        </Link>
        {params.docId && orgId && (
          <ClientSideSuspense
            fallback={
              <div>
                <LoaderPinwheel className=" animate-spin" />
              </div>
            }
          >
            <div>
              <NotificationBox>
                <Bell className="h-6 w-6 text-gray-500" />
              </NotificationBox>
            </div>
          </ClientSideSuspense>
        )}
      </div>
      <hr className=" my-5" />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium">{workspaceName}</h2>
          <Button
            onClick={CreateNewDocument}
            className=" bg-purple-600 hover:bg-purple-800"
            size="sm"
          >
            {loading ? <LoaderPinwheel className=" animate-spin" /> : "+"}
          </Button>
        </div>
      </div>
      <DocumentList params={params} documentList={documentList} />
      <div className="absolute bottom-10 w-[85%]">
        {<Progress value={(docsLength / 5) * 100} />}
        <p>
          <strong>{documentList?.length}</strong> out of <strong>5</strong>
        </p>
      </div>
    </div>
  );
};

export default SideNav;
