"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { AlignLeft, LayoutGrid } from "lucide-react";
import workspaceImage from "@/public/workspace.png";
import Image from "next/image";
import Link from "next/link";

function WorkSpaceList() {
  const { user } = useUser();
  const [list, setList] = useState([]);

  return (
    <div className="my-10 p10 md:px-24 lg:px-36 xl:px-52">
      <div className="flex justify-between">
        <h2 className="font-bold">Hello, {user?.firstName}</h2>
        <Link href={"/createworkspace"}>
          <Button className=" bg-purple-600 hover:bg-purple-800">+</Button>
        </Link>
      </div>
      <div className="mt-10 flex justify-between">
        <div>
          <h2 className="font-medium text-purple-400">Workspaces</h2>
        </div>
        <div className="flex gap-2">
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {list?.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-10">
          <Image
            src={workspaceImage}
            alt="Workspace image"
            width={200}
            height={200}
          />
          <h2>Create a new workspace!</h2>
          <Link href={"/createworkspace"}>
            <Button className="my-3 bg-purple-600 hover:bg-purple-800">
              + Workspace
            </Button>
          </Link>
        </div>
      ) : (
        <div>Workspace List</div>
      )}
    </div>
  );
}

export default WorkSpaceList;
