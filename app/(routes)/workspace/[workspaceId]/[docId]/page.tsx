import DocumentEditor from "@/components/layout/DocumentEditor";
import SideNav from "@/components/layout/SideNav";

interface ParamsProps {
  docId: string;
  workspaceId: string;
}

const Workspace = ({ params }: { params: ParamsProps }) => {
  return (
    <div>
      {/* Side nav */}
      <div>
        <SideNav params={params} />
      </div>

      {/*Document */}
      <div className="md:ml-72">
        <DocumentEditor />
      </div>
    </div>
  );
};

export default Workspace;
