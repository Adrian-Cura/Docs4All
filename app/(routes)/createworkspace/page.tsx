"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import originalCover from "@/public/images/cover.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CoverPicker } from "@/components/features/CoverPicker";
import { EmojisPicker } from "@/components/features/EmojisPicker";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth, useUser } from "@clerk/nextjs";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

function createWorkspace() {
  const [coverImage, setCoverImage] = useState<string | StaticImageData>(
    originalCover
  );
  const [emojiPicked, setEmojiPicked] = useState<string | null>();

  const [workSpaceName, setWorkSpaceName] = useState("");
  const { user } = useUser();
  const userId = user?.id;
  const { orgId } = useAuth();
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const OnCreateWorkspace = async () => {
    setLoading(true);
    const workspaceId = Date.now();
    await setDoc(doc(db, "Workspace", workspaceId.toString()), {
      workspaceName: workSpaceName,
      emoji: emojiPicked || null,
      coverImage: coverImage,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userId: user?.id,
      workspaceId: workspaceId.toString(),
      orgId: orgId ? orgId : null,
    });

    const docId = nanoid();
    await setDoc(doc(db, "Documents", docId), {
      workspaceId: workspaceId.toString(),
      emoji: null,
      coverImage: null,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userId: user?.id,
      docId: docId,
      orgId: orgId ? orgId : null,
      documentName: "Untitled document",
      documentOuput: [],
    });

    setLoading(false);

    if (orgId) {
      router.push(`/workspace/org/${orgId}/${workspaceId}/${docId}`);
    } else {
      router.push(`/workspace/personal/${userId}/${workspaceId}/${docId}`);
    }
  };

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        <CoverPicker coverUrl={(v) => setCoverImage(v)}>
          <div className="relative group cursor-pointer">
            <h2 className="hidden font-semibol absolute p-4 w-full h-full transition duration-300 ease-in-out group-hover:flex items-center justify-center">
              Change Cover
            </h2>
            <div className=" transition duration-300 ease-in-out   group-hover:opacity-50">
              <Image
                className="w-full h-[150px] rounded-t-xl object-cover"
                src={coverImage}
                alt="Cover picture"
                width={400}
                height={400}
              />
            </div>
          </div>
        </CoverPicker>

        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="text-sm mt-2">
            This is a collaborative space where you and your team can work
            together in real time. You can rename it later to better suit your
            needs.
          </h2>
          <div className="mt-8 flex gap-2 items-center">
            <EmojisPicker value={(v: string | null) => setEmojiPicked(v)} />

            <Input
              maxLength={16}
              placeholder="Workspace Name"
              onChange={(e) => setWorkSpaceName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end gap-6">
            <Button
              onClick={OnCreateWorkspace}
              disabled={!workSpaceName}
              className="bg-purple-600 hover:bg-purple-700 "
            >
              {Loading ? (
                <LoaderPinwheel className=" animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
            <Button
              onClick={() => router.replace("/dashboard")}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default createWorkspace;
