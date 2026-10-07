"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  CONTRACT_OPTIONS,
  PROVIDER_OPTIONS,
  SERVICE_OPTIONS,
  contactSchema,
  fieldErrors,
  type ContactErrorKey,
  type ContactField,
} from "@/lib/contact-schema";
import { Icon } from "./icons";

type Errors = Partial<Record<ContactField, ContactErrorKey>>;
type ServerError = "rateLimit" | "server" | null;

const inputClass =
  "mt-2 block w-full min-h-12 rounded-lg border bg-white px-4 py-3 text-base text-ink placeholder:text-slate-500 shadow-sm transition-colors focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30";

export function ContactForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<ServerError>(null);
  const [submitting, setSubmitting] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);

  const errorId = (field: ContactField) => `${field}-error`;

  const fieldProps = (field: ContactField, hintId?: string) => ({
    id: field,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": [errors[field] ? errorId(field) : null, hintId].filter(Boolean).join(" ") || undefined,
    className: `${inputClass} ${errors[field] ? "border-red-700" : "border-sand-300"}`,
  });

  const errorText = (field: ContactField) =>
    errors[field] ? (
      <p id={errorId(field)} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700">
        <Icon name="alert" size={16} className="shrink-0" />
        {t(`errors.${errors[field]}`)}
      </p>
    ) : null;

  const label = (field: ContactField, children: ReactNode, required = true) => (
    <label htmlFor={field} className="block font-semibold text-navy-900">
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-red-700">
          *
        </span>
      )}
    </label>
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      role: String(fd.get("role") ?? ""),
      clinic: String(fd.get("clinic") ?? ""),
      city: String(fd.get("city") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      providers: String(fd.get("providers") ?? ""),
      contract: String(fd.get("contract") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      requestAnimationFrame(() => {
        const first = Object.keys(errs)[0];
        if (first) document.getElementById(first)?.focus();
      });
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: String(fd.get("website") ?? ""), startedAt, locale }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (res.ok && data.ok) {
        router.push("/contact/thank-you");
        return;
      }
      if (data.error === "validation" && data.fields) {
        setErrors(data.fields);
        const first = Object.keys(data.fields)[0];
        if (first) requestAnimationFrame(() => document.getElementById(first)?.focus());
      } else {
        setServerError(data.error === "rateLimit" ? "rateLimit" : "server");
        requestAnimationFrame(() => summaryRef.current?.focus());
      }
    } catch {
      setServerError("server");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
    setSubmitting(false);
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8" aria-describedby="form-required-hint">
      <p id="form-required-hint" className="text-sm text-muted">
        {t("requiredHint")}
      </p>

      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {(hasErrors || serverError) && (
          <div role="alert" className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <Icon name="alert" size={20} className="mt-0.5 shrink-0" />
            <p className="font-medium">{serverError ? t(`errors.${serverError}`) : t("errors.summary")}</p>
          </div>
        )}
      </div>

      <fieldset className="space-y-5">
        <legend className="mb-4 text-lg font-bold text-navy-900">{t("legend.you")}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            {label("name", t("fields.name"))}
            <input type="text" autoComplete="name" maxLength={100} required {...fieldProps("name")} />
            {errorText("name")}
          </div>
          <div>
            {label("role", t("fields.role"))}
            <input
              type="text"
              autoComplete="organization-title"
              maxLength={100}
              placeholder={t("fields.rolePlaceholder")}
              required
              {...fieldProps("role")}
            />
            {errorText("role")}
          </div>
          <div>
            {label("phone", t("fields.phone"))}
            <input type="tel" inputMode="tel" autoComplete="tel" maxLength={30} required {...fieldProps("phone")} />
            {errorText("phone")}
          </div>
          <div>
            {label("email", t("fields.email"))}
            <input type="email" inputMode="email" autoComplete="email" maxLength={160} required {...fieldProps("email")} />
            {errorText("email")}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-4 text-lg font-bold text-navy-900">{t("legend.clinic")}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            {label("clinic", t("fields.clinic"))}
            <input type="text" autoComplete="organization" maxLength={150} required {...fieldProps("clinic")} />
            {errorText("clinic")}
          </div>
          <div>
            {label("city", t("fields.city"))}
            <input type="text" autoComplete="address-level2" maxLength={80} required {...fieldProps("city")} />
            {errorText("city")}
          </div>
          <div>
            {label("providers", t("fields.providers"))}
            <select defaultValue="" required {...fieldProps("providers")}>
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {PROVIDER_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {t(`options.providers.${o}`)}
                </option>
              ))}
            </select>
            {errorText("providers")}
          </div>
          <div>
            {label("contract", t("fields.contract"))}
            <select defaultValue="" required {...fieldProps("contract")}>
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {CONTRACT_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {t(`options.contract.${o}`)}
                </option>
              ))}
            </select>
            {errorText("contract")}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-4 text-lg font-bold text-navy-900">{t("legend.request")}</legend>
        <div>
          {label("service", t("fields.service"))}
          <select defaultValue="audit" required {...fieldProps("service")}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {t(`options.service.${o}`)}
              </option>
            ))}
          </select>
          {errorText("service")}
        </div>
        <div>
          {label("message", t("fields.message"), false)}
          <p id="message-hint" className="mt-1 text-sm text-muted">
            {t("fields.messageHint")}
          </p>
          <textarea rows={4} maxLength={1000} {...fieldProps("message", "message-hint")} />
          {errorText("message")}
        </div>

        {/* Honeypot anti-spam: oculto para personas y lectores de pantalla. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">{t("fields.honeypot")}</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? errorId("consent") : undefined}
              className="mt-1 h-5 w-5 shrink-0 rounded border-sand-300 accent-navy-700"
            />
            <label htmlFor="consent" className="leading-relaxed text-ink">
              {t.rich("fields.consent", {
                link: (chunks) => (
                  <Link href="/privacy" className="link" target="_blank">
                    {chunks}
                  </Link>
                ),
              })}
              <span aria-hidden="true" className="ml-0.5 text-red-700">
                *
              </span>
            </label>
          </div>
          {errorText("consent")}
        </div>
      </fieldset>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting} aria-disabled={submitting}>
        {submitting ? t("submitting") : t("submit")}
        {!submitting && <Icon name="arrowRight" size={18} />}
      </button>
    </form>
  );
}
