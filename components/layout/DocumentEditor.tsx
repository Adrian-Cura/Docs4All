import React from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentFeatures from "../features/DocumentFeatures";
import DocumentRichEditor from "../features/DocumentRichEditor";

interface ParamsProps {
  docId: string;
  workspaceId: string;
}

const DocumentEditor = ({ params }: { params: ParamsProps }) => {
  return (
    <div>
      <DocumentHeader />
      <section>
        <DocumentFeatures params={params} />
      </section>
      <section>
        <DocumentRichEditor params={params} />
      </section>
    </div>
  );
};

export default DocumentEditor;
