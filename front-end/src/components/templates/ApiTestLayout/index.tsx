function ApiTestLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="my-5">
      {/* Request */}
      <div className="itdaBlue font-semibold text-xl">REQUEST</div>
      {/* Headers */}
      <div className="my-3">{children && children[0]}</div>
      {/* 쿼리 입력 표 */}
      <div>{children && children[1]}</div>
      {/* 요청 예시 */}
      <div>{children && children[2]}</div>
      <div className="mt-5">
        {/* Response */}
        <div className="itdaBlue font-semibold text-xl">RESPONSE</div>
        {/* 상태 */}
        <div className="my-3">{children && children[3]}</div>
        {/* 응답 결과 */}
        <div>{children && children[4]}</div>
      </div>
    </div>
  );
}

export default ApiTestLayout;
