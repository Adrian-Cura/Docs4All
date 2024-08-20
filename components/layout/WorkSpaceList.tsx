"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { AlignLeft, LayoutGrid } from "lucide-react";
import workspaceImage from "@/public/workspace.png";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import WorkspaceOptions from "../features/WorkspaceOptions";

function WorkSpaceList() {
  const router = useRouter();
  const { user } = useUser();
  const { orgId } = useAuth();
  const [list, setList] = useState<DocumentData[]>([]);

  useEffect(() => {
    user && getWorkspaceList();
  }, [orgId, user]);

  const getWorkspaceList = async () => {
    const q = query(
      collection(db, "Workspace"),
      where("orgId", "==", orgId ? orgId : null)
    );
    const querySnapshot = await getDocs(q);
    setList([]);
    querySnapshot.forEach((doc) => {
      setList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div className="m-10 p10 md:px-20 lg:px-32 xl:px-48">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          {list &&
            list.map((item, index) => (
              <div
                key={index}
                className="border shadow-xl rounded-xl transition-all ease-in-out duration-100  hover:shadow-2xl"
              >
                <Image
                  onClick={() => router.push(`/workspace/${item.workspaceId}`)}
                  className="h-[150px] object-cover rounded-t-xl cursor-pointer   "
                  alt="Workspace Image"
                  src={item.coverImage}
                  width={400}
                  height={200}
                />
                <div className="p-4 flex justify-between">
                  <h2>
                    {item.emoji} {item.workspaceName}
                  </h2>
                  <WorkspaceOptions
                    workspaceId={item.workspaceId}
                    getWorkspaceList={getWorkspaceList}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default WorkSpaceList;
