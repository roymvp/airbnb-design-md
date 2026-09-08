"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Blocks,
  BookOpen,
  Box,
  Circle,
  Code2,
  Component,
  LayoutTemplate,
  Menu,
  MousePointer2,
  Palette,
  PanelTop,
  TextCursorInput,
  Type,
  X,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const groups = [
  {
    title: "开始",
    items: [
      { id: "overview", label: "设计总览", icon: LayoutTemplate },
      { id: "preview", label: "场景预览", icon: PanelTop },
    ],
  },
  {
    title: "基础规范",
    items: [
      { id: "colors", label: "色彩", icon: Palette },
      { id: "typography", label: "字体排印", icon: Type },
      { id: "geometry", label: "间距与形态", icon: Circle },
    ],
  },
  {
    title: "组件",
    items: [
      { id: "buttons", label: "按钮", icon: MousePointer2 },
      { id: "inputs", label: "表单输入", icon: TextCursorInput },
      { id: "cards", label: "卡片", icon: Component },
      { id: "navigation", label: "导航", icon: PanelTop },
    ],
  },
  {
    title: "交付",
    items: [
      { id: "usage", label: "安装与使用", icon: Code2 },
      { id: "notes", label: "来源与适配", icon: BookOpen },
    ],
  },
];

import { sourceUrl } from "@/lib/design-system";

export function ShowcaseShell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const navigation = (
    <nav aria-label="设计系统目录" className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <p className="px-3 pb-2 text-sm text-muted-foreground">
            {group.title}
          </p>
          {group.items.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link"
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                setActive(id);
                setOpen(false);
              }}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
              {id === "overview" && (
                <span className="ml-auto size-1.5 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-background focus:p-4 focus:text-foreground"
      >
        跳到主要内容
      </a>
      <header className="sticky top-0 z-30 border-b bg-background text-foreground">
        <div className="mx-auto flex h-20 max-w-[1536px] items-center justify-between px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-3 whitespace-nowrap">
            <Blocks className="size-7 text-primary" strokeWidth={1.8} />
            <span className="text-base font-semibold">设计工作室</span>
            <span className="hidden text-border md:block">/</span>
            <span className="hidden text-sm text-muted-foreground md:block">
              airbnb 风格
            </span>
            <Badge variant="secondary">v0.1</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground lg:block">
              Next.js · Tailwind CSS · shadcn/ui
            </span>
            <a
              href="#usage"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden md:inline-flex",
              )}
            >
              <Box data-icon="inline-start" />
              使用设计系统
            </a>
            <div className="lg:hidden">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="打开目录"
                    />
                  }
                >
                  <Menu />
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>设计系统目录</DialogTitle>
                  </DialogHeader>
                  {navigation}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1536px]">
        <aside className="sticky top-20 hidden h-[calc(100dvh-80px)] w-60 shrink-0 flex-col justify-between overflow-y-auto border-r px-5 py-8 lg:flex">
          {navigation}
          <div className="flex flex-col gap-2 px-3 pt-8">
            <p className="flex items-center gap-2 text-sm font-medium">
              <span className="size-2 rounded-full bg-primary" />
              验收草稿
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              确认后保存为可复用 skill。
            </p>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              查看原始规范
              <ArrowUpRight className="size-4" />
              <span className="sr-only">（新窗口）</span>
            </a>
          </div>
        </aside>
        <main id="main" className="min-w-0 flex-1 px-6 py-10 md:px-10 lg:px-12">
          {children}
        </main>
      </div>
    </>
  );
}
