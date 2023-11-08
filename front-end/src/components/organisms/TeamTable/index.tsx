import React, { useState } from 'react';
import { TTeamMemberList } from '@/types/User';
import Modal from '@/components/organisms/Modal';
import DropDown from '@/components/atoms/DropDown';
import NoticeSendBox from '../NoticeSendBox';
import styles from './TeamTable.module.scss';

interface MemberTableProps {
  memberList: TTeamMemberList | undefined;
}

function MemberTable({ memberList }: MemberTableProps) {
  const headers = ['사번', '성명', '부서', '직무', '이메일'];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <table className="w-full">
        <colgroup>
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '35%' }} />
        </colgroup>
        <thead className={`w-full ${styles.header}`}>
          <tr>
            {headers?.map((header) => (
              <th key={header} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white w-full">
          {memberList && memberList?.length > 0 ? (
            memberList.map((member) => (
              <tr key={member.employeeId} className="text-sm">
                <td className={`${styles.tr} text-center`}>{member.employeeId}</td>
                <td className={`${styles.tr} text-center`}>
                  <DropDown
                    type="modal"
                    trigger={<button type="button">{member.name}</button>}
                    list={[
                      {
                        title: '쪽지 보내기',
                        icon: 'message',
                        onModalHandler,
                      },
                    ]}
                  />
                </td>
                <td className={`${styles.tr} text-center`}>{member.department}</td>
                <td className={`${styles.tr} text-center`}>{member.position}</td>
                <td className={`${styles.tr}`}>{member.email}</td>
                {isModalOpen && (
                  <Modal type="server" onClose={onModalHandler}>
                    <NoticeSendBox sendName={member.name} sendId={Number(member.employeeId)} />
                  </Modal>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center" style={{ height: '60px' }}>
                사원이 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;
