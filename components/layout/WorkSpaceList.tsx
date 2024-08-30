"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
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
  const dateNow = new Date();

  const getWorkspaceList = useCallback(async () => {
    let q;

    if (orgId) {
      q = query(collection(db, "Workspace"), where("orgId", "==", orgId));
    } else {
      q = query(
        collection(db, "Workspace"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress),
        where("orgId", "==", null)
      );
    }

    const querySnapshot = await getDocs(q);
    setList([]);
    querySnapshot.forEach((doc) => {
      setList((prev) => [...prev, doc.data()]);
    });
  }, [orgId, user]);

  useEffect(() => {
    user && getWorkspaceList();
  }, [orgId, user, getWorkspaceList]);

  return (
    <div className="m-10 p10 md:px-20 lg:px-32 xl:px-48">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">{`${
          user?.firstName
            ? "Welcome " + user.firstName
            : "Welcome to your dashboard"
        }`}</h2>
        <Link href={"/createworkspace"}>
          <Button className=" bg-purple-600 hover:bg-purple-800">+</Button>
        </Link>
      </div>
      <div className="mt-10 flex justify-between">
        <div>
          <h2 className="font-medium text-purple-400">Workspaces</h2>
        </div>
        <div className="flex gap-2">{dateNow.toDateString()}</div>
      </div>
      {list?.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-10">
          <Image
            priority={true}
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          {list &&
            list.map((item, index) => (
              <div
                key={index}
                className="border cursor-pointer shadow-xl rounded-xl transition-all ease-in-out duration-100  hover:shadow-2xl"
              >
                <Image
                  onClick={() =>
                    router.push(
                      item.orgId
                        ? `/workspace/org/${item.orgId}/${item.workspaceId}`
                        : `/workspace/personal/${item.userId}/${item.workspaceId}`
                    )
                  }
                  className="rounded-t-xl"
                  alt="Workspace Image"
                  src={item.coverImage}
                  width={400}
                  height={200}
                  priority={true}
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
