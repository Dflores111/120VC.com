"use client";

import { useEffect } from "react";

type EventDetail = {
  event: string;
  page: string;
  section?: string;
  selection?: string;
  case_id?: string;
  case_context?: string;
  case_index?: number;
  proof_status?: "demo" | "approved";
  source_page?: string;
  entry_route: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

type InteractionEvent = Pick<EventDetail, "event"> & Partial<Pick<EventDetail,
  | "section"
  | "selection"
  | "case_id"
  | "case_context"
  | "case_index"
  | "proof_status"
  | "source_page"
>>;

type Attribution = Pick<EventDetail, "entry_route" | "utm_source" | "utm_medium" | "utm_campaign">;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const attributionKey = "120vc_attribution";

function currentAttribution(): Attribution {
  if (typeof window === "undefined") return { entry_route: "/" };
  const stored = window.sessionStorage.getItem(attributionKey);
  if (stored) {
    try {
      return JSON.parse(stored) as Attribution;
    } catch {
      window.sessionStorage.removeItem(attributionKey);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    entry_route: window.location.pathname,
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
  window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
  return attribution;
}

export function get120vcAttribution() {
  return currentAttribution();
}

export function track120vcEvent(interaction: InteractionEvent) {
  if (typeof window === "undefined") return;
  const detail: EventDetail = {
    ...interaction,
    page: window.location.pathname,
    ...currentAttribution(),
  };
  window.dispatchEvent(new CustomEvent<EventDetail>("120vc:analytics", { detail }));
  window.dataLayer?.push(detail);
}

export function AnalyticsBridge() {
  useEffect(() => {
    currentAttribution();

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;
      if (!target?.dataset.analyticsEvent) return;

      track120vcEvent({
        event: target.dataset.analyticsEvent,
        section: target.dataset.analyticsSection,
        selection: target.dataset.analyticsSelection,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
