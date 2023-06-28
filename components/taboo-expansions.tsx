import useFormStore, { expansions } from "@/store/form";

const TabooExpansions = () => {
  const selectedExpansions = useFormStore((state) => state.expansions);
  const setExpansions = useFormStore((state) => state.setExpansions);
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl">
        附加组件<span> ({selectedExpansions.length})</span>
      </h1>
      <ul className="menu w-full p-0 mt-2">
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
                className={
                  selected
                    ? "flex items-center active mt-2"
                    : "flex items-center mt-2"
                }
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
