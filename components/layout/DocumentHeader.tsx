"use client";
import Image from "next/image";

import { useOrganizationList, useAuth, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNav from "./SideNav";
import { ParamsProps } from "@/@types/params";
import { useState } from "react";

const DocumentHeader = ({ params }: { params: ParamsProps }) => {
  const { userMemberships } = useOrganizationList({
    userMemberships: true,
  });

  const { orgId } = useAuth();
  let orgName;
  let orgPicture;
  userMemberships.data?.forEach((org) => {
    if (orgId === org.organization.id) {
      orgName = org.organization.name;
      orgPicture = org.organization.imageUrl;
    }
  });

  const [display, setDisplay] = useState(true);

  return (
    <div
      className={`flex ${
        orgId ? "justify-between" : "justify-center"
      } items-center p-3 px-7`}
    >
      <div className=" md:hidden">
        <Sheet>
          <SheetTrigger className="text-white rounded-md p-1 transition-all duration-100 ease-in-out bg-black hover:text-purple-500">
            Menu
          </SheetTrigger>
          <SheetContent className="p-0 bg-purple-800" side="left">
            <SideNav display={display} params={params} />
          </SheetContent>
        </Sheet>
      </div>

      {orgId && (
        <div className="w-full flex gap-2 justify-center items-center">
          {orgPicture && (
            <div>
              <Image
                className=" rounded-lg shadow-md"
                src={orgPicture}
                alt="organization cover picture"
                width={25}
                height={25}
              />
            </div>
          )}
          <div>{orgName}</div>
        </div>
      )}

      <div className="flex gap-2">
        <UserButton />
      </div>
    </div>
  );
};

export default DocumentHeader;
