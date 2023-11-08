function ServerLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="my-5">
      {/* Request */}
      
      {/* Headers */}
      <div>{children && children[0]}</div>
      {/* 쿼리 입력 표 */}
      <div>{children && children[1]}</div>
      {/* 요청 예시 */}
      <div>{children && children[2]}</div>
    </div>
  );
}

export default ServerLayout;
