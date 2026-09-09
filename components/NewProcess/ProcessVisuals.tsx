import Image from "next/image";
import {
  PiCheckBold,
  PiPhoneDuotone,
  PiClipboardTextDuotone,
  PiLightningDuotone,
  PiUserDuotone,
  PiCalendarBlankDuotone,
  PiHouseDuotone,
  PiArrowRightBold,
} from "react-icons/pi";
import { MapPin, Search, Smartphone, Check } from "lucide-react";
import { GoogleGLogo, GoogleAdsLogo } from "@/components/hero/HeroLogos";

export const JOBS_HOUSE_IMAGE = "/NewProcess/ProcessCircular.png";

export const STAGE_CARD =
  "relative z-10 min-h-[200px] overflow-visible rounded-[24px] bg-linear-to-b from-white via-[#FCFDFF] to-[#F4F8FF] border border-white ring-1 ring-[#D4E3F4] shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14),0_8px_18px_-6px_rgba(0,102,255,0.10),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-3px_8px_rgba(0,102,255,0.035)]";

function Specular() {
  return (
    <div
      className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent"
      aria-hidden
    />
  );
}

export function MarketVisual() {
  return (
    <div className={`${STAGE_CARD} p-4 sm:p-4.5`}>
      <Specular />
      <div className="flex items-center gap-2 rounded-full bg-[#F4F8FF] border border-[#E1ECFB] px-2.5 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
        <GoogleGLogo className="h-3.5 w-3.5 shrink-0" />
        <span className="text-[12px] font-semibold tracking-tight text-slate-700">
          roof replacement
        </span>
        <Search className="ml-auto h-3 w-3 text-slate-400" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Volume
          </p>
          <p className="mt-0.5 text-[13px] font-black tracking-tight text-[#0A1128]">
            1.9K/mo
          </p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            CPC
          </p>
          <p className="mt-0.5 text-[13px] font-black tracking-tight text-[#0A1128]">
            $12.40
          </p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Comp.
          </p>
          <p className="mt-0.5 text-[13px] font-black tracking-tight text-[#0066FF]">
            High
          </p>
        </div>
      </div>

      <svg
        viewBox="0 0 140 28"
        className="mt-3 h-8 w-full"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 22 C 18 20, 28 14, 42 16 C 58 18, 70 8, 86 10 C 102 12, 114 4, 139 3"
          stroke="#0066FF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const campaignServices = ["Roofing", "Patio Installation", "Kitchen Remodel"] as const;

export function CampaignVisual() {
  return (
    <div className={`${STAGE_CARD} p-4 sm:p-4.5`}>
      <Specular />
      <div className="mb-2.5 flex items-center gap-1.5">
        <GoogleAdsLogo className="h-4 w-4" />
        <span className="text-[12.5px] font-extrabold tracking-tight text-[#0A1128]">
          Google Ads
        </span>
      </div>
      <ul className="space-y-1.5 pr-16">
        {campaignServices.map((service) => (
          <li key={service} className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-[0_2px_6px_rgba(0,102,255,0.28)]">
              <PiCheckBold className="h-2 w-2" />
            </span>
            <span className="text-[11.5px] font-semibold text-slate-700">
              {service}
            </span>
          </li>
        ))}
      </ul>

      <div className="absolute -right-2 bottom-3 w-[48%] rounded-[14px] bg-white/95 border border-[#D5E6FC] p-2 shadow-[0_12px_24px_-8px_rgba(0,102,255,0.22),0_2px_4px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,1)]">
        <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#0066FF]">
          Targeting
        </p>
        <ul className="mt-1 space-y-0.5 text-[10px] font-semibold text-slate-600">
          <li className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5 text-[#0066FF]" /> Location
          </li>
          <li className="flex items-center gap-1">
            <Search className="h-2.5 w-2.5 text-[#0066FF]" /> Keywords
          </li>
          <li className="flex items-center gap-1">
            <PiUserDuotone className="h-2.5 w-2.5 text-[#0066FF]" /> Audience
          </li>
          <li className="flex items-center gap-1">
            <Smartphone className="h-2.5 w-2.5 text-[#0066FF]" /> Devices
          </li>
        </ul>
      </div>
    </div>
  );
}

export function TrafficVisual() {
  return (
    <div className={`${STAGE_CARD} p-4`}>
      <Specular />
      <p className="text-[9px] font-bold uppercase tracking-wider text-[#0066FF]">
        Sponsored
      </p>
      <p className="mt-0.5 text-[12.5px] font-extrabold leading-tight text-[#0A1128]">
        Roof Replacement Experts
      </p>
      <p className="text-[10px] text-slate-500">Get a Free Quote · Licensed</p>

      <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-[#E4EEF8] bg-[#F8FBFF] p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#0066FF] ring-1 ring-[#D5E6FC]">
          <PiHouseDuotone className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-slate-800">Landing page</p>
          <div className="mt-0.5 inline-flex rounded-full bg-[#0066FF] px-2 py-0.5 text-[8.5px] font-bold text-white shadow-[0_4px_10px_rgba(0,102,255,0.28)]">
            Get a Free Quote
          </div>
        </div>
      </div>

      <div className="absolute -right-2 top-8 flex flex-col gap-1">
        {[
          { label: "Call", Icon: PiPhoneDuotone },
          { label: "Form", Icon: PiClipboardTextDuotone },
          { label: "Lead", Icon: PiLightningDuotone },
        ].map((item) => (
          <div
            key={item.label}
            className="inline-flex items-center gap-1 rounded-full bg-white border border-[#D5E6FC] px-1.5 py-0.5 text-[9.5px] font-bold text-slate-700 shadow-[0_8px_14px_-6px_rgba(0,102,255,0.28),inset_0_1px_1px_rgba(255,255,255,1)]"
          >
            <item.Icon className="h-2.5 w-2.5 text-[#0066FF]" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrackingVisual() {
  return (
    <div className={`${STAGE_CARD} p-4 sm:p-4.5`}>
      <Specular />
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#F6FAFF] border border-[#E4EEF8] px-2 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Calls
          </p>
          <p className="text-[16px] font-black tracking-tight text-[#0A1128]">
            86
          </p>
          <p className="text-[10px] font-bold text-emerald-600">+42%</p>
        </div>
        <div className="rounded-xl bg-[#F6FAFF] border border-[#E4EEF8] px-2 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Cost/Lead
          </p>
          <p className="text-[16px] font-black tracking-tight text-[#0A1128]">
            $75.27
          </p>
          <p className="text-[10px] font-bold text-emerald-600">−31%</p>
        </div>
      </div>
      <p className="mt-2.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
        Top Performing Keywords
      </p>
      <div className="mt-1.5 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-[#E8F1FF]">
          <div className="h-1.5 w-[82%] rounded-full bg-[#0066FF]" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#E8F1FF]">
          <div className="h-1.5 w-[58%] rounded-full bg-[#5B9DFF]" />
        </div>
      </div>

      <div className="absolute -right-1.5 -bottom-1.5 rounded-full bg-[#EEF4FF] border border-[#CCE0FF] px-2.5 py-1 shadow-[0_8px_16px_-6px_rgba(0,102,255,0.28)]">
        <p className="text-[9.5px] font-extrabold leading-none text-[#0066FF]">
          Shift Budget Winners
        </p>
      </div>
    </div>
  );
}

export function JobsVisual() {
  return (
    <div className="relative z-10 flex min-h-[200px] items-center gap-3">
      <div className="relative h-[118px] w-[118px] shrink-0">
        <div className="absolute -inset-1 rounded-full bg-linear-to-b from-white to-[#D7E6F6] shadow-[0_16px_28px_-10px_rgba(15,23,42,0.28),0_4px_10px_rgba(0,102,255,0.10)]" />
        <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white">
          <Image
            src={JOBS_HOUSE_IMAGE}
            alt="Completed home project"
            fill
            className="object-cover"
            sizes="118px"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="inline-flex items-center gap-1 self-start rounded-full bg-white border border-[#D5E6FC] px-2.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-[0_8px_16px_-8px_rgba(15,23,42,0.18),inset_0_1px_1px_rgba(255,255,255,1)]">
          <PiUserDuotone className="h-3 w-3 text-[#0066FF]" />
          Qualified Lead
        </div>
        <div className="inline-flex items-center gap-1 self-end rounded-full bg-white border border-[#D5E6FC] px-2.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-[0_8px_16px_-8px_rgba(15,23,42,0.18),inset_0_1px_1px_rgba(255,255,255,1)]">
          <PiCalendarBlankDuotone className="h-3 w-3 text-[#0066FF]" />
          Estimate
        </div>
        <div className="inline-flex items-center gap-1 self-start rounded-full bg-[#0066FF] px-2.5 py-1.5 text-[11px] font-black tracking-tight text-white shadow-[0_8px_18px_-4px_rgba(0,102,255,0.5)]">
          JOB
          <Check className="h-3 w-3 stroke-[3]" />
        </div>
      </div>
    </div>
  );
}

export function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className="relative z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-white to-[#EAF2FF] border border-[#C9DEFF] text-[#0066FF] shadow-[0_6px_14px_-4px_rgba(0,102,255,0.28),inset_0_1px_1px_rgba(255,255,255,1)]"
      aria-hidden
    >
      <PiArrowRightBold
        className={`h-3.5 w-3.5 ${vertical ? "rotate-90" : ""}`}
      />
    </div>
  );
}

export function ColumnSeparator() {
  return (
    <div className="relative flex h-full min-h-full flex-col items-center" aria-hidden>
      <div className="absolute inset-y-0 w-px bg-[#D7E6F6]" />
      <div className="flex h-[200px] items-center justify-center">
        <FlowArrow />
      </div>
    </div>
  );
}

export const DESKTOP_FLOW_GRID =
  "grid-cols-[minmax(0,1fr)_4.75rem_minmax(0,1fr)_4.75rem_minmax(0,1fr)_4.75rem_minmax(0,1fr)_4.75rem_minmax(0,1fr)]";

export function FlowPath() {
  return (
    <svg
      viewBox="0 0 1000 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-[100px] z-0 hidden h-16 w-full -translate-y-1/2 xl:block"
      fill="none"
      aria-hidden
    >
      <path
        d="M 4 40 C 80 28, 120 52, 200 40 C 280 28, 320 52, 400 40 C 480 28, 520 52, 600 40 C 680 28, 720 52, 800 40 C 880 28, 920 52, 996 40"
        stroke="#B9D4FF"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  );
}
