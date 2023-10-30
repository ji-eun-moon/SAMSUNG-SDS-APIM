import LogoWithName from '@/components/atoms/LogoWithName';
import Input from '@/components/atoms/Input';
import { useState } from 'react';
import StyledButton from '@/components/atoms/StyledButton';
import { Spacer } from '@nextui-org/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Copy from '@/components/atoms/Copy';

export default function Login() {
  const [employeeId, setEmployeeId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    // 로그인 로직 작성
  };

  return (
    <div className="my-16 mx-20">
      <div className="flex justify-start">
        <LogoWithName size={65} textSize="text-4xl" />
      </div>
      <Spacer y={10} />
      <div className="flex items-center">
        <div className="w-1/2">
          <Slider dots autoplay infinite slidesToScroll={1} arrows={false}>
            <div className="bg-blue-100 h-96">ITDA 1</div>
            <div className="bg-blue-100 h-96">ITDA 2</div>
            <div className="bg-blue-100 h-96">ITDA 3</div>
          </Slider>
        </div>
        {/* 로그인 폼 */}
        <div className="flex flex-col w-full items-center px-52">
          <div className="itdaBlue flex flex-col text-5xl font-bold">LOGIN</div>
          <div className="mt-5">
            <p className="itdaText font-medium text-lg">사번</p>
            <div className="w-96">
              <Input placeholder="사번" isPassword={false} inputWord={employeeId} onChange={setEmployeeId} />
            </div>
          </div>
          <div className="mt-5">
            <p className="itdaText font-medium text-lg">비밀번호</p>
            <div className="w-96">
              <Input placeholder="비밀번호" isPassword inputWord={password} onChange={setPassword} />
            </div>
          </div>
          <div className="w-96 mt-8">
            <StyledButton label="로그인" radius="sm" variant="solid" onClick={handleLogin} />
          </div>
        </div>
      </div>

      <div className="my-20 flex items-center border p-3 justify-between rounded-md font-normal">
        <div>양시온 문지은 박서희 송아람 이도하 이찬웅</div>
        <div>삼성 SDS 기업 연계 SSAFY 자율 프로젝트</div>
        <div className="flex items-center gap-2">
          <div>사용 문의 : ssafy.itda@gmail.com</div>
          <Copy copyText="ssafy.itda@gmail.com" />
        </div>
      </div>
    </div>
  );
}
