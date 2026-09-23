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
  dates?: string;
  distance?: string;
  guestFavorite?: boolean;
  photoCount?: number;
  photoIndex?: number;
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
      <div className="relative isolate aspect-square overflow-hidden rounded-lg bg-muted">
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
        {stay.guestFavorite && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-badge text-foreground shadow-float">
            房客推荐
          </span>
        )}
        {(stay.photoCount ?? 0) > 1 && (
          <span className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1" aria-hidden="true">
            {Array.from({ length: Math.min(stay.photoCount ?? 0, 5) }, (_, index) => (
              <span key={index} className={cn("size-1.5 rounded-full bg-background/70", index === (stay.photoIndex ?? 0) && "bg-background")} />
            ))}
          </span>
        )}
        <button
          type="button"
          aria-label={`${saved ? "取消收藏" : "收藏"}${stay.title}`}
          aria-pressed={saved}
          onClick={() => onSavedChange(!saved)}
          className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-full transition-transform motion-safe:hover:scale-110"
        >
          <Heart
            className={cn(
              "size-6 [stroke-width:2] [filter:drop-shadow(0_1px_2px_rgb(0_0_0/45%))]",
              saved ? "fill-primary text-white" : "fill-black/50 text-white",
            )}
          />
        </button>
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-title-md">
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
        <div className="flex items-end justify-between gap-4 text-body-sm">
          <div className="min-w-0 text-muted-foreground">
            <p className="truncate">{stay.location} · {stay.description}</p>
            {(stay.distance || stay.dates) && <p className="truncate">{[stay.distance, stay.dates].filter(Boolean).join(" · ")}</p>}
          </div>
          <p className="shrink-0 text-right">
            <strong className="font-semibold">¥{stay.price}</strong>
            <span className="text-muted-foreground"> / 晚</span>
          </p>
        </div>
      </div>
    </article>
  );
}
