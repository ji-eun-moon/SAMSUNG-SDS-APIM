import React, { useState } from 'react';
import SelectBox from '@/components/atoms/SelectBox';
import Modal from '@/components/organisms/Modal';
import styles from './TeamSelect.module.scss';

interface TeamSelectProps {
  list: string[];
}

function TeamSelect({ list }: TeamSelectProps) {
  const [team, setTeam] = useState(list[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpenHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  console.log(team);

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
      <button type="button" className={`${styles.button} text-sm`} onClick={onModalOpenHandler}>
        팀정보
      </button>

      {isModalOpen && (
        <Modal
          type="custom"
          title="팀 정보 조회하기"
          onClose={onModalOpenHandler}
          buttonLabel="닫기"
          onButton={onModalOpenHandler}
        >
          <div>팀정보</div>
        </Modal>
      )}
    </div>
  );
}

export default TeamSelect;
