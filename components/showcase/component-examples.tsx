"use client";

import { useState } from "react";
import { Check, Heart, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation } from "@/components/design-system/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ComponentExamples() {
  const [feedback, setFeedback] = useState("点击任意按钮，检查反馈与状态。");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [nav, setNav] = useState("#navigation-stays");
  const [filterOpen, setFilterOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const [collected, setCollected] = useState(false);
  return (
    <>
      <section id="buttons" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">按钮</h2>
          <p className="section-copy">
            48px 主要操作，8px 圆角。强调只留给真正重要的下一步。
          </p>
        </div>
        <div className="spec-panel p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex flex-col gap-3">
                <span className="text-sm text-muted-foreground">主要</span>
                <Button onClick={() => setFeedback("主要按钮已点击。")}>
                  继续探索
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-muted-foreground">次要</span>
                <Button
                  variant="outline"
                  onClick={() => setFeedback("次要按钮已点击。")}
                >
                  查看详情
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-muted-foreground">文字</span>
                <Button
                  variant="link"
                  onClick={() => setFeedback("文字按钮已点击。")}
                >
                  了解更多
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-muted-foreground">胶囊</span>
                <Button
                  shape="pill"
                  onClick={() => setFeedback("胶囊按钮已点击。")}
                >
                  开始小住
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-muted-foreground">禁用</span>
                <Button disabled>暂不可用</Button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-muted-foreground">图标</span>
                <Button
                  variant="brand-icon"
                  size="icon"
                  aria-label="测试搜索图标按钮"
                  onClick={() => setFeedback("搜索图标按钮已点击。")}
                >
                  <Search />
                </Button>
              </div>
            </div>
            <p role="status" className="section-copy">
              {feedback}
            </p>
            <pre className="source-code">
              {
                '<Button>继续探索</Button>\n<Button variant="outline">查看详情</Button>\n<Button shape="pill">开始小住</Button>'
              }
            </pre>
          </div>
        </div>
      </section>
      <section id="inputs" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">表单输入</h2>
          <p className="section-copy">
            56px 输入框，聚焦时使用 2px 深色内边框，不添加发光效果。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="spec-panel p-6">
            <form
              noValidate
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  (e.nativeEvent.isComposing || e.keyCode === 229)
                )
                  e.preventDefault();
              }}
              onSubmit={(e) => {
                e.preventDefault();
                const control = e.currentTarget.elements.namedItem(
                  "email",
                ) as HTMLInputElement;
                const valid = control.validity.valid;
                setError(
                  valid ? "" : "请输入完整的邮箱地址，例如 hello@example.com。",
                );
                setSubmitted(valid);
                if (!valid) control.focus();
              }}
            >
              <FieldGroup>
                <Field data-invalid={!!error}>
                  <FieldLabel htmlFor="demo-email">电子邮箱</FieldLabel>
                  <Input
                    id="demo-email"
                    name="email"
                    type="email"
                    placeholder="hello@example.com"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSubmitted(false);
                      setError("");
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : "email-help"}
                  />
                  <FieldDescription id="email-help">
                    试试输入不完整的地址，然后提交。
                  </FieldDescription>
                  {error && <FieldError id="email-error">{error}</FieldError>}
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="demo-notifications">
                    接收行程提醒
                  </FieldLabel>
                  <Switch
                    id="demo-notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </Field>
                <Button type="submit">
                  {submitted ? <Check /> : null}
                  {submitted ? "校验通过" : "检查表单"}
                </Button>
                <p role="status" className="section-copy">
                  {submitted
                    ? "表单已通过前端校验，未提交或保存任何个人信息。"
                    : "交互示例，不发送邮件。"}
                </p>
              </FieldGroup>
            </form>
          </div>
          <div className="spec-panel p-6">
            <FieldGroup>
              <Field data-disabled>
                <FieldLabel htmlFor="disabled-field">禁用状态</FieldLabel>
                <Input id="disabled-field" value="当前不可编辑" disabled />
                <FieldDescription>
                  保留清晰的文字，不允许交互。
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="sample-name">常规输入</FieldLabel>
                <Input
                  id="sample-name"
                  placeholder="怎么称呼你？"
                  autoComplete="off"
                />
                <FieldDescription>
                  点击输入框，检查深色聚焦边框。
                </FieldDescription>
              </Field>
              <div className="rounded-sm bg-muted p-4">
                <p className="section-copy">
                  错误态是工程补全，并非来源文件中完整提取的样式。错误色取自原规范。
                </p>
              </div>
            </FieldGroup>
          </div>
        </div>
      </section>
      <section id="cards" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">卡片</h2>
          <p className="section-copy">
            图片卡不套第二层外壳；信息卡用细边线区分，内部留白 24px。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>收藏一个慢下来的周末</CardTitle>
              <CardDescription>基础信息卡 · 默认平面</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-base leading-relaxed">
                标题、内容与操作各有自己的位置。边框保持轻量，正文回归自然的阅读节奏。
              </p>
            </CardContent>
            <CardFooter className="min-h-26">
              <Button
                variant="outline"
                onClick={() => setCollected(!collected)}
                aria-pressed={collected}
              >
                <Heart data-icon="inline-start" />
                {collected ? "已收藏（演示）" : "收藏这个灵感"}
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>把细节留给内容</CardTitle>
              <CardDescription>预订摘要 · 组合方式示例</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <dl className="flex flex-col gap-4 text-base">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">住宿费用</dt>
                  <dd>¥680 × 2 晚</dd>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <dt className="font-semibold">合计</dt>
                  <dd className="font-semibold">¥1,360</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter className="min-h-26">
              <p className="section-copy">演示金额，不提供真实预订或支付。</p>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section id="navigation" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">导航</h2>
          <p className="section-copy">
            80px 导航栏，当前项目用深色下划线标记；744px 以下收起为菜单。
          </p>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Navigation
            title="周末小住"
            activeHref={nav}
            onNavigate={setNav}
            items={[
              { label: "住宿", href: "#navigation-stays" },
              { label: "体验", href: "#navigation-experiences" },
              { label: "服务", href: "#navigation-services" },
            ]}
            actions={
              <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                <DialogTrigger
                  render={
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      aria-label="打开筛选示例"
                    />
                  }
                >
                  <SlidersHorizontal />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>筛选示例</DialogTitle>
                    <DialogDescription>
                      检查浮层、开关和关闭后的焦点回归。
                    </DialogDescription>
                  </DialogHeader>
                  <Field orientation="horizontal">
                    <FieldLabel htmlFor="instant">只看即时确认</FieldLabel>
                    <Switch
                      id="instant"
                      checked={instant}
                      onCheckedChange={setInstant}
                    />
                  </Field>
                  <Button onClick={() => setFilterOpen(false)}>
                    应用示例筛选
                  </Button>
                </DialogContent>
              </Dialog>
            }
          />
          <div className="p-6">
            <div className="flex flex-col gap-3">
              {[
                {
                  id: "stays",
                  label: "住宿",
                  description: "图片优先的住宿卡片网格。",
                },
                {
                  id: "experiences",
                  label: "体验",
                  description: "适合呈现活动与在地体验。",
                },
                {
                  id: "services",
                  label: "服务",
                  description: "适合呈现行程相关服务。",
                },
              ].map((item) => (
                <a
                  key={item.id}
                  id={`navigation-${item.id}`}
                  href="#navigation"
                  onClick={() => setNav(`#navigation-${item.id}`)}
                  className="flex min-h-11 scroll-mt-28 items-center justify-between gap-3 rounded-sm px-3 text-sm hover:bg-muted"
                >
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.description}
                  </span>
                </a>
              ))}
              <p className="section-copy">
                {instant
                  ? "当前筛选：即时确认（演示）。"
                  : "当前筛选：全部（演示）。"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
