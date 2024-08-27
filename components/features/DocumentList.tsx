"use client";
import { DocumentData } from "firebase/firestore";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import DocumentOptions from "./DocumentOptions";
import { useAuth, useUser } from "@clerk/nextjs";
import { ParamsProps } from "@/@types/params";

interface DocumentListProps {
  documentList: DocumentData[];
  params: ParamsProps;
}

const DocumentList = ({ documentList, params }: DocumentListProps) => {
  const router = useRouter();

  const { user } = useUser();
  const userId = user?.id;
  const { orgId } = useAuth();

  return (
    <div className="h-full w-full">
      {documentList.map((doc: DocumentData, index: number) => (
        <div
          key={index}
          className={`mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer flex justify-between items-center ${
            doc.docId === params.docId && "bg-white"
          }`}
        >
          <div
            onClick={() =>
              router.push(
                doc.orgId
                  ? `/workspace/org/${doc.orgId}/${doc.workspaceId}/${doc.docId}`
                  : `/workspace/personal/${doc.userId}/${doc.workspaceId}/${doc.docId}`
              )
            }
            className="flex gap-3 items-center"
          >
            <FileText className="text-purple-500" />

            <h2>
              {doc.emoji} {doc.documentName}
            </h2>
          </div>
          <DocumentOptions docId={doc.docId} />
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
