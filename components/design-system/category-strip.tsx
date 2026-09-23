"use client";

import type { ComponentType } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CategoryIcon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

export type CategoryItem = {
  value: string;
  label: string;
  icon: CategoryIcon;
  isNew?: boolean;
};

export function NewTag() {
  return (
    <Badge className="h-auto border-0 bg-primary px-1.5 py-0.5 text-uppercase-tag text-background">
      NEW
    </Badge>
  );
}

export function CategoryStrip({
  items,
  value,
  onValueChange,
  label = "浏览分类",
  className,
}: {
  items: CategoryItem[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn("min-w-0 border-b", className)}>
      <div className="flex min-w-max items-stretch gap-7 overflow-x-auto px-1">
        {items.map(({ value: itemValue, label: itemLabel, icon: Icon, isNew }) => {
          const active = value === itemValue;
          return (
            <button
              key={itemValue}
              type="button"
              aria-pressed={active}
              onClick={() => onValueChange(itemValue)}
              className={cn(
                "relative flex min-h-20 min-w-20 flex-col items-center justify-center gap-2 border-b-2 border-transparent px-2 text-caption text-muted-foreground transition-colors hover:text-foreground",
                active && "border-foreground text-foreground",
              )}
            >
              <span className="relative">
                <Icon className="size-6" aria-hidden="true" />
                {isNew && <span className="absolute -right-7 -top-3"><NewTag /></span>}
              </span>
              {itemLabel}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
