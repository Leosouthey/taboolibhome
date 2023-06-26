const TabooDrawer = () => {
  return (
    <div className="flex-none">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <li>
              <a href="https://github.com/TabooLib/adyeshach">Adyeshach</a>
            </li>
            <li>
              <a href="https://github.com/TabooLib/chemdah">Chemdah</a>
            </li>
            <div className="divider" />
            <li>
              <a href="https://kether.tabooproject.org">Kether</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabooDrawer;
