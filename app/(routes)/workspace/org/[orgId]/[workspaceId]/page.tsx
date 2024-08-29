"use client";
import { ParamsProps } from "@/@types/params";

import SideNav from "@/components/layout/SideNav";
import WorkspaceHero from "@/components/layout/WorkspaceHero";
import React, { useState } from "react";

const OrgPage = ({ params }: { params: ParamsProps }) => {
  const [display, setDisplay] = useState(true);

  return (
    <div>
      <SideNav display={display} params={params} />
      <WorkspaceHero display={display} />
    </div>
  );
};

export default OrgPage;
