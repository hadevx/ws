import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Star } from "lucide-react";
const reviews = [
  {
    name: (
      <div className="flex">
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
      </div>
    ),
    username: "@jack",
    body: "منصة التجارة الإلكترونية التي بناها ويب سكيما زادت مبيعاتنا الإلكترونية بنسبة 300%. خبرة الفريق في تقنيات الويب الحديثة مثيرة للإعجاب.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: (
      <div className="flex">
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star />
      </div>
    ),
    username: "@jill",
    body: "ويب سكيما حولت رؤيتنا إلى موقع رائع يعكس علامتنا التجارية بشكل مثالي. الاهتمام بالتفاصيل والمهنية تجاوزت توقعاتنا.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: (
      <div className="flex">
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
      </div>
    ),
    username: "@john",
    body: "موقع محفظتي يعرض أعمالي بشكل جميل وساعدني في الحصول على عدة عملاء مهمين. شكراً ويب سكيما لتحويل رؤيتي إلى حقيقة!",

    img: "https://avatar.vercel.sh/john",
  },
  {
    name: (
      <div className="flex">
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
      </div>
    ),
    username: "@jane",
    body: "الجودة التقنية وأداء موقعنا متميز. فريق ويب سكيما يفهم التصميم والتطوير على أعلى مستوى.",

    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: (
      <div className="flex">
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
      </div>
    ),
    username: "@jenny",
    body: "موقع شركتنا لا يبدو مهنياً فحسب، بل يولد عملاء محتملين باستمرار. فريق ويب سكيما كان متجاوباً وسلم في الوقت المحدد.",

    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: (
      <div className="flex">
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star fill="currentColor" />
        <Star />
      </div>
    ),
    username: "@james",
    body: "من المفهوم إلى الإطلاق، ويب سكيما جعل العملية بأكملها سلسة وخالية من التوتر. موقعنا الآن يمثل علامتنا التجارية وقيمنا بشكل مثالي.",

    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: any;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 lg:w-96 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}>
      <div className="flex flex-row items-center gap-2">
        {/* <img className="rounded-full" width="32" height="32" alt="" src={img} /> */}
        <div className="flex flex-col">
          {/*    <figcaption className="text-sm lg:text-lg font-medium dark:text-white">{name}</figcaption>
          <p className="text-sm font-medium dark:text-white/40">{username}</p> */}
          <p className="text-black">{name}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm lg:text-xl">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:50s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:50s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
