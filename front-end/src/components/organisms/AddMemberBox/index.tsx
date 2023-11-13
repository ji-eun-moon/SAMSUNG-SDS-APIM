import React, { useState, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Papa from 'papaparse';
import { useRouter } from 'next/router';
import { HeaderMapping } from '@/types/User';
import { createMembers } from '@/utils/axios/user';
import ShadowCard from '@/components/atoms/ShadowCard';
import StyledButton from '@/components/atoms/StyledButton';
// import Modal from '@/components/organisms/Modal';
import RegisterTable from '@/components/atoms/RegisterTable';
import ToolTip from '@/components/atoms/ToolTip';
import styles from './AddMemberBox.module.scss';

// 파일 삭제 버튼
const Cancel = () => (
  <svg
    className="w-4 h-4 text-gray-400 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

export default function MemberAdd() {
  const router = useRouter();
  const [isActive, setActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [header, setHeader] = useState<string[]>([]);
  const [body, setBody] = useState<string[][]>([]);
  // const [modalContent, ]
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  // 드래그해서 파일 업로드
  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();

    const uploadedFile = event.dataTransfer.files[0];
    await setFile(uploadedFile);
    Papa.parse(uploadedFile, {
      encoding: 'EUC-KR',
      async complete(results: { data: string[][] }) {
        await setHeader(results.data[0] as string[]);
        const bodyData = results.data.slice(1);
        await setBody(bodyData);
      },
    });
  };

  // 클릭해서 파일 업로드
  const handleFileInputChange = (event: ChangeEvent) => {
    const uploadedFile = (event.target as HTMLInputElement).files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      Papa.parse(uploadedFile, {
        encoding: 'EUC-KR',
        async complete(results: { data: string[][] }) {
          await setHeader(results.data[0] as string[]);
          const bodyData = results.data.slice(1);
          await setBody(bodyData);
        },
      });
    }
  };

  // 파일 다운로드
  const downloadCSV = () => {
    const csvData = [
      ['사번', '성명', '부서', '직무', '팀', '이메일', '권한', '사진url'],
      ['231030', '김사원', 'IT 개발', '프론트엔드', '"1팀, 2팀"', 'ssafy.itda@gmail.com', '일반', 'url'],
    ];

    const csvContent = `data:text/csv;charset=utf-8,\uFEFF${csvData?.map((row) => row.join(',')).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ITDA_회원양식.csv');
    document.body.appendChild(link);
    link.click();
  };

  const headerMapping: HeaderMapping = {
    사번: 'employeeId',
    성명: 'name',
    사진url: 'imageUrl',
    권한: 'authority',
    부서: 'department',
    직무: 'position',
    이메일: 'email',
    팀: 'teamList',
  };

  function convertHeader(headers: (keyof HeaderMapping)[]): string[] {
    if (Array.isArray(headers)) {
      return headers?.map((head) => headerMapping[head] || head);
    }
    return headers;
  }

  const signUp = async () => {
    const headerList = await convertHeader(header as (keyof HeaderMapping)[]);
    const mappedData = await body
      ?.map((rowData) => {
        if (rowData.length === headerList.length) {
          return Object.fromEntries(
            headerList?.map((head, index) => {
              if (head === 'teamList') {
                if (rowData[index].includes(',')) {
                  const teams = rowData[index]?.split(',')?.map((team) => team.trim());
                  return [head, teams];
                }
                return [head, [rowData[index]]];
              }
              return [head, rowData[index]];
            }),
          );
        }
        return null;
      })
      .filter(Boolean);

    const res = await createMembers(mappedData);
    if (res === '회원등록이 완료되었습니다.') {
      router.push(`/member/list`);
    }
  };

  return (
    <ShadowCard type="big">
      {file && (
        <div className="px-10 py-6">
          <button type="button" onClick={() => setFile(null)} className={`${styles.fileName} flex items-center mb-4`}>
            <div className="mr-5 idtaText cursor-pointer">{file.name}</div>
            <Cancel />
          </button>
          <RegisterTable headerContent={header} bodyContent={body} height="400px" />
          <div className="mt-5 flex justify-end">
            <div className="w-36">
              <StyledButton type="button" variant="solid" label="회원 생성하기" radius="sm" onClick={() => signUp()} />
            </div>
          </div>
        </div>
      )}
      {!file && (
        <div className="px-12 py-8 h-full flex flex-col justify-between">
          <div className="pb-5">사원 생성을 위한 CSV 파일을 업로드 해주세요</div>
          <label
            htmlFor="fileDrag"
            className={`mb-5 ${styles.filebox} ${isActive ? 'active' : ''}`}
            onDragEnter={handleDragStart}
            onDragLeave={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Image src="/images/upload.png" alt="upload-img" width={200} height={200} />
            <div className={styles.fileBtn}>파일 선택</div>
            <div className="mb-2 text-gray-400">또는</div>
            <div className="itdaText">파일을 여기로 드래그합니다</div>
            <input type="file" accept=".csv" id="fileDrag" className={styles.file} onChange={handleFileInputChange} />
          </label>
          <div className="flex">
            <button type="button" onClick={downloadCSV} className={`${styles.download} mr-2`}>
              혹시 CSV 파일 양식을 가지고 있지 않나요?
            </button>
            <ToolTip>
              <div className="text-sm text-gray-500">
                <div>권한은 &apos;일반&apos; 또는 &apos;관리자&apos;로 구분하여 입력하시면 됩니다.</div>
                <div>여러 팀에 소속된 경우 팀에 &apos; , &apos; 기호로 구분하여 적으시면 됩니다.</div>
              </div>
            </ToolTip>
          </div>
        </div>
      )}
    </ShadowCard>
  );
}
