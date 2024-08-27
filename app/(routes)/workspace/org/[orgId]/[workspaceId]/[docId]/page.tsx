import { ParamsProps } from "@/@types/params";
import { Room } from "@/app/Room";
import DocumentEditor from "@/components/layout/DocumentEditor";
import SideNav from "@/components/layout/SideNav";

const Workspace = ({ params }: { params: ParamsProps }) => {
  return (
    <Room params={params}>
      <div>
        <div>
          <SideNav params={params} />
        </div>

        <div className="md:ml-72">
          <DocumentEditor params={params} />
        </div>
      </div>
    </Room>
  );
};

export default Workspace;
