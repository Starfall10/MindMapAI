import Link from "next/link";
import React from "react";
import { TbTopologyComplex } from "react-icons/tb";
const NavBar = () => {
  return (
    <div className="bg-black text-white h-16 flex w-full justify-between p-2 items-center z-30">
      <div className="text-6xl flex items-center	">
        <TbTopologyComplex />
        <span className="text-4xl font-bold">IdeaFlow</span>
      </div>
      <div className="flex mx-3 p-2 text-2xl font-semibold">
        <div className="mx-2">
          <Link href="http://localhost:3000">Home</Link>
        </div>
        <div className="mx-2">|</div>
        <div className="mx-2">
          <Link href="http://localhost:3000/editorPage">Editor</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
