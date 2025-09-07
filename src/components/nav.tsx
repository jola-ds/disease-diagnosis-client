"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { ModeToggle } from "./mode-toggle";

export const Nav = () => {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="app-container flex h-16 items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className="text-xl font-semibold">Disease Diagnosis</div>
        </Link>
      </div>

      {/* Desktop navigation - hidden on mobile */}
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/") && "bg-accent text-accent-foreground",
              )}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/predict") && "bg-accent text-accent-foreground",
              )}
            >
              <Link href="/predict">Predict</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/analysis") && "bg-accent text-accent-foreground",
              )}
            >
              <Link href="/analysis">Data Analysis</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/about") && "bg-accent text-accent-foreground",
              )}
            >
              <Link href="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        {/* <ModeToggle /> */}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};
