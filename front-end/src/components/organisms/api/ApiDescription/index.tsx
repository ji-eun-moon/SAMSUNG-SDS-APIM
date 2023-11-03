import { useState } from 'react';
import Modal from '@/components/organisms/Modal';
import TextArea from '@/components/atoms/TextArea';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledButton from '@/components/atoms/StyledButton';
import { useRouter } from 'next/router';

interface Props {
  content: string;
  apiId: number;
}

function ApiDescription({ content, apiId }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textWord, setTextWord] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const useApplySubmit = () => {
    // 사용 신청 로직
  };

  return (
    <div>
      <ShadowCard type="small">
        <div className="flex flex-col m-2">
          <div>{content}</div>
          <div className="flex justify-end gap-2">
            <div className="w-fit">
              <StyledButton
                type="button"
                label="사용 신청하기"
                radius="lg"
                variant="solid"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
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
    </div>
  );
}

export default ApiDescription;
