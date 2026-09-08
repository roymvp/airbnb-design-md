import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { ShowcaseShell } from "@/components/showcase/shell";
import { sourceUrl } from "@/lib/design-system";
import { MarketplacePreview } from "@/components/showcase/marketplace-preview";
import { Foundations } from "@/components/showcase/foundations";
import { ComponentExamples } from "@/components/showcase/component-examples";
import { Delivery } from "@/components/showcase/delivery";
import { buttonVariants } from "@/components/ui/button-variants";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <ShowcaseShell>
      <div className="flex flex-col gap-section">
        {/* v0 Design System Showcase Page */}
        <section id="overview" className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>设计系统</span>
            <span>/</span>
            <span className="text-foreground">总览</span>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-display text-balance">airbnb 风格</h1>
                <Badge variant="outline">验收草稿</Badge>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                轻盈的白色界面，友好的圆角，以及恰到好处的玫红。
              </p>
              <p className="text-sm text-muted-foreground">
                从单一设计规范，到可以直接使用的组件与 starter。
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "link", size: "sm" })}
              >
                原始规范
                <ArrowUpRight data-icon="inline-end" />
                <span className="sr-only">（新窗口）</span>
              </a>
              <a href="#usage" className={buttonVariants({ size: "sm" })}>
                使用这套设计
                <ArrowDown data-icon="inline-end" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-x-6 gap-y-3 border-b pb-7 text-sm text-muted-foreground md:flex md:flex-wrap">
            {["单一来源", "语义化 tokens", "可复用组件", "中文字体适配"].map(
              (item) => (
                <span className="flex items-center gap-2" key={item}>
                  <Check className="size-4" aria-hidden="true" />
                  {item}
                </span>
              ),
            )}
          </div>
        </section>
        <MarketplacePreview />
        <Foundations />
        <ComponentExamples />
        <Delivery />
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t py-6 text-sm text-muted-foreground">
          <span>airbnb 风格 · v0.1.0</span>
          <span>独立设计系统实验 · 非 Airbnb 官方产品</span>
          <a href="#overview" className="underline-offset-4 hover:underline">
            回到顶部 ↑
          </a>
        </footer>
      </div>
    </ShowcaseShell>
  );
}
