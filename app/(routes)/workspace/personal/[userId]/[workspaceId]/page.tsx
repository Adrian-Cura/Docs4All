import { ParamsProps } from "@/@types/params";
import SideNav from "@/components/layout/SideNav";
import WorkspaceHero from "@/components/layout/WorkspaceHero";
import React from "react";

const page = ({ params }: { params: ParamsProps }) => {
  return (
    <div className="flex">
      <SideNav params={params} />
      <WorkspaceHero />
    </div>
  );
};

export default page;
