"use client";

import { useId, useState } from "react";
import { Search } from "lucide-react";
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
      : "w-full min-w-0 rounded-xs bg-background py-1 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-foreground";
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
            : "flex h-16 items-center rounded-full border bg-background px-2 shadow-float"
        }
      >
        <FieldGroup className={mobile ? "" : "flex-row items-center gap-0"}>
          <Field className={mobile ? "" : "min-w-0 flex-[1.4] gap-0 px-5"}>
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
          <Field className={mobile ? "" : "min-w-0 flex-1 gap-0 border-l px-5"}>
            <FieldLabel htmlFor={`${prefix}-date`}>入住日期</FieldLabel>
            <input
              id={`${prefix}-date`}
              type="date"
              value={values.date}
              onChange={(e) => setValues({ ...values, date: e.target.value })}
              className={fieldClass}
            />
          </Field>
          <Field className={mobile ? "" : "min-w-0 flex-1 gap-0 border-l px-5"}>
            <FieldLabel htmlFor={`${prefix}-guests`}>同行人数</FieldLabel>
            <select
              id={`${prefix}-guests`}
              value={values.guests}
              onChange={(e) =>
                setValues({ ...values, guests: Number(e.target.value) })
              }
              className={fieldClass}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option value={n} key={n}>
                  {n} 位旅客
                </option>
              ))}
            </select>
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
    <>
      <div className="hidden md:block">{fields(false)}</div>
      <div className="md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex h-16 w-full items-center gap-4 rounded-full border bg-background px-6 text-left text-sm text-foreground shadow-float">
            <Search className="size-5" />
            <span className="flex flex-col">
              <span className="font-semibold">
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
    </>
  );
}
