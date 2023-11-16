import React from 'react';

function StatusExplain() {
  return (
    <div className="itdaSecondary text-sm mt-3 flex flex-col gap-1">
      <div>· 30분 단위로 API를 테스트 합니다.</div>
      <div>· 테스트 대상 API의 실시간 성공 여부, 응답 시간 등을 확인할 수 있습니다.</div>
      <div>· 일부 API는 테스트 결과가 제공되지 않습니다.</div>
    </div>
  );
}

export default StatusExplain;
