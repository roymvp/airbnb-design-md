"use client";

import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type Stay = {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  rating: string;
  image: string;
  imageAlt: string;
  capacity: number;
};

export function StayCard({
  stay,
  saved,
  onSavedChange,
  onSelect,
  priority = false,
}: {
  stay: Stay;
  saved: boolean;
  onSavedChange: (saved: boolean) => void;
  onSelect: () => void;
  priority?: boolean;
}) {
  return (
    <article className="group flex min-w-0 flex-col gap-3">
      <div className="relative isolate aspect-square overflow-hidden rounded-md bg-muted">
        <button
          type="button"
          className="size-full text-left focus-visible:outline-offset-[-4px]"
          onClick={onSelect}
          aria-label={`查看${stay.title}`}
        >
          <img
            src={stay.image}
            alt={stay.imageAlt}
            width={640}
            height={640}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="size-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
          />
        </button>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-sm font-medium text-foreground shadow-float">
          住宿示例
        </span>
        <button
          type="button"
          aria-label={`${saved ? "取消收藏" : "收藏"}${stay.title}`}
          aria-pressed={saved}
          onClick={() => onSavedChange(!saved)}
          className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background"
        >
          <Heart
            className={cn("size-5", saved && "fill-primary text-primary")}
          />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-semibold">
            <button
              type="button"
              onClick={onSelect}
              className="hover:underline"
            >
              {stay.title}
            </button>
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="size-3.5 fill-foreground" aria-hidden="true" />
            {stay.rating}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {stay.location} · {stay.description}
        </p>
        <p className="text-sm">
          <strong className="font-semibold">¥{stay.price}</strong>
          <span className="text-muted-foreground"> / 晚</span>
        </p>
      </div>
    </article>
  );
}
