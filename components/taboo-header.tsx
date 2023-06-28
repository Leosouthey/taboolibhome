"use client";

import TabooDrawer from "@/components/taboo-drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "首页", href: "/" },
  { name: "快速开始", href: "/quickstart" },
  { name: "版本列表", href: "/versions" },
  { name: "文档", href: "/docs" },
];

const TabooHeader = () => {
  const pathname = usePathname();
  return (
    <div className="sticky navbar bg-base-100 mb-8 z-50">
      <TabooDrawer />
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-taboo-primary">
          TabooLib
        </a>
      </div>
      <div className="hidden md:flex">
        {navLinks.map((link) => {
          const isActive = pathname == link.href;
          return (
            <Link
              className={
                isActive
                  ? "text-taboo-primary btn btn-ghost normal-case text-xl h-4"
                  : "btn btn-ghost normal-case text-xl"
              }
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex-none md:hidden">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TabooHeader;
