"use client";
import Logo from "@/public/logo.png";
import { Bell, LoaderPinwheel } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import DocumentList from "../features/DocumentList";
import { useUser } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { Progress } from "../ui/progress";
import { useRouter } from "next/navigation";

interface ParamsProps {
  docId: string;
  workspaceId: string;
}

const SideNav = ({ params }: { params: ParamsProps }) => {
  const [documentList, setDocumentList] = useState<DocumentData[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [docsLength, setDocsLength] = useState<number>(1);

  useEffect(() => {
    params && getDocumentList();
  }, [params]);

  const getDocumentList = () => {
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
  };

  const CreateNewDocument = async () => {
    if (documentList.length > 5) {
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
      docId: docId,
      documentName: "Untitled document",
      documentOuput: [],
    });
    router.replace(`/workspace/${params.workspaceId}/${docId}`);

    setLoading(false);
  };

  return (
    <div className="h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md">
      <div className="flex justify-between items-center">
        <Image src={Logo} alt="Logo" width={60} height={60}></Image>
        <Bell className="h-5 w-5 text-gray-500" />
      </div>
      <hr className=" my-5" />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Workspace Name</h2>
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
          <strong>{documentList?.length}</strong> of <strong>5</strong>
        </p>
      </div>
    </div>
  );
};

export default SideNav;
