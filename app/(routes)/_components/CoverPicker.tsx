"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import images from "@/lib/images";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

const CoverPicker = ({
  children,
  coverUrl,
}: {
  children: React.ReactNode;
  coverUrl: (url: string) => void;
}) => {
  const [selectedCover, setSelectedCover] = useState("");

  return (
    <Dialog>
      <DialogTrigger className="h-full w-full scroll-auto">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update cover</DialogTitle>
          <DialogDescription className="overflow-scroll">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-3 overflow-scroll ">
              {images.map((cover, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCover(cover?.imageUrl)}
                  className={` ${
                    selectedCover === cover.imageUrl &&
                    "  border-2 border-double rounded-md border-purple-600 scale-110 brightness-110 saturate-150 shadow-lg rotate-6  transition duration-200 ease-in-out"
                  }`}
                >
                  <Image
                    alt="Cover picture"
                    src={cover?.imageUrl}
                    width={200}
                    height={200}
                    className=" rounded-md"
                    priority={true}
                  />
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => coverUrl(selectedCover)}
              className="bg-purple-600 hover:bg-purple-700 h-12 "
              type="button"
            >
              Update
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="h-12" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoverPicker;
