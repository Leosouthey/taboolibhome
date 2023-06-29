"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NewBlank from "@/components/new-blank";

const navLinks = [
  { name: "首页", href: "/" },
  { name: "快速开始", href: "/quickstart" },
  { name: "版本列表", href: "/versions" },
  { name: "文档", href: "/docs" },
];

const PageHeader = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();
  const headerClasses =
    "fixed top-0 left-0 right-0 transition-shadow flex items-center bg-background mb-8 z-50 h-16 lg:px-[20%] md:px-[5%] px-[3%]";
  return (
    <div className={isAtTop ? headerClasses : headerClasses + " shadow-2xl"}>
      {/*<TabooDrawer />*/}
      <div className="flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-taboo bg-background normal-case text-xl shadow-none hover:bg-hover">
              TabooLib
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 border-none">
            <DropdownMenuItem
              onClick={() => {
                window.open("https://github.com/TabooLib/adyeshach", "_self");
              }}
            >
              Adyeshach
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                window.open("https://github.com/TabooLib/chemdah", "_self");
              }}
            >
              Chemdah
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                window.open("https://kether.tabooproject.org", "_self");
              }}
            >
              Kether
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <NavigationMenu className="flex-1">
        <NavigationMenuList>
          {navLinks.map((link, key) => {
            const isActive = pathname == link.href;
            return (
              <NavigationMenuItem key={key}>
                <Link legacyBehavior passHref href={link.href}>
                  <NavigationMenuLink
                    className={
                      isActive
                        ? navigationMenuTriggerStyle() + " text-taboo"
                        : navigationMenuTriggerStyle()
                    }
                  >
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex-1 flex justify-end">
        <NewBlank
          href="https://github.com/TabooLib/taboolib"
          className="cursor-pointer"
        >
          <BsGithub size="24px" />
        </NewBlank>
      </div>
      {/*<div className="flex-none md:hidden">*/}
      {/*  <button className="btn btn-square btn-ghost">*/}
      {/*    <svg*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*      fill="none"*/}
      {/*      viewBox="0 0 24 24"*/}
      {/*      className="inline-block w-5 h-5 stroke-current"*/}
      {/*    >*/}
      {/*      <path*/}
      {/*        strokeLinecap="round"*/}
      {/*        strokeLinejoin="round"*/}
      {/*        strokeWidth="2"*/}
      {/*        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"*/}
      {/*      ></path>*/}
      {/*    </svg>*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
};

export default PageHeader;
