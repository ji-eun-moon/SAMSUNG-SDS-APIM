import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { sendNotice, searchMember } from '@/utils/axios/notice';
import { TSearchMembers } from '@/types/User';
import { Listbox, ListboxItem } from '@nextui-org/react';
import Input from '@/components/atoms/Input';
import StyledButton from '@/components/atoms/StyledButton';
import TextArea from '@/components/atoms/TextArea';
import SearchBar from '@/components/atoms/SearchBar';
import ShadowCard from '@/components/atoms/ShadowCard';
import ProfileImg from '@/components/atoms/ProfileImg';
import MemberName from '@/components/atoms/MemberName';

interface SelectType {
  name: string;
  employeeId: string;
}

interface MemberType {
  name: string;
  memberId: string;
}
interface NoticeSendBoxProps {
  sendName?: string;
  sendId?: string;
}

function NoticeSendBox({ sendName, sendId }: NoticeSendBoxProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [members, setMembers] = useState<MemberType[]>([]);
  const [searchMembers, setSearchMembers] = useState<TSearchMembers>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (sendName && sendId && sendName !== '' && sendId !== '0') {
      setMembers([{ name: sendName, memberId: sendId }]);
    }
  }, [sendName, sendId]);

  const onSubmitHandler = async () => {
    if (title && content && members) {
      const employeeIds = members.map((member) => member.memberId);
      const res = await sendNotice({ employeeIds, title, content });
      if (res === '쪽지 보내는거 성공') {
        router.push('/notice/send');
      }
    }
  };

  const onSelectHandler = (data: SelectType) => {
    setMembers((prev) => {
      const { employeeId } = data;
      if (prev.some((item) => item.memberId === employeeId)) {
        return prev.filter((item) => item.memberId !== employeeId);
      }
      return [...prev, { name: data.name, memberId: data.employeeId }];
    });

    setSearchMembers([]);
  };

  const onSearchHandler = async () => {
    const res = await searchMember(input);
    setInput('');
    await setSearchMembers(res);
  };

  const removeMember = (memberId: string) => {
    setMembers((prev) => prev.filter((member) => member.memberId !== memberId));
  };

  return (
    <ShadowCard type="big">
      <div className="my-2 mx-4 p-2 sitdaText flex flex-col justify-start" style={{ width: '30vw' }}>
        <div className="flex items-center mb-1">
          <div className="flex w-3/12 font-medium">제목</div>
          <Input inputWord={title} placeholder="제목을 입력하세요" onChange={setTitle} isPassword={false} />
        </div>
        <div className="flex items-center mb-2">
          <div className="flex w-3/12 font-medium">받는 사람</div>
          <div className="w-full">
            <SearchBar
              keyword={input}
              placeholder="받는 사람의 이름을 검색하세요"
              onChange={setInput}
              onSearchHandler={onSearchHandler}
            />
            {searchMembers.length > 0 && (
              <div style={{ position: 'absolute', zIndex: 1, width: '68%' }}>
                <Listbox
                  className="w-full bg-white border border-gray-300 rounded"
                  style={{ maxHeight: '250px', overflowY: 'auto' }}
                >
                  {searchMembers.map((member) => (
                    <ListboxItem
                      key={member.employeeId}
                      onClick={() => onSelectHandler({ name: member.name, employeeId: member.employeeId })}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <ProfileImg src={member.imageUrl} width={35} height={35} />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex">{member.name}</div>
                          <div className="flex text-xs itdaSecondary">
                            <div>{member.department}</div>
                            <div>&nbsp;|&nbsp;</div>
                            <div>{member.position}</div>
                          </div>
                        </div>
                      </div>
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center mb-1">
          <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20%' }}>
            {members?.map((member) => (
              <span className="flex">
                <MemberName
                  name={member.name}
                  memberId={member.memberId}
                  onClick={() => removeMember(member.memberId)}
                />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex mb-2 w-3/12 font-medium">내용</div>
          <div>
            <TextArea
              textAreaWord={content}
              placeholder="내용을 입력하세요"
              onChange={setContent}
              width="w-full"
              height="h-64"
            />
          </div>
        </div>
        <div className="w-full flex justify-end mt-4">
          <div className="w-3/12">
            <StyledButton variant="solid" onClick={onSubmitHandler} label="쪽지 보내기" radius="full" type="button" />
          </div>
        </div>
      </div>
    </ShadowCard>
  );
}

NoticeSendBox.defaultProps = {
  sendName: '',
  sendId: 0,
};
export default NoticeSendBox;
