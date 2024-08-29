"use client";
import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentFeatures from "../features/DocumentFeatures";
import DocumentRichEditor from "../features/DocumentRichEditor";
import { Button } from "../ui/button";
import { MessageCircle, X } from "lucide-react";
import CommentBox from "../features/CommentBox";
import { ParamsProps } from "@/@types/params";
import { useAuth } from "@clerk/nextjs";

const DocumentEditor = ({ params }: { params: ParamsProps }) => {
  const { orgId } = useAuth();

  const [openComment, setOpenComment] = useState(false);
  return (
    <div>
      <DocumentHeader params={params} />
      <section>
        <DocumentFeatures params={params} />
      </section>
      <section>
        <DocumentRichEditor params={params} />
      </section>
      {params.docId && orgId && (
        <div className="fixed  bottom-[40px] right-[60px]  lg:right-10 lg:bottom-10  ">
          <Button onClick={() => setOpenComment(!openComment)}>
            {openComment ? (
              <X />
            ) : (
              <MessageCircle className="hover:animate-pulse" />
            )}
          </Button>
          {openComment && <CommentBox />}
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;
