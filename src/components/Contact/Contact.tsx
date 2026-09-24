"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
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

  return (
    <section
      id="contact"
      ref={ref}
      className={styles.contact}
      aria-labelledby="contact-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
          <p className={styles.label}>Get in Touch</p>
          <h2 id="contact-heading" className={styles.heading}>
            Have a project in mind?
            <br />
            Let&apos;s build it.
          </h2>
          <nav className={styles.links} aria-label="Contact links">
            <a href={`mailto:${email}`} className={styles.link}>
              <span>Email</span>
              <span className={styles.linkValue}>{email}</span>
            </a>
            {phone && (
              <a href={phoneHref(phone)} className={styles.link}>
                <span>Phone</span>
                <span className={styles.linkValue}>{phone}</span>
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
