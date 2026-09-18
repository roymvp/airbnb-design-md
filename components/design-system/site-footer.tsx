import { Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type CityLink = { name: string; category: string; href: string };

export function CityLinkGrid({
  title,
  items,
}: {
  title: string;
  items: CityLink[];
}) {
  return (
    <section aria-labelledby="city-links-heading">
      <h2 id="city-links-heading" className="text-display-xl text-balance">{title}</h2>
      <ul className="mt-8 grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <li key={`${item.name}-${item.category}`}>
            <a href={item.href} className="group flex min-h-11 flex-col justify-center gap-1">
              <span className="text-title-md group-hover:underline">{item.name}</span>
              <span className="text-body-sm text-muted-foreground">{item.category}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SiteFooter({
  columns,
  copyright,
  locale = "简体中文",
  currency = "CNY",
  legalLinks = [],
  className,
}: {
  columns: FooterColumn[];
  copyright: string;
  locale?: string;
  currency?: string;
  legalLinks?: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <footer className={cn("bg-background text-foreground", className)}>
      <div className="grid gap-8 py-12 md:grid-cols-3 md:py-16">
        {columns.map((column) => (
          <section key={column.title} aria-labelledby={`footer-${column.title}`} className="flex flex-col gap-4">
            <h2 id={`footer-${column.title}`} className="text-title-sm">{column.title}</h2>
            <ul className="flex flex-col gap-3 text-body-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="underline-offset-4 hover:underline">{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <Separator />
      <div className="flex flex-col gap-4 py-6 text-caption-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>{copyright}</span>
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href} className="underline-offset-4 hover:underline">{link.label}</a>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <a href="#language" className="flex min-h-11 items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline">
            <Globe className="size-4" aria-hidden="true" />
            {locale}
          </a>
          <a href="#currency" className="flex min-h-11 items-center font-medium text-foreground underline-offset-4 hover:underline">
            ¥ {currency}
          </a>
        </div>
      </div>
    </footer>
  );
}
