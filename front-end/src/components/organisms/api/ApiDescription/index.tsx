import { useEffect, useState } from 'react';
import Modal from '@/components/organisms/Modal';
import TextArea from '@/components/atoms/TextArea';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledButton from '@/components/atoms/StyledButton';
import { useRouter } from 'next/router';
import useUserStore from '@/store/useUserStore';
import useUseApply from '@/hooks/useUseApply';
import { submitUseApply } from '@/utils/axios/apply';
import { useMutation } from 'react-query';
import { DescriptionProps, ApiProps } from '@/types/props/DescriptionProps';
import Link from 'next/link';

function ApiDescription({ type, categoryId, content, categoryName, ...props }: DescriptionProps) {
  const { selectedTeam } = useUserStore();
  const { canApply, checkCanApply } = useUseApply({ categoryId, teamName: selectedTeam });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [textWord, setTextWord] = useState('');

  const mutation = useMutation('submitUseApply', submitUseApply, {
    onSuccess: () => {
      setIsModalOpen(false);
      setTextWord('');
      setIsAlertOpen(true);
    },
  });

  const closeModal = () => {
    setTextWord('');
    setIsModalOpen(false);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const useApplySubmit = async () => {
    await mutation.mutate({ teamName: selectedTeam, content: textWord, categoryId });
  };

  useEffect(() => {
    checkCanApply();
  }, [categoryId, selectedTeam, checkCanApply]);

  if (type === 'api') {
    const { apiId } = props as ApiProps;
    return (
      <div>
        <ShadowCard type="small">
          <div className="flex flex-col m-2">
            <div>{content}</div>
            <div className="flex justify-end gap-2">
              {canApply ? (
                <div className="w-fit">
                  <StyledButton
                    type="button"
                    label="사용 신청"
                    radius="lg"
                    variant="solid"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
              ) : (
                <div className="w-fit">
                  <StyledButton
                    type="button"
                    label="토큰 확인"
                    radius="lg"
                    variant="solid"
                    onClick={() => router.push({ pathname: '/team/token', query: { category: categoryName } })}
                  />
                </div>
              )}
              <div className="w-fit">
                <StyledButton
                  type="button"
                  label="API 테스트"
                  radius="lg"
                  variant="solid"
                  onClick={() => router.push(`/apis/test/${apiId}`)}
                />
              </div>
            </div>
          </div>
        </ShadowCard>
        {isModalOpen && (
          <Modal
            type="custom"
            title="API 사용 신청"
            onClose={closeModal}
            buttonLabel="신청하기"
            onButton={useApplySubmit}
          >
            <div className="itdaSecondary text-sm">
              <div>· 카테고리 단위로 신청됩니다.</div>
            </div>
            <div className="my-3" style={{ width: '500px' }}>
              <TextArea
                width="w-full"
                backgroundColor="#ffffff"
                textAreaWord={textWord}
                maxLength={255}
                placeholder="신청 내용을 입력하세요. (최대 255자)"
                onChange={setTextWord}
              />
            </div>
          </Modal>
        )}
        {isAlertOpen && (
          <Modal type="custom" buttonLabel="확인" onClose={closeAlert} onButton={closeAlert} title="">
            <div className="my-3">
              <div className="font-semibold text-lg">사용 신청이 완료 되었습니다.</div>
              <div className="flex my-3">
                <Link href="/apply/use/list">
                  <div className="itdaSecondary underline cursor-pointer">☞ 신청 내역으로 이동하기</div>
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
  return (
    <div>
      <ShadowCard type="small">
        <div className="flex flex-col m-2">
          <div>{content}</div>
          <div className="flex justify-end gap-2">
            {canApply ? (
              <div className="w-fit">
                <StyledButton
                  type="button"
                  label="사용 신청"
                  radius="lg"
                  variant="solid"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            ) : (
              <div className="w-fit">
                <StyledButton
                  type="button"
                  label="토큰 확인"
                  radius="lg"
                  variant="solid"
                  onClick={() => router.push({ pathname: '/team/token', query: { category: categoryName } })}
                />
              </div>
            )}
          </div>
        </div>
      </ShadowCard>
      {isModalOpen && (
        <Modal
          type="custom"
          title="API 사용 신청"
          onClose={closeModal}
          buttonLabel="신청하기"
          onButton={useApplySubmit}
        >
          <div className="itdaSecondary text-sm">
            <div>· 카테고리 단위로 신청됩니다.</div>
          </div>
          <div className="my-3" style={{ width: '500px' }}>
            <TextArea
              width="w-full"
              backgroundColor="#ffffff"
              textAreaWord={textWord}
              placeholder="신청 내용을 입력하세요."
              onChange={setTextWord}
            />
          </div>
        </Modal>
      )}
      {isAlertOpen && (
        <Modal type="custom" buttonLabel="확인" onClose={closeAlert} onButton={closeAlert} title="">
          <div className="my-3">
            <div className="font-semibold text-lg">사용 신청이 완료 되었습니다.</div>
            <div className="flex my-3">
              <Link href="/apply/use/list">
                <div className="itdaSecondary underline cursor-pointer flex items-center">
                  {/* <svg
                    className="w-3 h-3 text-gray-400 dark:text-white ml-2 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                    
                  </svg> */}
                  <svg
                    className="w-4 h-4 text-gray-400 dark:text-white ml-2 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"
                    />
                  </svg>
                  <span>신청 내역으로 이동하기</span>
                </div>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ApiDescription;
