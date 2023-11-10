import { INotice } from '@/types/Notice';

interface MainNoticeProps {
  notice: INotice;
}
function MainNotice({ notice }: MainNoticeProps) {
  return (
    <div className="w-full flex">
      <div>{notice.title}</div>
    </div>
  );
}

export default MainNotice;
