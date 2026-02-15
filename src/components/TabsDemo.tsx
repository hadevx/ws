import { Tabs } from "@/components/ui/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "متجر الكتروني",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>متجر الكتروني</p>
          <img
            src="/2.jpg"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "موقع شخصي",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>موقع شخصي</p>
          <img
            src="/folio.jpeg"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "موقع شركه",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>موقع شركه</p>
          <img
            src="/image.png"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "مدونه",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>مدونه</p>
          <img
            src="/blog.png"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "خدمات الكترونيه",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>خدمات الكترونيه</p>
          <img
            src="/9.png"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[30rem] md:h-[50rem] [perspective:1000px] relative b flex flex-col mx-auto  max-w-full lg:max-w-full lg:w-full  items-start justify-start mb-[100px] ">
      <Tabs tabs={tabs} />
    </div>
  );
}
