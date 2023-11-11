import NavBar from '@/components/organisms/NavBar';
import useDrawerStore from '@/store/useDrawerStore';
import Drawer from '@/components/atoms/Drawer';
import styles from './DrawerLayout.module.scss';

/**
 * @param children[0] Drawer 내부
 * @param children[1] 페이지 내용
 */

function DrawerLayout({ children }: { children: React.ReactNode[] }) {
  const { isDrawerOpen } = useDrawerStore();
  return (
    <div>
      <NavBar position="top" />
      <div className={styles.bottomPage}>
        <Drawer>{children && children[0]}</Drawer>
        <div className={`${styles.pageContainer} ${isDrawerOpen ? styles.shifted : ''}`}>{children && children[1]}</div>
      </div>
    </div>
  );
}

export default DrawerLayout;
