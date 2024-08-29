"use client";
import EmojisPicker from "@/app/(routes)/_components/EmojisPicker";
import CoverPicker from "@/app/(routes)/_components/CoverPicker";
import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import originalCover from "@/public/images/cover.png";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import { LoaderPinwheel } from "lucide-react";
import { ParamsProps } from "@/@types/params";
import { Input } from "../ui/input";

const DocumentFeatures = ({ params }: { params: ParamsProps }) => {
  const [coverImage, setCoverImage] = useState<string | StaticImageData>(
    originalCover
  );

  const [emoji, setEmoji] = useState<string>();

  const [documentInfo, setDocumentInfo] = useState<DocumentData | undefined>();
  const [emojiDatabase, setEmojiDatabase] = useState<
    string | void | undefined
  >();

  const [imageLoading, setImageLoading] = useState(true);

  const getDocumentInfo = useCallback(async () => {
    const docRef = doc(db, "Documents", params?.docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDocumentInfo(docSnap.data());
      setEmoji(docSnap.data()?.emoji);
      setEmojiDatabase(docSnap.data()?.emoji);
      docSnap.data()?.coverImage && setCoverImage(docSnap.data()?.coverImage);
      setImageLoading(false);
    }
  }, [params?.docId]);

  useEffect(() => {
    params && getDocumentInfo();
  }, [params, emoji, getDocumentInfo]);

  const updateDocumentInfo = async (key: string, value: string) => {
    const docRef = doc(db, "Documents", params?.docId);
    await updateDoc(docRef, {
      [key]: value,
    });
  };

  return (
    <div className="px-2">
      <CoverPicker
        coverUrl={(imageUrl) => {
          setCoverImage(imageUrl);
          updateDocumentInfo("coverImage", imageUrl);
        }}
      >
        <div className="relative group cursor-pointer">
          <h2 className="hidden font-semibol absolute p-4 w-full h-full transition duration-300 ease-in-out group-hover:flex items-center justify-center">
            Change Cover
          </h2>
          <div className=" transition duration-300 ease-in-out   group-hover:opacity-50 overflow-hidden">
            {imageLoading ? (
              <div className="w-full h-[150px]  animate-pulse rounded-md flex justify-center items-center  bg-gradient-to-r from-zinc-200 to-gray-400">
                <LoaderPinwheel
                  color="#7e22ce"
                  size={60}
                  className="animate-spin"
                />
              </div>
            ) : (
              <Image
                className="w-full h-[150px] rounded-t-xl object-cover "
                src={coverImage}
                alt="Cover picture"
                width={800}
                height={800}
                priority={true}
              />
            )}
          </div>
        </div>
      </CoverPicker>
      <div className="absolute ml-10 mt-[-35px] cursor-pointer bg-[#ffffffb0] p-2 rounded-lg ">
        {imageLoading ? (
          <LoaderPinwheel color="#7e22ce" size={45} className="animate-spin" />
        ) : (
          <EmojisPicker
            forDocument={true}
            emojiDatabase={emojiDatabase}
            getEmoji={(value) => {
              setEmoji(value), updateDocumentInfo("emoji", value);
            }}
          />
        )}
      </div>
      <div className="mt-10 p-10 ">
        <Input
          maxLength={22}
          onBlur={(e) => updateDocumentInfo("documentName", e.target.value)}
          className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl outline-none border-none"
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
        />
      </div>
    </div>
  );
};
export default DocumentFeatures;
