import SideNav from "@/components/layout/SideNav";
import React from "react";

interface paramosProps {
  docId: string;
  workspaceId: string;
}

const page = ({ params }: { params: paramosProps }) => {
  return (
    <div>
      <SideNav params={params} />
    </div>
  );
};

export default page;
