function ApiDetailLayout({ children }: { children: React.ReactNode[] }) {
  return (
    <div>
      {/* Content */}
      <div className="my-5">{children && children[0]}</div>
      {/* EndPoint */}
      <div className="my-5">{children && children[1]}</div>
      <div className="itdaBlue font-semibold text-lg">REQUEST</div>
      {/* Parameters / RequestBody */}
      <div className="flex w-full gap-4">
        <div className="my-2 w-1/2">{children && children[2]}</div>
        <div className="my-2 w-1/2">{children && children[3]}</div>
      </div>
      <div className="itdaBlue font-semibold text-lg">RESPONSE</div>
      <div className="flex w-full gap-4">
        {/* Output */}
        <div className="my-2 w-1/2">{children && children[4]}</div>
        {/* Output Example */}
        <div className="my-2 w-1/2">{children && children[5]}</div>
      </div>
    </div>
  );
}

export default ApiDetailLayout;
