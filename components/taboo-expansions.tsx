import useFormStore, { expansions } from "@/store/form";

const TabooExpansions = () => {
  const selectedExpansions = useFormStore((state) => state.expansions);
  const setExpansions = useFormStore((state) => state.setExpansions);

  const itemsClasses =
    "flex items-center w-full px-2 h-8 rounded-md cursor-pointer transition-all mb-2 hover:bg-[#E2E9F1FF] hover:text-black";
  const selectedClasses =
    "flex items-center w-full px-2 h-8 rounded-md cursor-pointer transition-all mb-2 bg-light-taboo text-white hover:bg-light-taboo hover:text-white";
  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl">
        附加组件<span> ({selectedExpansions.length})</span>
      </div>
      <ul className="w-full p-0 mt-4">
        {expansions.map((item, key) => {
          const selected =
            selectedExpansions.find(
              (expansion) => expansion.realName === item.realName
            ) !== undefined;
          return (
            <li key={key}>
              <a
                onClick={() => {
                  if (selected) {
                    setExpansions(
                      selectedExpansions.filter(
                        (expansion) => expansion.realName !== item.realName
                      )
                    );
                  } else {
                    setExpansions([...selectedExpansions, item]);
                  }
                }}
                className={selected ? selectedClasses : itemsClasses}
              >
                <div className="flex-1">{item.nickName}</div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabooExpansions;
