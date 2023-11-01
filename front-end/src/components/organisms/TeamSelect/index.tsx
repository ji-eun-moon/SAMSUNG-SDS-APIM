import React, { useState } from 'react';
import SelectBox from '@/components/atoms/SelectBox';
import styles from './TeamSelect.module.scss';

interface TeamSelectProps {
  list: string[];
}

function TeamSelect({ list }: TeamSelectProps) {
  const [team, setTeam] = useState(list[0]);

  return (
    <div className="w-full flex items-center">
      <div className="w-4/12">
        <SelectBox
          list={list}
          onChange={(selectedTeam) => {
            setTeam(selectedTeam);
          }}
          width="w-full"
        />
      </div>
      <button type="button" className={`${styles.button} text-sm`} onClick={() => {}}>
        팀정보
      </button>
    </div>
  );
}

export default TeamSelect;
