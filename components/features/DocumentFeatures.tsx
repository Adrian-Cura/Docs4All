"use client";
import CoverPicker from "./CoverPicker";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import originalCover from "@/public/images/cover.png";
import EmojisPicker from "./EmojisPicker";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import { LoaderPinwheel } from "lucide-react";

interface ParamsProps {
  docId: string;
  workspaceId: string;
  userId?: string;
  orgId?: string;
}

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

  useEffect(() => {
    params && getDocumentInfo();
  }, [params, emoji]);

  const getDocumentInfo = async () => {
    const docRef = doc(db, "Documents", params?.docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDocumentInfo(docSnap.data());
      setEmoji(docSnap.data()?.emoji);
      setEmojiDatabase(docSnap.data()?.emoji);
      docSnap.data()?.coverImage && setCoverImage(docSnap.data()?.coverImage);
      setImageLoading(false);
    }
  };

  const updateDocumentInfo = async (key: string, value: string) => {
    const docRef = doc(db, "Documents", params?.docId);
    await updateDoc(docRef, {
      [key]: value,
    });
  };

  return (
    <div>
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
          <div className=" transition duration-300 ease-in-out   group-hover:opacity-50">
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
                className="w-full h-[150px] rounded-t-xl object-cover"
                src={coverImage}
                alt="Cover picture"
                width={800}
                height={800}
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
      <div className="mt-10 p-10">
        <input
          maxLength={22}
          onBlur={(e) => updateDocumentInfo("documentName", e.target.value)}
          className="font-bold text-4xl outline-none "
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
        />
      </div>
    </div>
  );
};
export default DocumentFeatures;
