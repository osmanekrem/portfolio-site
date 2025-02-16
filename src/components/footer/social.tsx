import Link from "next/link";
import React from "react";
import { Icon } from "../layout/icon";

export default function Social() {
  return (
    <nav className="flex mt-4 gap-4 items-center">
      <Link
        target="_blank"
        aria-label="send email to Osman Ekrem"
        className="hover:scale-105"
        href="mailto:korkmazosmanekrem@gmail.com"
      >
        <Icon name="email" />
      </Link>
      <Link
        target="_blank"
        aria-label="Osman Ekrem's github profile"
        className="hover:scale-105"
        href="https://github.com/osmanekrem"
      >
        <Icon name="github" />
      </Link>
      <Link
        target="_blank"
        aria-label="Osman Ekrem's linkedin profile"
        className="hover:scale-105"
        href="https://www.linkedin.com/in/osman-ekrem/"
      >
        <Icon name="linkedin" />
      </Link>
      <Link
        target="_blank"
        aria-label="Osman Ekrem's hackerrank profile"
        className="hover:scale-105"
        href="https://www.hackerrank.com/osmanekrem"
      >
        <Icon name="hackerrank" />
      </Link>
    </nav>
  );
}
