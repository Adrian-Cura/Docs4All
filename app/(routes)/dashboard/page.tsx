import React from "react";
import { UserButton } from "@clerk/nextjs";

function dashboard() {
  return (
    <div>
      dashboard
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default dashboard;
