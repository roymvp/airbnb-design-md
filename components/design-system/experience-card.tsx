"use client";

import { Heart, Star } from "lucide-react";
import { NewTag } from "@/components/design-system/category-strip";
import { cn } from "@/lib/utils";

export type Experience = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: string;
  image: string;
  imageAlt: string;
  isNew?: boolean;
};

export function ExperienceCard({
  experience,
  saved,
  onSavedChange,
  onSelect,
  priority = false,
}: {
  experience: Experience;
  saved: boolean;
  onSavedChange: (saved: boolean) => void;
  onSelect: () => void;
  priority?: boolean;
}) {
  return (
    <article className="group flex min-w-0 flex-col gap-3">
      <div className="relative isolate aspect-[4/5] overflow-hidden rounded-md bg-muted">
        <button
          type="button"
          className="size-full text-left focus-visible:outline-offset-[-4px]"
          onClick={onSelect}
          aria-label={`查看${experience.title}`}
        >
          <img
            src={experience.image}
            alt={experience.imageAlt}
            width={640}
            height={800}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="size-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
          />
        </button>
        {experience.isNew && <span className="absolute left-3 top-3"><NewTag /></span>}
        <button
          type="button"
          aria-label={`${saved ? "取消收藏" : "收藏"}${experience.title}`}
          aria-pressed={saved}
          onClick={() => onSavedChange(!saved)}
          className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background"
        >
          <Heart className={cn("size-5", saved && "fill-primary text-primary")} />
        </button>
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-title-md">
            <button type="button" onClick={onSelect} className="hover:underline">
              {experience.title}
            </button>
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-body-sm">
            <Star className="size-3.5 fill-foreground" aria-hidden="true" />
            {experience.rating}
          </span>
        </div>
        <p className="text-body-sm text-muted-foreground">{experience.location}</p>
        <p className="text-body-sm">
          <strong className="font-semibold">¥{experience.price}</strong>
          <span className="text-muted-foreground"> / 人</span>
        </p>
      </div>
    </article>
  );
}
