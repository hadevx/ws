import { ActionButton, Overline } from "@/components/site/primitives";
import { useLang } from "@/i18n/LanguageProvider";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    console.error("404: route not found —", location.pathname);
  }, [location.pathname]);

  const copy =
    lang === "ar"
      ? { title: "الصفحة غير موجودة", lead: "الرابط الذي فتحته لم يعد موجوداً.", cta: "العودة للرئيسية" }
      : { title: "Page not found", lead: "The link you followed no longer exists.", cta: "Back to home" };

  return (
    <main className="flex min-h-[100svh] flex-col justify-between px-5 py-8 sm:px-8">
      <Overline>404</Overline>

      <div className="flex flex-col gap-6">
        <h1 className="display display-lg max-w-[14ch]">{copy.title}</h1>
        <p className="lead max-w-[42ch]">{copy.lead}</p>
        <div>
          <ActionButton href="/" size="lg">
            {copy.cta}
          </ActionButton>
        </div>
      </div>

      <span className="label latin">Webschema</span>
    </main>
  );
};

export default NotFound;
