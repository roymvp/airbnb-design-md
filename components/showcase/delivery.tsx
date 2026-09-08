"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Copy,
  Package,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { sourceUrl } from "@/lib/design-system";

const install = "pnpm dlx shadcn@latest add ./airbnb-style.json";

export function Delivery() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  return (
    <>
      <section id="usage" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">把这套设计，带到下一个项目</h2>
          <p className="section-copy">
            源码属于你。通过 shadcn CLI 安装组件，或将完整 starter 接入 GitHub
            后复用。
          </p>
        </div>
        <div className="spec-panel p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-md bg-muted text-foreground">
                  <Package className="size-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">airbnb-style</h3>
                  <p className="text-sm text-muted-foreground">
                    v0.1.0 · shadcn 源码安装包 · 非官方
                  </p>
                </div>
              </div>
              <a
                href="/r/airbnb-style.json"
                download="airbnb-style.json"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <ArrowDownToLine data-icon="inline-start" />
                下载组件包
              </a>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-sm bg-muted p-4 text-foreground">
              <code className="min-w-0 overflow-x-auto text-sm">{install}</code>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="复制安装命令"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(install);
                    setCopied(true);
                    setCopyError(false);
                  } catch {
                    setCopyError(true);
                  }
                }}
              >
                {copied ? <Check /> : <Copy />}
              </Button>
            </div>
            <p role="status" className="text-sm text-muted-foreground">
              {copyError
                ? "浏览器不允许访问剪贴板，请选中上方命令复制。"
                : copied
                  ? "安装命令已复制。"
                  : "下载 JSON 后，在自己的本地项目目录中安装；v0 预览里无需执行命令。"}
            </p>
            <div className="grid gap-6 border-t pt-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold">安装前提</h4>
                <p className="section-copy">
                  Next.js 根目录 app/ + Tailwind CSS v4 + shadcn Base
                  UI（不支持直接装入
                  src/app/）。会替换全局样式，请在空项目或已备份分支中应用。安装后按下方示例接入字体。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold">配套 starter</h4>
                <p className="section-copy">
                  当前项目即完整
                  starter，包含字体配置、展示页、图片、安装包构建脚本与 pnpm
                  锁文件。
                </p>
                <a
                  href="/downloads/airbnb-style-starter.tar.gz"
                  download
                  className="flex items-center gap-2 text-sm font-medium underline underline-offset-4"
                >
                  下载完整 starter
                  <ArrowDownToLine className="size-4" />
                </a>
              </div>
            </div>
            <pre className="source-code">
              {
                '// app/layout.tsx 字体接入\nimport { designFontVariables } from "@/lib/design-fonts"\n\n<html lang="zh-CN" className={`bg-background ${designFontVariables}`}>\n  <body className="font-sans">{children}</body>\n</html>'
              }
            </pre>
            <pre className="source-code">
              {
                'import { Button } from "@/components/ui/button"\nimport { Input } from "@/components/ui/input"\nimport { Card } from "@/components/ui/card"\nimport { Navigation } from "@/components/design-system/navigation"\nimport { SearchBar } from "@/components/design-system/search-bar"\nimport { StayCard } from "@/components/design-system/stay-card"'
              }
            </pre>
          </div>
        </div>
      </section>
      <section id="notes" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">来源与适配，保持透明</h2>
          <p className="section-copy">
            只依据 Airbnb 这一份 DESIGN.md；未混入其他品牌或既有仪表盘设计。
          </p>
        </div>
        <div className="spec-panel divide-y">
          {[
            [
              "来源边界",
              "来源为 VoltAgent 仓库中的第三方设计分析，不是 Airbnb 官方组件库。本项目仅借鉴视觉规范，不使用其品牌 logo、专有字体或营销文案。",
            ],
            [
              "原样保留",
              "白色画布、Rausch 强调色、深灰文字、8/14/20/32px 圆角、64px 搜索胶囊、48px 主按钮、56px 输入框与单层阴影。",
            ],
            [
              "字体替代",
              "拉丁字母使用 next/font 自托管的 Inter；中文优先本机苹方、微软雅黑，无中文字库时回落到自托管、按字形分片加载的 Noto Sans SC。原文件中的 8–13px 微文案提升至 14px。",
            ],
            [
              "无障碍适配",
              "原始 #FF385C 配白色小字号文字约为 3.5:1，不满足 AA。文字主按钮改用原规范的 active 色 #E00B41；图标按钮保留 Rausch。收藏触控区扩大至 44px。",
            ],
            [
              "工程补全",
              "键盘焦点、表单校验、移动菜单、受控收藏和操作反馈由本实现补全；不声称这些状态来自原站提取。导航使用 Lucide 线性图标，不仿造品牌插画。",
            ],
            [
              "暂未覆盖",
              "地图、复杂日期范围选择、骨架屏、Luxe / Plus 子品牌及暗色模式不在本次最小系统范围内。演示没有真实房源、账号、支付或数据持久化。",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="grid gap-2 p-5 md:grid-cols-[120px_1fr]"
            >
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="section-copy">{text}</p>
            </div>
          ))}
        </div>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          查看唯一来源 DESIGN.md
          <ArrowUpRight className="size-4" />
          <span className="sr-only">（新窗口）</span>
        </a>
        <div className="rounded-md bg-muted p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold">下一步，由你验收</h3>
            <p className="section-copy">
              检查整体观感、按钮与输入状态、手机端布局。如果满意，请在聊天里确认；当前尚未注册或保存为可复用
              skill。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
