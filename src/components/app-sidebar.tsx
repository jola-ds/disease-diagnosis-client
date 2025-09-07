"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { BarChart3, Home, Info, Stethoscope } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Predict",
    url: "/predict",
    icon: Stethoscope,
  },
  {
    title: "Data Analysis",
    url: "/analysis",
    icon: BarChart3,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  if (!isMobile) return null;

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup className="mt-14">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      isActive(item.url) &&
                        "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
