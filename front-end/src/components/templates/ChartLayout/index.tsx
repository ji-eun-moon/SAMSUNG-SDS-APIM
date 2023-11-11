function ChartLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div>
      {/* Go Back */}
      {children && children[0]}
      <div className="flex flex-col gap-4 my-5">
        <div className="flex w-full gap-2">
          <div className="w-1/2">
            {/* 사용량 */}
            {children && children[1]}
          </div>
          <div className="w-1/2">
            {/* 응답 시간 */}
            {children && children[2]}
          </div>
        </div>
        {/* 응답 코드 */}
        {children && children[3]}
      </div>
    </div>
  );
}

export default ChartLayout;
