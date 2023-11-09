import LogoWithName from '@/components/atoms/LogoWithName';
import Input from '@/components/atoms/Input';
import { useState } from 'react';
import StyledButton from '@/components/atoms/StyledButton';
import { Spacer } from '@nextui-org/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { login } from '@/utils/axios/auth';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Modal from '@/components/organisms/Modal';
// import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const { mutate: doLogin } = useMutation(login, {
    onSuccess: () => {
      router.push(`/`);
    },
    onError: () => {
      setLoginAlert(true);
      setAlertMessage('사번, 비밀번호를 다시 확인해주세요.');
    },
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!employeeId) {
      setAlertMessage('사번을 입력해주세요.');
      setLoginAlert(true);
      return;
    }
    if (!password) {
      setAlertMessage('비밀번호를 입력해주세요.');
      setLoginAlert(true);
      return;
    }
    await doLogin({ employeeId, password });
  };

  return (
    <div className="py-16 pl-20 h-screen flex flex-col relative">
      {loginAlert && <Modal type="alert" alertMessage={alertMessage} onClose={() => setLoginAlert(false)} />}
      <div className="flex justify-start items-center gap-3">
        <LogoWithName size={40} textSize="text-3xl" />
        {/* <div className="flex items-center">
          <Image src="/icons/close.png" width={20} height={20} alt="samsung logo" />
        </div> */}
        {/* <div className="flex items-center">
          <Image src="/images/samsung_sds_logo.png" width={200} height={200} alt="samsung logo" />
        </div> */}
      </div>
      <Spacer y={20} />
      <div className="flex justify-center items-center grid grid-cols-2">
        <div className="col-span-1">
          <Slider dots autoplay infinite slidesToScroll={1} arrows={false}>
            <div className="bg-white h-96">
              <div className="font-bold text-4xl itdaBlue">API 관리</div>
            </div>
            <div className="bg-white h-96">소개 2</div>
            <div className="bg-white h-96">소개 3</div>
          </Slider>
        </div>
        {/* 로그인 폼 */}
        <div className="col-span-1">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col items-center px-52">
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
                <StyledButton label="로그인" radius="sm" variant="solid" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
