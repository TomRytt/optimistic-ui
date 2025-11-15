import { Link } from 'react-router-dom';
import styles from '../styles/navigation.module.css';

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link to="/demo1" className={styles.navLink}>
        Demo 1
      </Link>
      <Link to="/demo2" className={styles.navLink}>
        Demo 2
      </Link>
      <Link to="/demo3" className={styles.navLink}>
        Demo 3
      </Link>
      <Link to="/demo4" className={styles.navLink}>
        Demo 4
      </Link>
    </nav>
  );
}
