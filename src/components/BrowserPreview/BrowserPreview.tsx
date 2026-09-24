"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getHostname } from "@/lib/data";
import styles from "./BrowserPreview.module.scss";

interface BrowserPreviewProps {
  url?: string;
  preview: string;
  title: string;
  iframeEnabled: boolean;
  isNearViewport: boolean;
  eager?: boolean;
}

const IFRAME_LOAD_TIMEOUT = 12000;

export default function BrowserPreview({
  url,
  preview,
  title,
  iframeEnabled,
  isNearViewport,
  eager = false,
}: BrowserPreviewProps) {
  const [loadRequested, setLoadRequested] = useState(eager);
  const [iframeState, setIframeState] = useState<
    "idle" | "loading" | "loaded" | "failed"
  >("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const useIframe = iframeEnabled && Boolean(url);
  const addressLabel = url ? getHostname(url) : title;

  const clearLoadTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Once near viewport (or eager), keep load requested — don't unmount iframe on scroll away
  useEffect(() => {
    if (useIframe && (eager || isNearViewport)) {
      setLoadRequested(true);
    }
  }, [useIframe, eager, isNearViewport]);

  useEffect(() => {
    if (!useIframe || !loadRequested || iframeState !== "idle") return;

    setIframeState("loading");
    timeoutRef.current = setTimeout(() => {
      setIframeState((current) => (current === "loading" ? "failed" : current));
    }, IFRAME_LOAD_TIMEOUT);

    return clearLoadTimeout;
  }, [useIframe, loadRequested, iframeState, clearLoadTimeout]);

  const handleIframeLoad = () => {
    clearLoadTimeout();
    setIframeState("loaded");
  };

  const handleIframeError = () => {
    clearLoadTimeout();
    setIframeState("failed");
  };

  const mountIframe = useIframe && loadRequested && iframeState !== "failed";
  const showPreviewImage =
    !useIframe ||
    iframeState === "failed" ||
    (iframeState !== "loaded" && preview);
  const showLoadingOverlay = iframeState === "loading";

  return (
    <div className={`${styles.browser} browser-preview`} aria-hidden="true">
      <div className={styles.chrome}>
        <div className={styles.controls}>
          <span className={`${styles.dot} browser-dot`} />
          <span className={`${styles.dot} browser-dot`} />
          <span className={`${styles.dot} browser-dot`} />
        </div>
        <div className={styles.addressBar}>
          <span className={styles.hostname}>{addressLabel}</span>
        </div>
      </div>

      <div className={styles.viewport}>
        {showPreviewImage && preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt={`Preview of ${title}`}
            className={`${styles.previewImage} browser-preview-image ${iframeState === "loaded" ? styles.previewHidden : ""}`}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
          />
        )}

        {!preview && iframeState !== "loaded" && (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>Preview unavailable</span>
          </div>
        )}

        {mountIframe && (
          <>
            {showLoadingOverlay && (
              <div className={styles.loading}>
                <span className={styles.loadingText}>Loading preview…</span>
              </div>
            )}
            <iframe
              src={url!}
              title={`Live preview of ${title}`}
              className={`${styles.iframe} ${iframeState === "loaded" ? styles.loaded : ""}`}
              loading="eager"
              sandbox="allow-scripts allow-same-origin allow-popups"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </>
        )}

        {useIframe && iframeState === "failed" && (
          <span className={styles.unavailable}>Live preview unavailable</span>
        )}
      </div>
    </div>
  );
}
