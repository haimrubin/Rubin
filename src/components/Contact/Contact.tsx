"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useLanguage } from "@/hooks/useLanguage";
import { getUi } from "@/lib/translations";
import styles from "./Contact.module.scss";

interface ContactProps {
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
}

function phoneHref(phone: string): string {
  const normalized = phone.replace(/[^\d+]/g, "");
  return normalized.startsWith("+") ? `tel:${normalized}` : `tel:${normalized}`;
}

export default function Contact({ email, phone, linkedin, github }: ContactProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();
  const { language } = useLanguage();
  const copy = getUi(language);

  return (
    <section
      id="contact"
      ref={ref}
      className={styles.contact}
      aria-labelledby="contact-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
          <p className={styles.label}>{copy.contact.label}</p>
          <h2 id="contact-heading" className={styles.heading}>
            {copy.contact.headingLineOne}
            <br />
            {copy.contact.headingLineTwo}
          </h2>
          <nav className={styles.links} aria-label={copy.contact.linksLabel}>
            <a href={`mailto:${email}`} className={styles.link}>
              <span>{copy.contact.email}</span>
              <span className={styles.linkValue} dir="ltr">{email}</span>
            </a>
            {phone && (
              <a href={phoneHref(phone)} className={styles.link}>
                <span>{copy.contact.phone}</span>
                <span className={styles.linkValue} dir="ltr">{phone}</span>
              </a>
            )}
            <a
              href={linkedin}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
            <a
              href={github}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
