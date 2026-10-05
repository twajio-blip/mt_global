import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { ASSOCIATION } from "../../data/site";

export function Header() {
  return (
    <header className="w-full bg-mcaa-blue">
      <div className="mx-auto flex max-w-shell items-center gap-4 px-4 py-4 sm:gap-6 sm:py-5 lg:px-6">
        <Link
          to="/"
          className="shrink-0"
          aria-label={`${ASSOCIATION.abbr} home`}
        >
          <Logo size={72} className="sm:hidden" />
          <Logo size={108} className="hidden sm:block" />
        </Link>
        <div className="min-w-0">
          <p className="mt-1 text-[16px] font-medium leading-snug text-white sm:text-[20px] lg:text-[23px]">
            {ASSOCIATION.nameEn}
          </p>
        </div>
      </div>
    </header>
  );
}
