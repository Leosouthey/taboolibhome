import useFormStore, { platforms } from "@/store/form";

const TabooPlatform = () => {
  const selectedPlatforms = useFormStore((state) => state.platforms);
  const setPlatforms = useFormStore((state) => state.setPlatforms);

  const itemsClasses =
    "flex items-center w-full px-2 h-8 rounded-md cursor-pointer transition-all mb-2 hover:bg-card-item hover:text-black";
  const selectedClasses =
    "flex items-center w-full px-2 h-8 rounded-md cursor-pointer transition-all mb-2 bg-light-taboo text-white hover:bg-light-taboo hover:text-white";
  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl">
        运行平台<span> ({selectedPlatforms.length})</span>
      </div>
      <ul className="w-full p-0 mt-4">
        {platforms.map((item, key) => {
          const selected =
            selectedPlatforms.find(
              (platform) => platform.nickName == item.nickName
            ) !== undefined;
          const available = item.available;
          return (
            <li key={key}>
              <a
                onClick={() => {
                  if (!available) return;
                  if (selected) {
                    setPlatforms(
                      selectedPlatforms.filter(
                        (platform) => platform.realName !== item.realName
                      )
                    );
                  } else {
                    setPlatforms([...selectedPlatforms, item]);
                  }
                }}
                className={selected ? selectedClasses : itemsClasses}
              >
                <div className="flex-1">{item.nickName}</div>
                {available ? (
                  ""
                ) : (
                  <div className="flex items-center bg-light-taboo rounded-md cursor-pointer text-white px-2">
                    维护中
                  </div>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabooPlatform;
