export type AdEvent = {
  type: 'impression' | 'click';
  adId: string;
  ts: number;
  meta?: Record<string, any>;
};

const pushEvent = (ev: AdEvent) => {
  try {
    (window as any).__ad_events = (window as any).__ad_events || [];
    (window as any).__ad_events.push(ev);
    // Attempt to send with sendBeacon for reliability (no server configured by default)
    if (navigator && 'sendBeacon' in navigator) {
      try {
        const url = '/_ad_events';
        const blob = new Blob([JSON.stringify(ev)], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      } catch (e) {
        // ignore network errors — this is best-effort
      }
    }
  } catch (e) {
    // ignore
  }
  // Keep a console log for local debugging
  // eslint-disable-next-line no-console
  console.log('AdEvent', ev);
};

export const recordImpression = (adId: string, meta?: Record<string, any>) => {
  pushEvent({ type: 'impression', adId, ts: Date.now(), meta });
};

export const recordClick = (adId: string, meta?: Record<string, any>) => {
  pushEvent({ type: 'click', adId, ts: Date.now(), meta });
};

export default { recordImpression, recordClick };
