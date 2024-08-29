"use client";
import { useEffect, useState, useCallback } from "react";
import { db } from "@/firebaseConfig";
import { OnChangeJSON } from "@remirror/react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { RemirrorJSON } from "remirror";
import Draggable from "./Draggable";
import AIPrompts from "./AIPrompts";

interface ParamsProps {
  docId: string;
  workspaceId: string;
  userId?: string;
  orgId?: string;
}

interface MyEditorProps {
  onChange: (json: RemirrorJSON) => void;
  initialContent?: RemirrorJSON;
}

const DocumentRichEditor = ({ params }: { params: ParamsProps }) => {
  const [initialContent, setInitialContent] = useState<
    RemirrorJSON | undefined
  >(undefined);

  // Estado para el contenido generado por la IA
  const [aiGeneratedContent, setAiGeneratedContent] = useState<
    RemirrorJSON | undefined
  >(undefined);

  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const fetchInitialContent = async () => {
      const docRef = doc(db, "Documents", params?.docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInitialContent(docSnap.data()?.documentOuput);
      } else {
        console.log("No such document!");
      }
    };

    fetchInitialContent();
  }, [params?.docId]);

  const handleEditorChange = useCallback(
    async (json: RemirrorJSON) => {
      console.log(json);
      const docRef = doc(db, "Documents", params?.docId);

      try {
        await setDoc(docRef, { documentOuput: json }, { merge: true });
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
    <div>
      <div>
        <MyEditor
          onChange={handleEditorChange}
          initialContent={aiGeneratedContent || initialContent}
        />
      </div>

      <Draggable isDraggable={true} dialogOpen={dialogOpen}>
        <AIPrompts
          setGenerateAIOutput={(outputAi: RemirrorJSON) =>
            setAiGeneratedContent(outputAi)
          }
        />
      </Draggable>
    </div>
  );
};

export default DocumentRichEditor;
