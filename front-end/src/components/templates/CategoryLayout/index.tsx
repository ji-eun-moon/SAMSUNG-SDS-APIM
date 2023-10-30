function CategoryLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div>
      {/* 카테고리 이름 */}
      <div>{children && children[0]}</div>
      {/* 카테고리 설명 */}
      <div className="my-5">{children && children[1]}</div>
      {/* API 리스트 */}
      <div>{children && children[2]}</div>
    </div>
  );
}

export default CategoryLayout;
