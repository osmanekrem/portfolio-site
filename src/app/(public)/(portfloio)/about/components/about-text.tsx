import Logo from "@/components/layout/logo";
import React from "react";

export default function AboutText() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
      <Logo />
      <div className="flex flex-col gap-y-4 w-full">
        <h1 className="text-3xl font-bold">Who am I? 🚀</h1>
        <div className="flex flex-col gap-y-4 w-full">
          <p>
            Hello there! I&apos;m Osman Ekrem, a passionate frontend developer
            with a knack for crafting engaging user experiences. Born as the
            digital age was dawning in late 2006, II&apos;ve been intertwined
            with code from my middle school days. It all started with Python. My
            journey through Java and other languages led me to the vibrant world
            of frontend development during my high school years.
          </p>
          <p>
            Today, I stand as a frontend developer, orchestrating symphonies of
            ReactJS, Next.js, and Angular to create harmonious websites that
            sing to the userI&apos;s soul. My skills are an open book, just take
            a peek at the skills tab - no need for a Bat-Signal to find them!
          </p>
        </div>
      </div>
    </div>
  );
}
