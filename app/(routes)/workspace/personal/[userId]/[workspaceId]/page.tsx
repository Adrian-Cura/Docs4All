import { ParamsProps } from "@/@types/params";
import SideNav from "@/components/layout/SideNav";
import React from "react";

const page = ({ params }: { params: ParamsProps }) => {
  return (
    <div>
      <SideNav params={params} />
    </div>
  );
};

export default page;
