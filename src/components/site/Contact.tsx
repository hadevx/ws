import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageProvider";
import { CONTACT } from "@/i18n/data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ActionButton, Overline, Reveal, SplitWords } from "./primitives";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface FieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ id, label, children, className }: FieldProps) {
  return (
    <div className={cn("group/field relative", className)}>
      <label
        htmlFor={id}
        className="label mb-3 block transition-colors duration-300 group-focus-within/field:text-signal"
      >
        {label}
      </label>
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-brand group-focus-within/field:scale-x-100"
      />
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b border-line bg-transparent pb-3 text-[15px] text-foreground placeholder:text-text-tertiary/70 focus:border-line focus:outline-none focus:ring-0 transition-colors";

export default function Contact() {
  const { t } = useLang();
  const { toast } = useToast();
  const f = t.contact.form;

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    timeline: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: f.required, description: f.requiredDesc, variant: "destructive" });
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      toast({ title: f.invalidEmail, description: f.invalidEmailDesc, variant: "destructive" });
      return;
    }

    const typeLabel = f.types.find((o) => o.value === form.type)?.label ?? "—";
    const timeLabel = f.timelines.find((o) => o.value === form.timeline)?.label ?? "—";

    const body = [
      `${f.name}: ${form.name}`,
      `${f.email}: ${form.email}`,
      `${f.type}: ${typeLabel}`,
      `${f.timeline}: ${timeLabel}`,
      "",
      `${f.message}:`,
      form.message,
    ].join("\n");

    toast({ title: f.sent, description: f.sentDesc });
    window.open(
      `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section id="contact" className="section relative">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left rail */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-32">
              <Reveal>
                <Overline>{t.contact.overline}</Overline>
              </Reveal>
              <h2 className="display display-md">
                <SplitWords text={t.contact.title} stagger={0.05} />
              </h2>
              <Reveal delay={0.1}>
                <p className="lead max-w-[38ch]">{t.contact.lead}</p>
              </Reveal>

              <Reveal delay={0.16} className="mt-6">
                <dl className="border-t border-line">
                  {t.contact.info.map((row) => (
                    <div
                      key={row.k}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <dt className="label">{row.k}</dt>
                      <dd className="text-[13.5px] text-foreground latin">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <Reveal y={24}>
              <form onSubmit={onSubmit} className="grid gap-10 sm:grid-cols-2">
                <Field id="name" label={f.name}>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder={f.namePh}
                    className={inputClass}
                    required
                  />
                </Field>

                <Field id="email" label={f.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    value={form.email}
                    onChange={set("email")}
                    placeholder={f.emailPh}
                    className={cn(inputClass, "latin")}
                    required
                  />
                </Field>

                <Field id="type" label={f.type}>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={set("type")}
                    className={cn(inputClass, "cursor-pointer appearance-none")}
                  >
                    <option value="">{f.typePh}</option>
                    {f.types.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute end-0 bottom-3 text-xs text-text-tertiary"
                  >
                    ▾
                  </span>
                </Field>

                <Field id="timeline" label={f.timeline}>
                  <select
                    id="timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={set("timeline")}
                    className={cn(inputClass, "cursor-pointer appearance-none")}
                  >
                    <option value="">{f.timelinePh}</option>
                    {f.timelines.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute end-0 bottom-3 text-xs text-text-tertiary"
                  >
                    ▾
                  </span>
                </Field>

                <Field id="message" label={f.message} className="sm:col-span-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder={f.messagePh}
                    className={cn(inputClass, "resize-none")}
                    required
                  />
                </Field>

                <div className="sm:col-span-2">
                  <ActionButton size="lg" type="submit">
                    {f.submit}
                  </ActionButton>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
