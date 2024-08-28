import { ParamsProps } from "@/@types/params";
import { Room } from "@/app/Room";
import DocumentEditor from "@/components/layout/DocumentEditor";
import SideNav from "@/components/layout/SideNav";

const Workspace = ({ params }: { params: ParamsProps }) => {
  return (
    <Room params={params}>
      <div className="w-max-[400px] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl ">
        <div>
          <SideNav params={params} />
        </div>

        <div className=" w-max-[400px] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl  md:ml-72">
          <DocumentEditor params={params} />
        </div>
      </div>
    </Room>
  );
};

export default Workspace;
