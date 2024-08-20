"use client";
import { useEffect, useState, useCallback } from "react";
import { db } from "@/firebaseConfig";
import { OnChangeJSON } from "@remirror/react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { RemirrorJSON } from "remirror";

interface ParamsProps {
  docId: string;
  workspaceId: string;
}

interface MyEditorProps {
  onChange: (json: RemirrorJSON) => void;
  initialContent?: RemirrorJSON;
}

const DocumentRichEditor = ({ params }: { params: ParamsProps }) => {
  const [initialContent, setInitialContent] = useState<
    RemirrorJSON | undefined
  >(undefined);

  useEffect(() => {
    const fetchInitialContent = async () => {
      const docRef = doc(db, "documentOuput", params?.docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInitialContent(docSnap.data()?.output);
      } else {
        console.log("No such document!");
      }
    };

    fetchInitialContent();
  }, [params?.docId]);

  const handleEditorChange = useCallback(
    async (json: RemirrorJSON) => {
      const docRef = doc(db, "documentOuput", params?.docId);

      try {
        await setDoc(docRef, { output: json }, { merge: true });
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    [params?.docId]
  );

  const MyEditor: React.FC<MyEditorProps> = ({ onChange, initialContent }) => {
    return (
      <div style={{ padding: 16 }}>
        <WysiwygEditor
          placeholder="Enter text..."
          initialContent={initialContent}
        >
          <OnChangeJSON onChange={onChange} />
        </WysiwygEditor>
      </div>
    );
  };

  return (
    <MyEditor onChange={handleEditorChange} initialContent={initialContent} />
  );
};

export default DocumentRichEditor;
