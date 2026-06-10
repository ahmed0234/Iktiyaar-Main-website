"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Tag,
  Phone,
  Globe,
  MessageSquare,
  Send,
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { submitContactFormData } from "@/lib/submitContactForm";

/* ── Validation ─────────────────────────────────────────── */
const validators = {
  firstName: (v) => (!v.trim() ? "First name is required" : ""),
  lastName: (v) => (!v.trim() ? "Last name is required" : ""),
  email: (v) =>
    !v.trim()
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Enter a valid email address"
        : "",
  subject: (v) => (!v.trim() ? "Subject is required" : ""),
  phone: (v) =>
    !v.trim()
      ? "Phone number is required"
      : v.replace(/\D/g, "").length < 7
        ? "Enter a valid phone number"
        : "",
  website: (v) => "",
  message: (v) =>
    !v.trim()
      ? "Message is required"
      : "",
};

/* ── Dummy API ───────────────────────────────────────────── */
async function submitContactForm(data) {
  await submitContactFormData(data);
}

/* ── Input class builder ─────────────────────────────────── */
const inputCls = (error, valid) =>
  [
    "w-full h-12 pl-10 pr-10 rounded-xl border bg-white/80 text-sm text-slate-800 placeholder-slate-400",
    "outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    error
      ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100 focus:border-red-400"
      : valid
        ? "border-emerald-300 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
        : "border-slate-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500",
  ].join(" ");

const textareaCls = (error, valid) =>
  [
    "w-full pl-10 pr-4 pt-3.5 pb-3 rounded-xl border bg-white/80 text-sm text-slate-800 placeholder-slate-400",
    "outline-none transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed",
    error
      ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100 focus:border-red-400"
      : valid
        ? "border-emerald-300 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
        : "border-slate-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500",
  ].join(" ");

/* ── Field wrapper ───────────────────────────────────────── */
function Field({
  label,
  required = true,
  error,
  valid,
  icon: IconComp,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase flex items-center gap-1">
        {label}
        {required && (
          <span className="text-blue-500 text-sm leading-none">*</span>
        )}
      </label>
      <div className="relative">
        <span
          className={[
            "absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
            error
              ? "text-red-400"
              : valid
                ? "text-emerald-500"
                : "text-slate-400",
          ].join(" ")}
        >
          <IconComp size={15} />
        </span>
        {children}
        {valid && !error && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none">
            <Check size={14} strokeWidth={2.5} />
          </span>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Success screen ──────────────────────────────────────── */
function SuccessScreen({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center gap-5">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-100">
        <CheckCircle2 size={36} className="text-white" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Message sent!
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          Thanks for reaching out. We'll get back to you within 24 hours on
          business days.
        </p>
      </div>
      <button
        onClick={onReset}
        className="mt-1 flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors duration-200"
      >
        <RefreshCw size={14} />
        Send another message
      </button>
    </div>
  );
}

/* ── Error banner ────────────────────────────────────────── */
function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600">
      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">Something went wrong</p>
        <p className="text-xs text-red-500 mt-0.5">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors text-xl leading-none"
      >
        ×
      </button>
    </div>
  );
}

/* ── ContactForm ─────────────────────────────────────────── */
const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  phone: "",
  website: "",
  message: "",
};

export default function ContactForm() {
  const [fields, setFields] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [apiError, setApiError] = useState("");

  const errors = Object.fromEntries(
    Object.entries(validators).map(([k, fn]) => [
      k,
      touched[k] ? fn(fields[k]) : "",
    ]),
  );
  const valids = Object.fromEntries(
    Object.entries(validators).map(([k, fn]) => [
      k,
      touched[k] && !fn(fields[k]),
    ]),
  );
  const allValid = Object.entries(validators).every(
    ([k, fn]) => !fn(fields[k]),
  );
  const isLoading = status === "loading";

  const onChange = (e) =>
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(INITIAL).map((k) => [k, true])));
    if (!allValid) return;
    setStatus("loading");
    setApiError("");
    try {
      await submitContactForm(fields);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setApiError(err.message || "An unexpected error occurred.");
    }
  };

  const handleReset = () => {
    setFields(INITIAL);
    setTouched({});
    setStatus("idle");
    setApiError("");
  };

  if (status === "success") return <SuccessScreen onReset={handleReset} />;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === "error" && (
        <ErrorBanner
          message={apiError}
          onDismiss={() => {
            setStatus("idle");
            setApiError("");
          }}
        />
      )}

      {/* Row 1 — Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="First Name"
          error={errors.firstName}
          valid={valids.firstName}
          icon={User}
        >
          <input
            name="firstName"
            value={fields.firstName}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="John"
            disabled={isLoading}
            className={inputCls(errors.firstName, valids.firstName)}
          />
        </Field>
        <Field
          label="Last Name"
          error={errors.lastName}
          valid={valids.lastName}
          icon={User}
        >
          <input
            name="lastName"
            value={fields.lastName}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Smith"
            disabled={isLoading}
            className={inputCls(errors.lastName, valids.lastName)}
          />
        </Field>
      </div>

      {/* Row 2 — Email + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Email Address"
          error={errors.email}
          valid={valids.email}
          icon={Mail}
        >
          <input
            name="email"
            type="email"
            value={fields.email}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="john@company.com"
            disabled={isLoading}
            className={inputCls(errors.email, valids.email)}
          />
        </Field>
        <Field
          label="Subject"
          error={errors.subject}
          valid={valids.subject}
          icon={Tag}
        >
          <input
            name="subject"
            value={fields.subject}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="How can we help?"
            disabled={isLoading}
            className={inputCls(errors.subject, valids.subject)}
          />
        </Field>
      </div>

      {/* Row 3 — Phone + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Phone"
          error={errors.phone}
          valid={valids.phone}
          icon={Phone}
        >
          <input
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="+(1) 555 000 0000"
            disabled={isLoading}
            className={inputCls(errors.phone, valids.phone)}
          />
        </Field>
        <Field
          label="Website"
          required={false}
          error={errors.website}
          valid={valids.website}
          icon={Globe}
        >
          <input
            name="website"
            value={fields.website}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="https://yoursite.com"
            disabled={isLoading}
            className={inputCls(errors.website, valids.website)}
          />
        </Field>
      </div>

      {/* Message textarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase flex items-center gap-1">
          Comments / Questions{" "}
          <span className="text-blue-500 text-sm leading-none">*</span>
        </label>
        <div className="relative">
          <span
            className={[
              "absolute left-3.5 top-3.5 pointer-events-none transition-colors duration-200",
              errors.message
                ? "text-red-400"
                : valids.message
                  ? "text-emerald-500"
                  : "text-slate-400",
            ].join(" ")}
          >
            <MessageSquare size={15} />
          </span>
          <textarea
            name="message"
            value={fields.message}
            onChange={onChange}
            onBlur={onBlur}
            rows={5}
            placeholder="Tell us about your project, goals, or any questions…"
            disabled={isLoading}
            className={textareaCls(errors.message, valids.message)}
          />
          {valids.message && !errors.message && (
            <span className="absolute right-3.5 top-3.5 text-emerald-500 pointer-events-none">
              <Check size={14} strokeWidth={2.5} />
            </span>
          )}
        </div>
        {errors.message && (
          <p className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium">
            <AlertCircle size={11} /> {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-1 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={15} /> Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        We typically respond within 24 hours on business days.
      </p>
    </form>
  );
}
