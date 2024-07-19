import React from "react";

const NavBar = () => {
  return (
    <div>
      <div className="bg-black text-white h-10 flex w-full justify-between p-2">
        <div>logo</div>
        <div className="flex mx-3 p-2">
          <div className="mx-2">Link1</div>
          <div>Link2</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
