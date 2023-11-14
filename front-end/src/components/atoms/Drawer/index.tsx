import useDrawerStore from '@/store/useDrawerStore';

interface Props {
  children: React.ReactNode;
}

function Drawer({ children }: Props) {
  const { isDrawerOpen, toggleDrawer } = useDrawerStore();

  return (
    <div className="flex">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="relative sr-only peer"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="drawer-toggle"
        className="cursor-pointer absolute top-0.5 left-0 inline-block p-3 transition-all duration-500 bg-white border-2 rounded-lg peer-checked:rotate-180 peer-checked:left-52"
      >
        <div className="w-3 h-0.5 mb-1.5 -rotate-45 bg-gray-400 rounded-lg" />
        <div className="w-3 h-0.5 rotate-45 bg-gray-400 rounded-lg" />
      </label>
      <div className="fixed top-0 left-0 z-20 w-52 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
        <div className="pt-16 pl-2">{children}</div>
      </div>
    </div>
  );
}

export default Drawer;
