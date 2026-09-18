"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { Minus, Plus, Wheat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DetailIcon = ComponentType<SVGProps<SVGSVGElement>>;

export function RatingDisplay({
  rating,
  label = "房客推荐",
  stats,
}: {
  rating: string;
  label?: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <section aria-label={`${label}，评分 ${rating}`} className="rounded-md border p-6 text-center md:p-8">
      <div className="flex items-center justify-center gap-4">
        <Wheat className="size-8 -rotate-45" strokeWidth={1.3} aria-hidden="true" />
        <strong className="text-rating tracking-[-1px]">{rating}</strong>
        <Wheat className="size-8 rotate-45 -scale-x-100" strokeWidth={1.3} aria-hidden="true" />
      </div>
      <p className="text-display-md">{label}</p>
      <dl className="mt-6 grid sm:grid-cols-3 sm:divide-x sm:divide-border">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 px-3 py-3 sm:py-0">
            <dt className="text-body-sm text-muted-foreground">{stat.label}</dt>
            <dd className="text-title-md">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export type Amenity = { label: string; icon: DetailIcon };

export function AmenityList({ title = "房源设施", amenities }: { title?: string; amenities: Amenity[] }) {
  return (
    <section aria-labelledby="amenities-heading" className="border-y py-6">
      <h2 id="amenities-heading" className="text-display-md">{title}</h2>
      <ul className="mt-4 grid gap-x-8 md:grid-cols-2">
        {amenities.map(({ label, icon: Icon }) => (
          <li key={label} className="flex min-h-12 items-center gap-4 text-body-md">
            <Icon className="size-5 shrink-0" strokeWidth={1.7} aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type Review = {
  id: string;
  author: string;
  date: string;
  excerpt: string;
  avatarSrc?: string;
};

function Avatar({ name, src }: { name: string; src?: string }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-strong text-sm font-semibold" aria-hidden="true">
      {src ? <img src={src} alt="" width={48} height={48} className="size-full object-cover" /> : name.slice(0, 1)}
    </span>
  );
}

export function ReviewsGrid({ title = "住客评价", reviews }: { title?: string; reviews: Review[] }) {
  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-display-md">{title}</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="flex flex-col gap-4">
            <header className="flex items-center gap-3">
              <Avatar name={review.author} src={review.avatarSrc} />
              <div>
                <h3 className="text-title-md">{review.author}</h3>
                <p className="text-body-sm text-muted-foreground">{review.date}</p>
              </div>
            </header>
            <p className="line-clamp-3 text-body-md text-body">{review.excerpt}</p>
            <button type="button" className="min-h-11 self-start text-body-sm font-semibold underline underline-offset-4">展开阅读</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HostCard({
  name,
  description,
  responseRate,
  avatarSrc,
  onContact,
}: {
  name: string;
  description: string;
  responseRate: string;
  avatarSrc?: string;
  onContact?: () => void;
}) {
  return (
    <section aria-labelledby="host-heading" className="rounded-md border p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={name} src={avatarSrc} />
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="host-heading" className="text-display-sm">房东：{name}</h2>
              <Badge variant="secondary">超赞房东</Badge>
            </div>
            <p className="text-body-sm text-muted-foreground">{description}</p>
            <p className="text-body-sm">回复率：{responseRate}</p>
          </div>
        </div>
        <Button variant="outline" onClick={onContact}>联系房东</Button>
      </div>
    </section>
  );
}

export type DateRange = { start?: string; end?: string };

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
const pad = (value: number) => String(value).padStart(2, "0");

export function DateRangeCalendar({
  year,
  month,
  value,
  onChange,
}: {
  year: number;
  month: number;
  value: DateRange;
  onChange: (value: DateRange) => void;
}) {
  const days = new Date(year, month, 0).getDate();
  const offset = new Date(year, month - 1, 1).getDay();
  const select = (date: string) => {
    if (!value.start || value.end || date < value.start) onChange({ start: date });
    else onChange({ start: value.start, end: date });
  };
  return (
    <section aria-label={`${year}年${month}月日期选择`} className="rounded-md border p-4">
      <h2 className="text-center text-title-md">{year}年 {month}月</h2>
      <div className="mt-4 grid grid-cols-7 text-center text-body-sm text-muted-foreground" aria-hidden="true">
        {weekdays.map((day) => <span key={day} className="py-2">{day}</span>)}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: offset }, (_, index) => <span key={`empty-${index}`} />)}
        {Array.from({ length: days }, (_, index) => {
          const day = index + 1;
          const date = `${year}-${pad(month)}-${pad(day)}`;
          const selected = date === value.start || date === value.end;
          const inRange = !!value.start && !!value.end && date > value.start && date < value.end;
          return (
            <span key={date} className={cn("flex justify-center", inRange && "bg-muted")}>
              <button
                type="button"
                aria-label={`${month}月${day}日`}
                aria-pressed={selected}
                onClick={() => select(date)}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full text-body-sm hover:border hover:border-foreground",
                  selected && "bg-foreground text-background",
                )}
              >
                {day}
              </button>
            </span>
          );
        })}
      </div>
      <p className="mt-4 text-center text-body-sm text-muted-foreground" aria-live="polite">
        {value.start ? `入住 ${value.start}` : "请选择入住日期"}{value.end ? ` · 退房 ${value.end}` : ""}
      </p>
    </section>
  );
}

export function GuestStepper({ value, min = 1, max = 16, onChange }: { value: number; min?: number; max?: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-body-md">旅客</span>
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="icon-sm" aria-label="减少旅客" disabled={value <= min} onClick={() => onChange(value - 1)}><Minus /></Button>
        <output className="min-w-6 text-center text-body-md tabular-nums" aria-live="polite">{value}</output>
        <Button type="button" variant="outline" size="icon-sm" aria-label="增加旅客" disabled={value >= max} onClick={() => onChange(value + 1)}><Plus /></Button>
      </div>
    </div>
  );
}

export type ReservationFee = { label: string; amount: string };

export function ReservationCard({
  price,
  dates,
  onDatesChange,
  guests,
  onGuestsChange,
  fees,
  total,
  onReserve,
}: {
  price: string;
  dates: Required<DateRange>;
  onDatesChange: (value: Required<DateRange>) => void;
  guests: number;
  onGuestsChange: (value: number) => void;
  fees: ReservationFee[];
  total: string;
  onReserve?: () => void;
}) {
  return (
    <aside aria-label="预订摘要" className="rounded-md border bg-background p-6 shadow-float">
      <p><strong className="text-display-md">{price}</strong><span className="text-body-sm text-muted-foreground"> / 晚</span></p>
      <fieldset className="mt-5 overflow-hidden rounded-sm border">
        <legend className="sr-only">选择日期与旅客人数</legend>
        <div className="grid grid-cols-2">
          <label className="border-r p-3 text-micro-label">入住<Input type="date" value={dates.start} onChange={(event) => onDatesChange({ ...dates, start: event.target.value })} className="mt-1 h-8 border-0 p-0 text-body-sm focus:shadow-none" /></label>
          <label className="p-3 text-micro-label">退房<Input type="date" value={dates.end} onChange={(event) => onDatesChange({ ...dates, end: event.target.value })} className="mt-1 h-8 border-0 p-0 text-body-sm focus:shadow-none" /></label>
        </div>
        <Separator />
        <div className="p-3"><GuestStepper value={guests} onChange={onGuestsChange} /></div>
      </fieldset>
      <Button className="mt-4 w-full" onClick={onReserve}>申请预订</Button>
      <p className="mt-3 text-center text-body-sm text-muted-foreground">点击后不会立即扣款</p>
      <dl className="mt-6 flex flex-col gap-3 text-body-sm">
        {fees.map((fee) => <div key={fee.label} className="flex justify-between gap-4"><dt className="underline underline-offset-2">{fee.label}</dt><dd>{fee.amount}</dd></div>)}
        <Separator />
        <div className="flex justify-between gap-4 text-title-md"><dt>合计</dt><dd>{total}</dd></div>
      </dl>
    </aside>
  );
}

export type GalleryImage = { src: string; alt: string };

export function ListingGallery({ images }: { images: GalleryImage[] }) {
  const shown = images.slice(0, 3);
  return (
    <div className="grid aspect-4/3 grid-cols-1 gap-2 overflow-hidden rounded-md md:aspect-video md:grid-cols-[2fr_1fr] md:grid-rows-2">
      {shown.map((image, index) => (
        <figure key={image.src} className={cn("min-h-0 overflow-hidden bg-muted", index === 0 ? "md:row-span-2" : "hidden md:block")}>
          <img src={image.src} alt={image.alt} width={index === 0 ? 960 : 480} height={index === 0 ? 720 : 360} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} className="size-full object-cover" />
        </figure>
      ))}
    </div>
  );
}

export function ListingDetailLayout({ children, reservation, mobileBar }: { children: ReactNode; reservation: ReactNode; mobileBar?: ReactNode }) {
  return (
    <div className="relative">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
        <div className="min-w-0">{children}</div>
        <div className="hidden lg:block"><div className="sticky top-24">{reservation}</div></div>
      </div>
      {mobileBar && <div className="lg:hidden">{mobileBar}</div>}
    </div>
  );
}

export function MobileReservationBar({ price, children }: { price: string; children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-20 -mx-6 flex items-center justify-between gap-4 border-t bg-background px-6 py-3 shadow-float">
      <p><strong className="text-title-md">{price}</strong><span className="text-body-sm text-muted-foreground"> / 晚</span></p>
      {children}
    </div>
  );
}
