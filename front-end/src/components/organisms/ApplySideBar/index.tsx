import SideBarMenu from '@/components/atoms/SideBarMenu';
import StyledButton from '@/components/atoms/StyledButton';
import SideBarBody from '@/components/atoms/SideBarBody';
import { useRouter } from 'next/router';
import Modal from '@/components/organisms/Modal';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import CustomSelect from '@/components/atoms/CustomSelect';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { IUser } from '@/types/User';
import { getUserInfo } from '@/utils/axios/user';
import useUserStore from '@/store/useUserStore';
import { postProvideApply } from '@/utils/axios/apply';
// import { useRouter } from 'next/router';
import { noticeAdmin } from '@/utils/axios/notice';
import style from './ApplySideBar.module.scss';

interface ApplySideBarProps {
  isUser: boolean;
}

function ApplySideBar({ isUser }: ApplySideBarProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery<IUser>('userInfo', getUserInfo);
  const useCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apply/use/list' },
    { conditionId: '2', title: '대기 내역 보기', url: '/apply/use/list?filter=대기' },
    { conditionId: '3', title: '승인 내역 보기', url: '/apply/use/list?filter=승인' },
    { conditionId: '4', title: '거절 내역 보기', url: '/apply/use/list?filter=거절' },
  ];

  const provideCondition = [
    { conditionId: '1', title: '전체 보기', url: '/apply/provide/list' },
    { conditionId: '2', title: '대기 내역 보기', url: '/apply/provide/list?filter=대기' },
    { conditionId: '3', title: '승인 내역 보기', url: '/apply/provide/list?filter=승인' },
    { conditionId: '4', title: '거절 내역 보기', url: '/apply/provide/list?filter=거절' },
  ];

  let newUseCondition = useCondition;
  let newProvideCondition = provideCondition;

  if (userInfo && userInfo.authority === '관리자') {
    newUseCondition = useCondition.map((condition) => ({
      ...condition,
      url: condition.url.replace('/apply/use/list', '/admin/useApplyList'),
    }));

    newProvideCondition = provideCondition.map((condition) => ({
      ...condition,
      url: condition.url.replace('/apply/provide/list', '/admin/provideApplyList'),
    }));
  }

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림 상태를 관리하는 상태 추가
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [target, setTarget] = useState('http');
  const [nameAlert, setNameAlert] = useState<boolean>(false);
  const [descriptionAlert, setDescriptionAlert] = useState<boolean>(false);
  const [endpointerAlert, setEndpointAlert] = useState<boolean>(false);

  const onModalOpenHandler = () => {
    setIsModalOpen(!isModalOpen);
    setNameAlert(false);
    setDescriptionAlert(false);
    setEndpointAlert(false);
    setServerName('');
    setServerDescription('');
    setEndPoint('');
  };

  const { selectedTeam } = useUserStore();

  const { mutate: provideApply } = useMutation(postProvideApply, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([`provideApplyList${selectedTeam}`]);
      noticeAdmin({ applyName: '제공', teamName: selectedTeam, categoryName: serverName });
      onModalOpenHandler();
      router.push(`/apply/provide/list`);
    },
  });

  const onSubmitHandler = async () => {
    if (!serverName) {
      setNameAlert(true);
      return;
    }
    if (!serverDescription) {
      setDescriptionAlert(true);
      return;
    }
    if (!endPoint) {
      setEndpointAlert(true);
      return;
    }
    await provideApply({
      teamName: selectedTeam,
      serverName,
      description: serverDescription,
      endpoint: `${target}://${endPoint}`,
    });
  };

  const onTargetHandler = (e: string) => {
    setTarget(e);
  };

  return (
    <div>
      <SideBarBody>
        <div className="my-5 text-xl font-bold mx-2">신청 내역</div>
        <div className="grid grid-cols-1 content-between h-full mb-5">
          {userInfo?.authority === '관리자' ? (
            <div>
              <SideBarMenu title="사용 신청 내역" conditionList={newUseCondition} />
              <SideBarMenu title="제공 신청 내역" conditionList={newProvideCondition} />
            </div>
          ) : (
            <div>
              <SideBarMenu title="사용 신청 내역" conditionList={useCondition} />
              <SideBarMenu title="제공 신청 내역" conditionList={provideCondition} />
            </div>
          )}
          {isUser && userInfo?.authority !== '관리자' && (
            <StyledButton
              variant="solid"
              radius="full"
              label="제공 신청 하기"
              onClick={onModalOpenHandler}
              type="button"
            />
          )}
        </div>
      </SideBarBody>
      {isModalOpen && ( // 모달이 열려있을 때만 렌더링
        <div className={`${style.modalContainer}`}>
          <Modal
            type="custom"
            title="서버 제공 신청"
            onClose={onModalOpenHandler}
            buttonLabel="신청하기"
            onButton={onSubmitHandler}
          >
            <div className={`${style.moduleContainer}`}>
              <div>
                <div className={`${style.inputTitle}`}>
                  <div>서버 이름</div>
                  {nameAlert && !serverName && (
                    <div className="text-sm itdaDanger m2-5 ml-1" style={{ backgroundColor: '#fff' }}>
                      * 서버 이름은 필수 값입니다.
                    </div>
                  )}
                </div>
                <Input
                  backgroundColor="#ffffff"
                  isPassword={false}
                  inputWord={serverName}
                  placeholder="서버 이름"
                  onChange={setServerName}
                />
              </div>
              <div>
                <div className={`${style.inputTitle}`}>
                  <div>서버 설명</div>
                  {descriptionAlert && !serverDescription && (
                    <div className="text-sm itdaDanger m2-5 ml-1" style={{ backgroundColor: '#fff' }}>
                      * 서버 설명은 필수 값입니다.
                    </div>
                  )}
                </div>
                <TextArea
                  width="w-full"
                  backgroundColor="#ffffff"
                  textAreaWord={serverDescription}
                  maxLength={255}
                  placeholder="서버 설명 (최대 255자)"
                  onChange={setServerDescription}
                />
              </div>
              <div>
                <div className={`${style.inputTitle}`}>
                  <div>타겟 서버</div>
                  {endpointerAlert && !endPoint && (
                    <div className="text-sm itdaDanger m2-5 ml-1" style={{ backgroundColor: '#fff' }}>
                      * 타겟 서버는 필수 값입니다.
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '7px' }}>
                  <div className="w-40">
                    <CustomSelect
                      items={['http', 'https']}
                      value={target}
                      fontSize="15px"
                      height="39px"
                      onChange={(e) => {
                        onTargetHandler(e);
                      }}
                    />
                  </div>
                  <Input
                    backgroundColor="#ffffff"
                    isPassword={false}
                    inputWord={endPoint}
                    placeholder="타겟 서버"
                    onChange={setEndPoint}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default ApplySideBar;
