import Image from "next/image";
import logo from "@/public/logo.png";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className=" flex justify-between shadow-sm">
      <div className="flex">
        <Image width={60} height={60} src={logo} alt="logo" />
        <h2 className="self-center font-bold">Docs4All</h2>
      </div>
      <OrganizationSwitcher
        afterCreateOrganizationUrl={"/dashboard"}
        afterLeaveOrganizationUrl={"/dashboard"}
      />
      <div className="p-3">
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
