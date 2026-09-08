"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  Heart,
  Search,
  Users,
} from "lucide-react";
import {
  SearchBar,
  type SearchValues,
} from "@/components/design-system/search-bar";
import { StayCard, type Stay } from "@/components/design-system/stay-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stays: Stay[] = [
  {
    id: "courtyard",
    title: "竹影里的庭院小屋",
    location: "杭州 · 中国",
    description: "静谧庭院",
    price: 680,
    rating: "4.98",
    image: "/images/courtyard.webp",
    imageAlt: "木质茶室朝向绿意盎然的庭院，日光洒在地板上",
    capacity: 2,
  },
  {
    id: "coast",
    title: "把海风留在窗边",
    location: "大理 · 中国",
    description: "湖畔小住",
    price: 820,
    rating: "4.96",
    image: "/images/coast.webp",
    imageAlt: "白色卧室的拱形窗外是一片蓝色水面",
    capacity: 4,
  },
  {
    id: "cabin",
    title: "住进山野的清晨",
    location: "莫干山 · 中国",
    description: "林间木屋",
    price: 960,
    rating: "4.99",
    image: "/images/cabin.webp",
    imageAlt: "松林和蕨类植物环绕着带玻璃窗的木屋",
    capacity: 6,
  },
];

export function MarketplacePreview() {
  const [saved, setSaved] = useState<string[]>([]);
  const [query, setQuery] = useState<SearchValues | null>(null);
  const [selected, setSelected] = useState<Stay | null>(null);
  const [requested, setRequested] = useState(false);
  const shown = stays.filter(
    (stay) =>
      !query ||
      ((!query.destination ||
        `${stay.title}${stay.location}${stay.description}`.includes(
          query.destination,
        )) &&
        stay.capacity >= query.guests),
  );
  return (
    <section id="preview" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">先感受，再构建</h2>
          <p className="section-copy">
            同一套 tokens，让搜索、图片与交互自然相遇。
          </p>
        </div>
        <span className="text-sm text-muted-foreground">可交互的场景示例</span>
      </div>
      <Tabs
        defaultValue="preview"
        className="gap-0 overflow-hidden rounded-lg border"
      >
        <div className="flex items-center justify-between border-b bg-muted/60 px-6 md:px-8">
          <TabsList variant="line" aria-label="场景展示方式">
            <TabsTrigger value="preview">
              <Eye data-icon="inline-start" />
              预览
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code2 data-icon="inline-start" />
              代码
            </TabsTrigger>
          </TabsList>
          <span className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <span className="size-1.5 rounded-full bg-primary" />
            响应式
          </span>
        </div>
        <TabsContent value="preview" keepMounted>
          <div className="px-6 py-8 md:p-8">
            <div className="flex flex-col gap-8">
              <div className="mx-auto w-full max-w-3xl">
                <SearchBar onSearch={setQuery} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">给周末，留一点空白</h3>
                  <p className="text-sm text-muted-foreground">
                    离日常近一点，离忙碌远一点。
                  </p>
                </div>
                <span
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  aria-live="polite"
                >
                  <Heart className="size-4" />
                  {saved.length}{" "}
                  <span className="hidden md:inline">个收藏</span>
                </span>
              </div>
              {query && (
                <div
                  role="status"
                  className="flex flex-wrap items-center justify-between gap-2 text-sm"
                >
                  <span>
                    找到 {shown.length} 个示例 ·{" "}
                    {query.destination || "全部目的地"} · {query.guests} 人
                    {query.date ? ` · ${query.date}` : ""}（不校验真实房态）
                  </span>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setQuery(null)}
                  >
                    清除筛选
                  </Button>
                </div>
              )}
              {shown.length > 0 && <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {shown.map((stay, index) => (
                  <StayCard
                    key={stay.id}
                    stay={stay}
                    priority={index === 0}
                    saved={saved.includes(stay.id)}
                    onSavedChange={(value) =>
                      setSaved((previous) =>
                        value
                          ? [...previous, stay.id]
                          : previous.filter((id) => id !== stay.id),
                      )
                    }
                    onSelect={() => {
                      setSelected(stay);
                      setRequested(false);
                    }}
                  />
                ))}
              </div>}
              {!shown.length && (
                <div className="flex flex-col items-center gap-3 rounded-md bg-muted py-12 text-center text-foreground">
                  <Search className="size-6" />
                  <p>暂无匹配示例，试试“杭州”或减少人数。</p>
                  <Button variant="outline" onClick={() => setQuery(null)}>
                    查看全部
                  </Button>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                演示数据与 AI 生成图片，仅用于组件验收；收藏仅在当前页面有效。
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <pre className="source-code m-6 md:m-8">{`import { SearchBar } from "@/components/design-system/search-bar"\nimport { StayCard } from "@/components/design-system/stay-card"\n\n<SearchBar onSearch={setQuery} />\n<StayCard\n  stay={stay}\n  saved={saved}\n  onSavedChange={setSaved}\n  onSelect={() => setSelected(stay)}\n/>`}</pre>
          <p className="px-6 pb-8 text-sm text-muted-foreground md:px-8">
            搜索与收藏均为受控回调；接入业务时由调用方提供数据和持久化。
          </p>
        </TabsContent>
      </Tabs>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.location} · 场景交互示例，不提供真实预订。
                </DialogDescription>
              </DialogHeader>
              <img
                src={selected.image}
                alt={selected.imageAlt}
                width={640}
                height={640}
                className="aspect-video w-full rounded-md object-cover"
              />
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4" />
                最多 {selected.capacity} 位旅客
              </p>
              <div className="flex items-center justify-between gap-4">
                <p>
                  <strong>¥{selected.price}</strong>
                  <span className="text-muted-foreground"> / 晚</span>
                </p>
                <Button onClick={() => setRequested(true)} disabled={requested}>
                  {requested ? <Check /> : <ArrowRight />}
                  {requested ? "已体验" : "体验预订反馈"}
                </Button>
              </div>
              <p role="status" className="text-sm text-muted-foreground">
                {requested
                  ? "反馈状态已更新。此操作没有创建订单或发起扣款。"
                  : "点击按钮可检查即时反馈与禁用状态。"}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
