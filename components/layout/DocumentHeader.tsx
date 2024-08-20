import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const DocumentHeader = () => {
  return (
    <div className="flex justify-between items-center p-3 px-7 shadow-md">
      <div></div>
      <div>
        <OrganizationSwitcher />
      </div>
      <div className="flex gap-2">
        <UserButton />
      </div>
    </div>
  );
};

export default DocumentHeader;
