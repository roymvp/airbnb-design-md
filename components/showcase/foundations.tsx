import { ArrowDownToLine } from "lucide-react";

const colors = [
  {
    name: "Rausch",
    token: "--primary",
    value: "#FF385C",
    color: "bg-primary",
    purpose: "品牌强调",
  },
  {
    name: "Ink",
    token: "--foreground",
    value: "#222222",
    color: "bg-foreground",
    purpose: "主要文字",
  },
  {
    name: "Muted",
    token: "--muted-foreground",
    value: "#6A6A6A",
    color: "bg-muted-foreground",
    purpose: "辅助文字",
  },
  {
    name: "Soft",
    token: "--muted",
    value: "#F7F7F7",
    color: "bg-muted",
    purpose: "轻量背景",
  },
  {
    name: "Canvas",
    token: "--background",
    value: "#FFFFFF",
    color: "bg-background",
    purpose: "页面底色",
  },
];

export function Foundations() {
  return (
    <>
      <section id="colors" className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="section-heading">色彩，少一点刚刚好</h2>
            <p className="section-copy">
              一抹玫红，其余交给白色与中性灰。让内容始终是主角。
            </p>
          </div>
          <a
            href="/design-tokens.json"
            download
            className="flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            <ArrowDownToLine className="size-4" />
            下载 tokens
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {colors.map((color) => (
            <div
              key={color.token}
              className="overflow-hidden rounded-md border"
            >
              <div
                className={`h-24 border-b ${color.color}`}
                aria-hidden="true"
              />
              <div className="p-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">{color.name}</h3>
                  <p className="text-sm text-muted-foreground">{color.value}</p>
                  <p className="pt-2 text-sm text-muted-foreground">
                    {color.purpose}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-primary-active" />
            交互 / AA 按钮 #E00B41
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-primary-disabled" />
            禁用 #FFD1DA
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-destructive" />
            错误 #C13515
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-border" />
            边线 #DDDDDD
          </span>
        </div>
      </section>
      <section id="typography" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">字体排印</h2>
          <p className="section-copy">
            不过分放大的标题，自然、清晰的正文。一套无衬线贯穿始终。
          </p>
        </div>
        <div className="spec-panel grid md:grid-cols-2">
          <div className="border-b p-8 md:border-b-0 md:border-r">
            <div className="flex flex-col gap-6">
              <span className="text-sm text-muted-foreground">
                字体替代方案
              </span>
              <div className="text-rating">
                Aa<span className="pl-4 text-display font-medium">你好</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Inter + 中文系统字体</h3>
                <p className="section-copy">
                  拉丁字符使用
                  Inter；中文优先苹方、微软雅黑，无中文字库时按字形分片加载 Noto
                  Sans SC。
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Regular 400 · Medium 500 · Semibold 600 · Bold 700
              </p>
            </div>
          </div>
          <div className="flex flex-col divide-y px-6">
            {[
              {
                label: "Display",
                text: "每一次出发，都值得期待",
                size: "28 / 700",
                className: "text-display",
              },
              {
                label: "Heading",
                text: "寻找让你放松的小住",
                size: "22 / 500",
                className: "text-heading",
              },
              {
                label: "Title",
                text: "在山野之间，慢下来",
                size: "16 / 600",
                className: "text-base font-semibold",
              },
              {
                label: "Body",
                text: "让好的体验，从清晰的阅读开始。",
                size: "16 / 400",
                className: "text-base",
              },
              {
                label: "Caption",
                text: "辅助信息，也应该轻松可读。",
                size: "14 / 400",
                className: "text-sm text-muted-foreground",
              },
            ].map((row) => (
              <div key={row.label} className="py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{row.label}</span>
                    <span>{row.size}</span>
                  </div>
                  <p className={row.className}>{row.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="section-copy">
          未包含 Airbnb Cereal VF 或 Circular 专有字体；小于 14px
          的原始微文案在本实现中提升至 14px。
        </p>
      </section>
      <section id="geometry" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">间距与形态</h2>
          <p className="section-copy">
            4px 基础步长，64px 区块留白。柔和的边缘，不堆叠的阴影。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="spec-panel p-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-base font-semibold">圆角尺度</h3>
              <div className="flex items-end justify-between gap-3">
                {[
                  { label: "8", cls: "rounded-sm" },
                  { label: "14", cls: "rounded-md" },
                  { label: "20", cls: "rounded-lg" },
                  { label: "32", cls: "rounded-xl" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className={`size-14 border-2 border-foreground/20 bg-muted ${item.cls}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.label}px
                    </span>
                  </div>
                ))}
              </div>
              <p className="section-copy">
                按钮 8px · 图片 14px · 大容器 20px · 胶囊 9999px
              </p>
            </div>
          </div>
          <div className="spec-panel p-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-base font-semibold">间距尺度</h3>
              <div className="flex h-[82px] items-end justify-between gap-2">
                {[4, 8, 12, 16, 24, 32, 48, 64].map((space) => (
                  <div key={space} className="flex flex-col items-center gap-3">
                    <div
                      style={{ height: space }}
                      className="w-4 rounded-xs bg-primary/25"
                    />
                    <span className="text-sm text-muted-foreground">
                      {space}
                    </span>
                  </div>
                ))}
              </div>
              <p className="section-copy">
                微间距 2px · 卡片间距 16px · 区块间距 64px
              </p>
            </div>
          </div>
        </div>
        <div className="spec-panel flex flex-wrap items-center justify-between gap-6 p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold">只有一层浮起</h3>
            <p className="section-copy">
              默认平面。搜索框、浮层和悬停卡片共用 shadow-float。
            </p>
          </div>
          <div className="rounded-md bg-background px-8 py-5 text-sm text-foreground shadow-float">
            轻盈，而不是悬浮
          </div>
        </div>
      </section>
    </>
  );
}
