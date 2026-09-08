"use client";

import { useId, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type SearchValues = {
  destination: string;
  date: string;
  guests: number;
};

export function SearchBar({
  onSearch,
}: {
  onSearch: (values: SearchValues) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<SearchValues>({
    destination: "",
    date: "",
    guests: 2,
  });
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({ ...values, destination: values.destination.trim() });
    setOpen(false);
  }
  function fields(mobile: boolean) {
    const prefix = `${id}-${mobile ? "mobile" : "desktop"}`;
    const fieldClass = mobile
      ? "h-14 w-full min-w-0 rounded-sm border border-input bg-background px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground focus:shadow-[inset_0_0_0_1px_var(--foreground)]"
      : "search-control";
    const groupClass = mobile
      ? ""
      : "search-field relative h-16 min-w-0 flex-1 justify-center gap-1 rounded-full px-5";
    return (
      <form
        onSubmit={submit}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            (event.nativeEvent.isComposing || event.keyCode === 229)
          )
            event.preventDefault();
        }}
        className={
          mobile
            ? "flex flex-col gap-6"
            : "search-bar flex items-center gap-2 rounded-full border bg-background p-2 shadow-float"
        }
      >
        <FieldGroup className={mobile ? "" : "min-w-0 flex-1 flex-row items-center gap-0"}>
          <Field className={mobile ? "" : `${groupClass} flex-[1.4]`}>
            <FieldLabel htmlFor={`${prefix}-where`}>目的地</FieldLabel>
            <input
              id={`${prefix}-where`}
              maxLength={80}
              value={values.destination}
              onChange={(e) =>
                setValues({ ...values, destination: e.target.value })
              }
              placeholder="想去哪里？"
              className={fieldClass}
            />
          </Field>
          <Field className={groupClass}>
            <FieldLabel htmlFor={`${prefix}-date`}>入住日期</FieldLabel>
            <input
              id={`${prefix}-date`}
              type="date"
              value={values.date}
              onChange={(e) => setValues({ ...values, date: e.target.value })}
              className={fieldClass}
            />
          </Field>
          <Field className={groupClass}>
            <FieldLabel htmlFor={`${prefix}-guests`}>同行人数</FieldLabel>
            <div className="relative">
              <select
                id={`${prefix}-guests`}
                value={values.guests}
                onChange={(e) =>
                  setValues({ ...values, guests: Number(e.target.value) })
                }
                className={`${fieldClass} appearance-none pr-6`}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option value={n} key={n}>
                    {n} 位旅客
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2"
                style={{ insetInlineEnd: mobile ? 12 : 0 }}
              />
            </div>
          </Field>
        </FieldGroup>
        <Button
          type="submit"
          variant={mobile ? "default" : "brand-icon"}
          size={mobile ? "default" : "icon"}
          aria-label="搜索示例住宿"
        >
          <Search />
          {mobile && "搜索示例住宿"}
        </Button>
      </form>
    );
  }
  return (
    <div className="@container/search w-full min-w-0">
      <div className="hidden @min-[640px]/search:block">{fields(false)}</div>
      <div className="@min-[640px]/search:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex h-16 w-full items-center gap-4 rounded-full border bg-background px-6 text-left text-sm text-foreground shadow-float">
            <Search className="size-5 shrink-0" />
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="truncate font-semibold">
                {values.destination || "寻找一处喜欢的小住"}
              </span>
              <span className="text-muted-foreground">
                选择目的地、日期与人数
              </span>
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>安排一次小住</DialogTitle>
            </DialogHeader>
            {fields(true)}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
