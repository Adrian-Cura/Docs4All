"use client";
import DocumentEditor from "@/components/layout/DocumentEditor";
import SideNav from "@/components/layout/SideNav";
import { ParamsProps } from "@/@types/params";

const Workspace = ({ params }: { params: ParamsProps }) => {
  return (
    <div>
      <div>
        <SideNav params={params} />
      </div>

      <div className="md:ml-72">
        <DocumentEditor params={params} />
      </div>
    </div>
  );
};

export default Workspace;
