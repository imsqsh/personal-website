import { HeaderName } from "./HeaderName";
import { Nav } from "./Nav";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <HeaderName />
      <Nav />
    </header>
  );
}
