import { ParamsProps } from "@/@types/params";
import Image from "next/image";

import { useOrganizationList, useAuth, UserButton } from "@clerk/nextjs";

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

  return (
    <div
      className={`flex ${
        orgId ? "justify-between" : "justify-center"
      } items-center p-3 px-7`}
    >
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
