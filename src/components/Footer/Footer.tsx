import styles from "./Footer.module.scss";

interface FooterProps {
  name: string;
  title: string;
  year?: number;
}

export default function Footer({ name, title, year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.name}>{name.toUpperCase()}</p>
          <p className={styles.title}>{title}</p>
        </div>
        <p className={styles.copyright}>© {year}</p>
      </div>
    </footer>
  );
}
