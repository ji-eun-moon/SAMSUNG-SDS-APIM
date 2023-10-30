import Image from 'next/image';
// import { CSVLink } from 'react-csv';
import ShadowCard from '@/components/atoms/ShadowCard';

export default function MemberAdd() {
  // const addMemberFormat = [['사번', '성명', '부서', '직무', '팀', '이메일', '직급', '사진주소']];
  const generateCSV = () => {
    const csvData = [
      ['사번', '성명', '부서', '직무', '팀', '이메일', '직급', '사진주소'],
      ['001', '홍길동', '개발팀', '개발자', '프론트엔드', 'hong@example.com', '대리', '/images/hong.jpg'],
      // 추가 데이터는 이곳에 추가합니다.
    ];

    const csvContent = `data:text/csv;charset=utf-8,${csvData.map((row) => row.join(',')).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'members.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="w-2/5 m-10">
      <ShadowCard type="big">
        <div className="p-5">
          <div>사원 생성을 위한 CSV 파일을 업로드 해주세요</div>
          <Image src="/images/upload.png" alt="upload-img" width={200} height={200} />
          멤버 등록 페이지
          <input type="file" accept=".csv" />
          {/* 클릭시 csv 파일 양식 다운로드 */}
          {/* <CSVLink data={addMemberFormat} filename="ITDA_회원생성(양식).csv">
            <div className={styles.format}>혹시 csv 파일 양식을 가지고 있지 않나요?</div>
          </CSVLink> */}
          <button type="button" onClick={generateCSV}>
            CSV 파일 생성 및 다운로드
          </button>
        </div>
      </ShadowCard>
    </div>
  );
}
