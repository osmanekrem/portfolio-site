import Logo from "@/components/layout/logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex mb-10 mt-2 items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
        <Logo />
        <div className="flex flex-col items-center lg:items-start gap-y-2 h-full">
          <h1 className=" font-bold text-4xl tracking-tight text-center">
            Hi 👋, I&apos;m{" "}
            <span className="whitespace-nowrap text-primary">Osman Ekrem</span>
          </h1>
          <p className="text-2xl font-medium">I&apos;m a web developer</p>
          <ul className="flex flex-col mt-1.5 gap-y-2 items-center lg:items-start text-sm lg:text-base">
            <li>⚽ Beşiktaş JK</li>
            <li>📍 Türkiye</li>
            <li>
              <Link href="mailto:korkmazosmanekrem@gmail.com">
                📧 korkmazosmanekrem@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
