import { useEffect, useState } from 'react';
import Modal from '@/components/organisms/Modal';
import TextArea from '@/components/atoms/TextArea';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledButton from '@/components/atoms/StyledButton';
import { useRouter } from 'next/router';
import useUserStore from '@/store/useUserStore';
import useUseApply from '@/hooks/useUseApply';
import { submitUseApply } from '@/utils/axios/apply';
import { DescriptionProps, ApiProps } from '@/types/props/DescriptionProps';
import { useMutation } from 'react-query';
import Link from 'next/link';

function ApiDescription({ type, categoryId, content, ...props }: DescriptionProps) {
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
              {canApply && (
                <div className="w-fit">
                  <StyledButton
                    type="button"
                    label="사용 신청하기"
                    radius="lg"
                    variant="solid"
                    onClick={() => setIsModalOpen(true)}
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
            {canApply && (
              <div className="w-fit">
                <StyledButton
                  type="button"
                  label="사용 신청하기"
                  radius="lg"
                  variant="solid"
                  onClick={() => setIsModalOpen(true)}
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
                <div className="itdaSecondary underline cursor-pointer">☞ 신청 내역으로 이동하기</div>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ApiDescription;
