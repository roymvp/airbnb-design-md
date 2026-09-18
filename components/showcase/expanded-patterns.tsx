"use client";

import { useState } from "react";
import {
  BedDouble,
  Bike,
  Car,
  Check,
  Coffee,
  CookingPot,
  Dumbbell,
  Flower2,
  Footprints,
  Mountain,
  Sailboat,
  Sparkles,
  Trees,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import { CategoryStrip } from "@/components/design-system/category-strip";
import { ExperienceCard, type Experience } from "@/components/design-system/experience-card";
import {
  AmenityList,
  DateRangeCalendar,
  HostCard,
  ListingDetailLayout,
  ListingGallery,
  MobileReservationBar,
  RatingDisplay,
  ReservationCard,
  ReviewsGrid,
  type DateRange,
} from "@/components/design-system/listing-detail";
import { CityLinkGrid, SiteFooter } from "@/components/design-system/site-footer";
import { Button } from "@/components/ui/button";

const categories = [
  { value: "lake", label: "湖畔", icon: Waves },
  { value: "cabin", label: "小木屋", icon: Trees },
  { value: "design", label: "设计感", icon: Sparkles, isNew: true },
  { value: "mountain", label: "山野", icon: Mountain },
  { value: "courtyard", label: "庭院", icon: Flower2 },
  { value: "active", label: "户外", icon: Bike },
];

const experiences: Experience[] = [
  {
    id: "tea",
    title: "跟着茶人，读懂一盏春茶",
    location: "杭州 · 文化体验",
    price: 268,
    rating: "4.97",
    image: "/images/courtyard.webp",
    imageAlt: "阳光照进木质茶室，窗外是绿色庭院",
    isNew: true,
  },
  {
    id: "sailing",
    title: "在湖面迎接傍晚的风",
    location: "大理 · 户外体验",
    price: 398,
    rating: "4.95",
    image: "/images/coast.webp",
    imageAlt: "白色卧室拱窗外的蓝色水面",
  },
  {
    id: "forest",
    title: "沿着林间小径认识苔藓",
    location: "莫干山 · 自然体验",
    price: 188,
    rating: "4.99",
    image: "/images/cabin.webp",
    imageAlt: "松林与蕨类植物环绕的木屋",
  },
];

const cities = [
  { name: "杭州", category: "庭院民宿", href: "#preview" },
  { name: "大理", category: "湖景住宿", href: "#preview" },
  { name: "莫干山", category: "林间木屋", href: "#preview" },
  { name: "苏州", category: "园林附近", href: "#preview" },
  { name: "景德镇", category: "手作体验", href: "#preview" },
  { name: "安吉", category: "亲子度假", href: "#preview" },
];

export function ExpandedPatterns() {
  const [category, setCategory] = useState("lake");
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("尚未选择体验");
  const [range, setRange] = useState<DateRange>({ start: "2026-10-12", end: "2026-10-15" });
  const [dates, setDates] = useState({ start: "2026-10-12", end: "2026-10-15" });
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState("演示环境，不创建订单或扣款。");
  const reservation = (
    <ReservationCard
      price="¥680"
      dates={dates}
      onDatesChange={setDates}
      guests={guests}
      onGuestsChange={setGuests}
      fees={[
        { label: "¥680 × 3 晚", amount: "¥2,040" },
        { label: "清洁服务费", amount: "¥120" },
      ]}
      total="¥2,160"
      onReserve={() => setStatus("已记录预订意向（演示），未创建订单或扣款。")}
    />
  );
  return (
    <>
      <section id="discovery" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">发现与体验</h2>
          <p className="section-copy">来源明确的横向分类条、NEW 标签与 4:5 体验卡片。</p>
        </div>
        <div className="spec-panel overflow-hidden">
          <CategoryStrip items={categories} value={category} onValueChange={setCategory} className="px-5" />
          <div className="grid gap-5 p-6 md:grid-cols-3 md:p-8">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                priority={index === 0}
                saved={saved.includes(experience.id)}
                onSavedChange={(next) => setSaved((current) => next ? [...current, experience.id] : current.filter((id) => id !== experience.id))}
                onSelect={() => setSelectedExperience(`已选择：${experience.title}`)}
              />
            ))}
          </div>
          <p role="status" className="border-t px-6 py-4 text-body-sm text-muted-foreground md:px-8">当前分类：{categories.find((item) => item.value === category)?.label} · {selectedExperience}</p>
        </div>
      </section>

      <section id="detail" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">住宿详情闭环</h2>
          <p className="section-copy">图片画廊、评分、设施、评价、房东、日期与预订摘要组成可直接替换数据的页面模式。</p>
        </div>
        <div className="spec-panel overflow-hidden">
          <div className="flex flex-col gap-8 p-6 md:p-8">
            <div className="flex flex-col gap-3">
              <ListingGallery images={[
                { src: "/images/courtyard.webp", alt: "木质茶室面向绿意庭院" },
                { src: "/images/coast.webp", alt: "拱窗外是一片蓝色水面" },
                { src: "/images/cabin.webp", alt: "松林中的玻璃木屋" },
              ]} />
              <div className="flex flex-col gap-2">
                <h3 className="text-display-lg text-balance">竹影庭院里的安静小屋</h3>
                <p className="text-body-sm text-muted-foreground">杭州 · 整套小屋 · 2 位旅客 · 1 间卧室</p>
              </div>
            </div>
            <ListingDetailLayout
              reservation={reservation}
              mobileBar={<MobileReservationBar price="¥680"><Button size="sm" onClick={() => setStatus("已打开移动端预订入口（演示）。")}>申请预订</Button></MobileReservationBar>}
            >
              <div className="flex flex-col gap-10">
                <RatingDisplay rating="4.98" stats={[
                  { label: "评价", value: "126 条" },
                  { label: "房东经验", value: "6 年" },
                  { label: "回复率", value: "100%" },
                ]} />
                <p className="text-body-md text-body">晨光沿着木格窗落进房间，庭院与起居空间之间没有急促的边界。适合两个人停留几日，也适合一个人安静读完一本书。</p>
                <AmenityList amenities={[
                  { label: "高速无线网络", icon: Wifi },
                  { label: "庭院早餐", icon: Coffee },
                  { label: "完整厨房", icon: CookingPot },
                  { label: "免费停车位", icon: Car },
                  { label: "湖边步道", icon: Footprints },
                  { label: "健身空间", icon: Dumbbell },
                ]} />
                <DateRangeCalendar year={2026} month={10} value={range} onChange={setRange} />
                <ReviewsGrid reviews={[
                  { id: "one", author: "林岚", date: "2026 年 8 月", excerpt: "庭院比照片更安静，下午坐在窗边能听见竹叶的声音。入住说明很清楚，步行去湖边也很方便。" },
                  { id: "two", author: "周远", date: "2026 年 7 月", excerpt: "空间尺度很舒服，不追求夸张装饰。早餐和床品都让人放松，我们临时多住了一晚。" },
                ]} />
                <HostCard name="溪亭" description="超赞房东 · 杭州" responseRate="100%" onContact={() => setStatus("已打开联系房东入口（演示）。")} />
              </div>
            </ListingDetailLayout>
            <p role="status" className="text-body-sm text-muted-foreground"><Check className="mr-2 inline size-4" aria-hidden="true" />{status}</p>
          </div>
        </div>
      </section>

      <section id="footer-pattern" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="section-heading">目的地与页脚</h2>
          <p className="section-copy">桌面 6 列城市链接，页脚 3 列；移动端都回落为单列。</p>
        </div>
        <div className="spec-panel px-6 md:px-8">
          <div className="py-12"><CityLinkGrid title="下一次出发，也许就在这里" items={cities} /></div>
          <SiteFooter
            columns={[
              { title: "支持", links: [{ label: "帮助中心", href: "#notes" }, { label: "安全信息", href: "#notes" }] },
              { title: "出租", links: [{ label: "开始出租", href: "#notes" }, { label: "资源中心", href: "#notes" }] },
              { title: "关于", links: [{ label: "设计来源", href: "#notes" }, { label: "无障碍", href: "#notes" }] },
            ]}
            copyright="© 2026 周末小住（演示）"
            legalLinks={[{ label: "隐私", href: "#notes" }, { label: "条款", href: "#notes" }]}
          />
        </div>
      </section>
    </>
  );
}
