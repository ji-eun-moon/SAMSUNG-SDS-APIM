import React from 'react';

function AdminMainBox() {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-baseline">
          <div className="itdaText text-lg mr-3">사원 정보 조회</div>
          <div className="itdaSecondary text-sm">사원 이름 클릭시 자세한 정보 확인 및 쪽지 전송이 가능합니다</div>
        </div>
      </div>
    </div>
  );
}

export default AdminMainBox;
