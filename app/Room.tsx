"use client";

import { ReactNode } from "react";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { DocumentData } from "firebase/firestore";
import { ParamsProps } from "@/@types/params";
import { useAuth } from "@clerk/nextjs";

interface componentProps {
  children: ReactNode;
  params: ParamsProps;
}

export function Room({ children, params }: componentProps) {
  const { orgId } = useAuth();

  return (
    <LiveblocksProvider
      authEndpoint={`/api/liveblocks-auth?roomId=${params?.docId}`}
      resolveUsers={async ({ userIds }) => {
        const q = query(
          collection(db, "userData"),
          where("userEmail", "in", userIds)
        );
        const querySnapshot = await getDocs(q);
        const userList: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          userList.push(doc.data());
        });
        return userList;
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const q = query(
          collection(db, "userData"),
          where("organization", "!=", null)
        );
        const querySnapshot = await getDocs(q);
        let userList: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
          userList.push(doc.data());
          console.log(userList);
          userList = userList.filter((user) => {
            for (let i = 0; i < user.organization.length; i++) {
              if (user.organization[i].id === orgId) {
                return true;
              }
            }
            return false;
          });
        });
        console.log(userList);

        if (text) {
          // Filter any way you'd like, e.g. checking if the name matches
          userList = userList.filter((user) => user.name.includes(text));
        }
        console.log(userList.map((user) => user.userEmail));

        // Return a list of user IDs that match the query

        return userList.map((user) => user.userEmail);
      }}
    >
      <RoomProvider id={params?.docId ? params?.docId : "1"}>
        {children}
      </RoomProvider>
    </LiveblocksProvider>
  );
}
