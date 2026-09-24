"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getHostname } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import { getUi } from "@/lib/translations";
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
  const { language } = useLanguage();
  const copy = getUi(language);
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
            alt={`${copy.projects.preview} ${title}`}
            className={`${styles.previewImage} browser-preview-image ${iframeState === "loaded" ? styles.previewHidden : ""}`}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
          />
        )}

        {!preview && iframeState !== "loaded" && (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>
              {copy.projects.previewUnavailable}
            </span>
          </div>
        )}

        {mountIframe && (
          <>
            {showLoadingOverlay && (
              <div className={styles.loading}>
                <span className={styles.loadingText}>{copy.projects.loading}</span>
              </div>
            )}
            <iframe
              src={url!}
              title={`${copy.projects.livePreview} ${title}`}
              className={`${styles.iframe} ${iframeState === "loaded" ? styles.loaded : ""}`}
              loading="eager"
              sandbox="allow-scripts allow-same-origin allow-popups"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </>
        )}

        {useIframe && iframeState === "failed" && (
          <span className={styles.unavailable}>{copy.projects.unavailable}</span>
        )}
      </div>
    </div>
  );
}
