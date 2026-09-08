"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type NavigationItem = { label: string; href: string };

export function Navigation({
  title,
  items,
  activeHref,
  onNavigate,
  actions,
  className,
}: {
  title: string;
  items: NavigationItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  actions?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const links = (mobile = false) =>
    items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        aria-current={activeHref === item.href ? "page" : undefined}
        onClick={() => {
          setOpen(false);
          onNavigate?.(item.href);
        }}
        className={cn(
          "flex min-h-12 items-center text-base font-medium text-muted-foreground hover:text-foreground",
          activeHref === item.href && "text-foreground",
          !mobile && activeHref === item.href && "border-b-2 border-foreground",
          mobile && "px-3",
        )}
      >
        {item.label}
      </a>
    ));
  return (
    <header
      className={cn(
        "flex h-20 items-center justify-between border-b bg-background px-6 text-foreground",
        className,
      )}
    >
      <span className="text-base font-semibold">{title}</span>
      <nav
        aria-label={`${title}导航`}
        className="hidden h-full items-center gap-8 md:flex"
      >
        {links()}
      </nav>
      <div className="flex items-center gap-2">
        {actions}
        <div className="md:hidden">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="打开导航" />
              }
            >
              <Menu />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <nav aria-label="移动端导航" className="flex flex-col gap-2">
                {links(true)}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
