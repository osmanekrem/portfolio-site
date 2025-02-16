import React from "react";
import Social from "./social";

export default function Footer() {
  return (
    <footer className="flex mt-5 flex-col items-center justify-center w-full">
      <div className="container py-6 lg:py-12 overflow-hidden flex flex-col items-center text-center justify-center flex-1">
        Design and Coded by <b className="whitespace-nowrap">Osman Ekrem</b>
        <Social />
      </div>
    </footer>
  );
}
