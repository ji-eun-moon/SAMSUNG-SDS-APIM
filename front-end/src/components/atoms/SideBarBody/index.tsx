import React from 'react';
import styles from './SideBarBody.module.scss';

interface SideBarBodyProps {
  children: React.ReactNode;
}
function SideBarBody({ children }: SideBarBodyProps) {
  return <div className={styles.SideBarBody}>{children}</div>;
}

export default SideBarBody;
