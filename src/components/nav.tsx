"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { ModeToggle } from "./mode-toggle";

export const Nav = () => {
  const pathname = usePathname();

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
          <div className="text-xl font-semibold">{siteConfig.name}</div>
        </Link>
      </div>

      <NavigationMenu>
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
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">{/* <ModeToggle /> */}</div>
    </nav>
  );
};
