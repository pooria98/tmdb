"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  const baseClass =
    "block p-2 font-[500] text-white transition-all hover:scale-105";
  const activeClass = "underline underline-offset-4 scale-105";

  return (
    <>
      <Link
        href="/movies"
        className={`${baseClass} ${pathname === "/movies" && activeClass}`}
      >
        Movies
      </Link>
      <Link
        href="/series"
        className={`${baseClass} ${pathname === "/series" && activeClass}`}
      >
        Series
      </Link>
      <Link
        href="/celebrities"
        className={`${baseClass} ${pathname === "/celebrities" && activeClass}`}
      >
        Celebrities
      </Link>
      <Link
        href="/people"
        className={`${baseClass} ${pathname === "/people" && activeClass}`}
      >
        People
      </Link>
    </>
  );
};

export default NavLinks;
