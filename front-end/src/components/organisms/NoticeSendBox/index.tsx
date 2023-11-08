import React, { useState } from 'react';
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
  memberId: number;
}

function NoticeSendBox() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [members, setMembers] = useState<SelectType[]>([]);
  const [searchMembers, setSearchMembers] = useState<TSearchMembers>([]);
  const [input, setInput] = useState('');

  const onSubmitHandler = async () => {
    if (title && content && members) {
      const memberIds = members.map((member) => member.memberId);
      await sendNotice({ memberIds, title, content });
      router.push('/notice/send');
    }
  };

  const onSelectHandler = (data: SelectType) => {
    setMembers((prev) => {
      const { memberId } = data;
      if (prev.some((item) => item.memberId === memberId)) {
        return prev.filter((item) => item.memberId !== memberId);
      }
      return [...prev, data];
    });

    setSearchMembers([]);
  };

  const onSearchHandler = async () => {
    const res = await searchMember(input);
    setInput('');
    await setSearchMembers(res);
  };

  const removeMember = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.memberId !== memberId));
  };

  return (
    <div className="mt-8 ml-8">
      <ShadowCard type="big">
        <div className="py-4 px-6 itdaText">
          <div className="flex items-center mb-1">
            <div className="w-3/12 font-medium">제목</div>
            <Input inputWord={title} placeholder="제목을 입력하세요" onChange={setTitle} isPassword={false} />
          </div>
          <div className="flex items-center mb-2">
            <div className="w-3/12 font-medium">받는 사람</div>
            <div className="w-full">
              <SearchBar
                keyword={input}
                placeholder="받는 사람의 이름을 검색하세요"
                onChange={setInput}
                onSearchHandler={onSearchHandler}
              />
              {searchMembers.length > 0 && (
                <div style={{ position: 'absolute', zIndex: 1 }} className="w-3/12">
                  <Listbox
                    className="w-full bg-white border border-gray-300 rounded"
                    style={{ maxHeight: '400px', overflowY: 'auto' }}
                  >
                    {searchMembers.map((member) => (
                      <ListboxItem
                        key={member.memberId}
                        onClick={() => onSelectHandler({ name: member.name, memberId: member.memberId })}
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            <ProfileImg src={member.imageUrl} width={35} height={35} />
                          </div>
                          <div className="flex flex-col">
                            <div>{member.name}</div>
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
            <div className="mb-2 w-3/12 font-medium">내용</div>
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
            <div className="w-2/12">
              <StyledButton variant="solid" onClick={onSubmitHandler} label="쪽지 보내기" radius="full" type="button" />
            </div>
          </div>
        </div>
      </ShadowCard>
    </div>
  );
}

export default NoticeSendBox;
