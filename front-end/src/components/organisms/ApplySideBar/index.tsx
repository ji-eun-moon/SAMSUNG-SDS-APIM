import SideBarMenu from '@/components/atoms/SideBarMenu';
import StyledButton from '@/components/atoms/StyledButton';
import SideBarBody from '@/components/atoms/SideBarBody';

import Modal from '@/components/organisms/Modal';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import SelectBox from '@/components/atoms/SelectBox';
import { useState } from 'react';
import style from './ApplySideBar.module.scss';

interface ApplySideBarProps {
  isUser: boolean;
}

function ApplySideBar({ isUser }: ApplySideBarProps) {
  const useCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apply/use/list' },
    { conditionId: '2', title: '대기 보기', url: '/apply/use/list?filter=대기' },
    { conditionId: '3', title: '승인 내역 보기', url: '/apply/use/list?filter=승인' },
    { conditionId: '4', title: '거절 내역 보기', url: '/apply/use/list?filter=거절' },
  ];

  const provideCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apply/provide/list' },
    { conditionId: '2', title: '대기 보기', url: '/apply/provide/list?filter=대기' },
    { conditionId: '3', title: '승인 내역 보기', url: '/apply/provide/list?filter=점검' },
    { conditionId: '4', title: '거절 내역 보기', url: '/apply/provide/list?filter=오류' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림 상태를 관리하는 상태 추가
  const [inputWord, setInputWord] = useState('');
  const [textWord, setTextWord] = useState('');
  const [endPoint, setEndPoint] = useState('');

  const onModalOpenHandler = () => {
    setIsModalOpen(!isModalOpen); // 모달을 열기 위해 상태를 true로 설정
  };
  const onSubmitHandler = () => {
    // 제공 신청 axois 불러오는 곳
  };

  return (
    <SideBarBody>
      <div className="my-5 text-xl font-bold mx-2">API 신청 내역</div>
      <div className="grid grid-cols-1 content-between h-full mb-5">
        <div>
          <SideBarMenu title="사용 신청 내역" conditionList={useCondition} />
          <SideBarMenu title="제공 신청 내역" conditionList={provideCondition} />
        </div>
        {isUser && (
          <StyledButton
            variant="solid"
            radius="full"
            label="제공 신청 하기"
            onClick={onModalOpenHandler}
            type="button"
          />
        )}
        {isModalOpen && ( // 모달이 열려있을 때만 렌더링
          <Modal
            type="custom"
            title="API 제공 신청"
            onClose={onModalOpenHandler}
            buttonLabel="신청하기"
            onButton={onSubmitHandler}
          >
            <div className={`${style.moduleContainer}`}>
              <div>
                <div className={`${style.inputTitle}`}>API 이름</div>
                <Input
                  backgroundColor="#ffffff"
                  isPassword={false}
                  inputWord={inputWord}
                  placeholder="API 이름"
                  onChange={setInputWord}
                />
              </div>
              <div>
                <div className={`${style.inputTitle}`}>API 설명</div>
                <TextArea
                  width="w-full"
                  backgroundColor="#ffffff"
                  textAreaWord={textWord}
                  placeholder="API 설명"
                  onChange={setTextWord}
                />
              </div>
              <div>
                <div className={`${style.inputTitle}`}>타겟 서버</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <SelectBox list={['http', 'https']} width="w-32" onClick={() => {}} />
                  <Input
                    backgroundColor="#ffffff"
                    isPassword={false}
                    inputWord={endPoint}
                    placeholder="API 이름"
                    onChange={setEndPoint}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </SideBarBody>
  );
}

export default ApplySideBar;
