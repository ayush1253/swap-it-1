"use client";
import { siteConfig } from "@/config/site";
import MainNav from "./main-nav";
import { Input } from "../ui/input";
import MobileNav from "./sideNav";
import Link from "next/link";
import { Icons } from "./icons";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const handleSlider = () => {
  if (isOpen !== undefined && setIsOpen !== undefined) {
    setIsOpen(!isOpen);
  }
};

export function SiteHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-20 backdrop-blur-sm bg-backgroundOpac top-0 z-40 w-full border-b">
      <div className="pt-5 container flex h-16 items-center sm:space-x-0">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={handleSlider}
          passHref>
          <Icons.logo className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <div className="hidden md:flex">
            <MainNav items={siteConfig.mainNav} isVisible={true} />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          {/* <div>
            <Button
            href="/uploadProd"
            >
              Sell
            </Button>
          </div> */}
          <nav className="flex items-center space-x-1">
            <form onSubmit={handleSearch} className="max-w-4xl hidden lg:block pr-5">
              <Input 
                placeholder="Search Product" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <div className="md:hidden">
                <MobileNav />
              </div>
          </nav>
        </div>
      </div>
    </header>
  );
  {/* </ClerkProvider> */ }

}

