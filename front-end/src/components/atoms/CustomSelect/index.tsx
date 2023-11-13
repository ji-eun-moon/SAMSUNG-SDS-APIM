import { useState } from 'react';
import styles from './CustomSelect.module.scss';

interface SelectBoxProps {
  items: string[];
  value: string;
  fontSize?: string;
  height: string;
  onChange: (item: string) => void;
}

/**
 * @param items 옵션 리스트
 * @param value 선택된 값
 * @param size 폰트 크기
 * @param onChange 값 변경 함수
 * @example const [selected, setSelected] = useState('초기 옵션 값'); -> selected = value, setSelected = onChange
 */

function CustomSelect({ fontSize, items, value, height, onChange }: SelectBoxProps) {
  const [isActive, setIsActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    onChange(item);
    setIsActive(false);
  };

  return (
    <div className={styles.dropdown} style={{ fontSize }}>
      <div onClick={() => setIsActive(!isActive)} className={styles.dropdownBtn} aria-hidden="true" style={{ height }}>
        {value}
        {isActive ? (
          <svg
            className="w-3 h-3 text-gray-400 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
            />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 text-gray-400 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
            />
          </svg>
        )}
      </div>
      {isActive && (
        <div className={styles.dropdownContent}>
          {items.map((item) => (
            <div
              aria-hidden="true"
              key={item}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`${styles.item} ${value === item && hoveredItem === null ? styles.selectedItem : ''} ${
                hoveredItem === item ? styles.hoveredItem : ''
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomSelect.defaultProps = {
  fontSize: '12px',
};

export default CustomSelect;
