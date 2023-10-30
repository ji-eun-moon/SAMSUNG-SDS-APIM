// import SideLayout from '@/components/templates/SideLayout';
// import ShadowCard from '@/components/atoms/ShadowCard';
// import Image from 'next/image';
import '@/styles/MainPage.scss';
// import { IUser } from '@/types/User';

export default function Home() {
  return (
    <main>
      {/* <SideLayout userInfo={IUser}> */}
      <div>
        <p>바로가기</p>
        {/* <div className="page">
          <ShadowCard type="small">
            <div className="imgContainer">
              <Image src="/images/myAPI.png" alt="next-icon" width={10} height={10} className="iconImg" />
            </div>
          </ShadowCard>
          <ShadowCard type="small">
            <Image src="/images/chart.png" alt="next-icon" width={10} height={10} className="iconImg" />
          </ShadowCard>
          <ShadowCard type="small">
            <Image src="/images/monitoring.png" alt="next-icon" width={10} height={10} className="iconImg" />
          </ShadowCard>
          <ShadowCard type="small">
            <Image src="/images/applyList.png" alt="next-icon" width={10} height={10} className="iconImg" />
          </ShadowCard>
          <ShadowCard type="small">
            <Image src="/images/APIList.png" alt="next-icon" width={10} height={10} className="iconImg" />
          </ShadowCard>
        </div> */}
      </div>
      {/* </SideLayout> */}
    </main>
  );
}
