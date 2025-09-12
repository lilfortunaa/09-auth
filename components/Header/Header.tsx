import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import styles from './Header.module.css';

export default function Header() {
    console.log("Logging out...");
  

  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={styles.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          <AuthNavigation/>
        </ul>
      </nav>
    </header>
  );
}