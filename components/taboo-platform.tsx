import useFormStore, { platforms } from "@/store/form";

const TabooPlatform = () => {
  const selectedPlatforms = useFormStore((state) => state.platforms);
  const setPlatforms = useFormStore((state) => state.setPlatforms);
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl">
        运行平台<span> ({selectedPlatforms.length})</span>
      </h1>
      <ul className="menu w-full p-0 mt-2">
        {platforms.map((item, key) => {
          const selected =
            selectedPlatforms.find(
              (platform) => platform.nickName == item.nickName
            ) !== undefined;
          const available = item.available;
          return (
            <li key={key}>
              <a
                className={
                  (selected
                    ? "flex items-center active mt-2"
                    : "flex items-center mt-2") +
                  (available ? "" : " btn-disabled bg-base-200")
                }
              >
                <div
                  onClick={() => {
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
                  className="flex-1"
                >
                  {item.nickName}
                </div>
                {available ? (
                  ""
                ) : (
                  <div className="flex items-center bg-base-300 rounded-md cursor-pointer text-black px-2">
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
