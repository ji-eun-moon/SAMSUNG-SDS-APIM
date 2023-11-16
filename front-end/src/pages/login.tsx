// import LogoWithName from '@/components/atoms/LogoWithName';
import Input from '@/components/atoms/Input';
import { useState } from 'react';
// import StyledButton from '@/components/atoms/StyledButton';
import { Button } from '@nextui-org/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Slider from 'react-slick';
import { login } from '@/utils/axios/auth';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Image from 'next/image';
import style from '@/styles/login.module.scss';

export default function Login() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [idAlert, setIdAlert] = useState<boolean>(false);
  const [passwordAlert, setPasswordAlert] = useState<boolean>(false);
  const { mutate: doLogin } = useMutation(login, {
    onSuccess: () => {
      router.push(`/`);
    },
    onError: () => {
      setIdAlert(false);
      setPasswordAlert(false);
      setEmployeeId('');
      setPassword('');
      setLoginAlert(true);
    },
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!employeeId) {
      setPasswordAlert(false);
      setLoginAlert(false);
      setIdAlert(true);
      return;
    }
    if (!password) {
      setIdAlert(false);
      setLoginAlert(false);
      setPasswordAlert(true);
      return;
    }
    await doLogin({ employeeId, password });
  };

  return (
    <div
      className={`h-screen flex flex-col ${style.container}`}
      style={{ position: 'relative', justifyContent: 'center' }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'url(/images/logina.png)',
          backgroundSize: 'contain',
          filter: 'brightness(0.7)',
        }}
      />

      <div className={`${style.login}`}>
        {/* 로그인 폼 */}
        <div className="col-span-1" style={{ position: 'relative', zIndex: '1' }}>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col items-center px-8 py-10">
              {/* <div className="itdaBlue flex flex-col text-5xl font-bold">LOGIN</div> */}
              <div className="flex items-center mb-10">
                <Image src="/images/samsung_sds_logo_2.png" width={250} height={250} alt="samsung logo" />
              </div>
              <div className="mt-5">
                <p className="itdaText font-medium text-lg">사번</p>
                <div className="w-96">
                  <Input
                    placeholder="사번을 입력하세요"
                    isPassword={false}
                    inputWord={employeeId}
                    onChange={setEmployeeId}
                  />
                </div>
                {idAlert && (
                  <div className="text-sm itdaDanger mt-1 ml-1" style={{ backgroundColor: '#fff' }}>
                    사번을 입력하세요
                  </div>
                )}
              </div>
              <div className="mt-5">
                <p className="itdaText font-medium text-lg">비밀번호</p>
                <div className="w-96">
                  <Input
                    placeholder="비밀번호를 입력하세요"
                    isPassword
                    inputWord={password}
                    onChange={setPassword}
                    backgroundColor="#ffffffd7"
                  />
                </div>
                {passwordAlert && (
                  <div className="text-sm itdaDanger mt-1 ml-1" style={{ backgroundColor: '#fff' }}>
                    비밀번호를 입력하세요
                  </div>
                )}
                {loginAlert && (
                  <div className="text-sm itdaDanger flex flex-col justify-start mt-2 ml-1">
                    <div>아이디 또는 비밀번호를 잘못 입력했습니다.</div>
                    <div>입력하신 내용을 다시 확인해주세요.</div>
                  </div>
                )}
              </div>
              <div className="w-96 mt-8">
                <Button
                  type="submit"
                  className="w-full text-white py-2 px-4 rounded-md"
                  style={{ backgroundColor: '#17468f' }}
                >
                  로그인
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
