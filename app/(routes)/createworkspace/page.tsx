"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import originalCover from "@/public/images/cover.png";
import { Button } from "@/components/ui/button";
import { SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import CoverPicker from "@/components/features/coverPicker";
import EmojisPicker from "@/components/features/emojisPicker";

function createWorkSpace() {
  const [coverImage, setCoverImage] = useState<string | StaticImageData>(
    originalCover
  );

  const [workSpaceName, setWorkSpaceName] = useState("");

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        {/*cover image */}
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
        {/*input section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="text-sm mt-2">
            This is a collaborative space where you and your team can work
            together in real time. You can rename it later to better suit your
            needs.
          </h2>
          <div className="mt-8 flex gap-2 items-center">
            <EmojisPicker>
              <SmilePlus />
            </EmojisPicker>
            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkSpaceName(e.target.value)}
            />
          </div>
          <div className="mt-7 flex justify-end gap-6">
            <Button
              disabled={!workSpaceName}
              className="bg-purple-600 hover:bg-purple-700 "
            >
              Create
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default createWorkSpace;
