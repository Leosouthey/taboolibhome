import useFormStore, { Module, modules } from "@/store/form";

const TabooModule = () => {
  const selectedModules = useFormStore((state) => state.modules);
  const setModules = useFormStore((state) => state.setModules);
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl">
        模块选择<span> ({selectedModules.length})</span>
      </h1>
      <ul className="menu w-full p-0 mt-2">
        {modules.map((item, key) => {
          const selected =
            selectedModules.find(
              (module) => module.realName === item.realName
            ) !== undefined;
          return (
            <li key={key}>
              <a
                className={
                  selected
                    ? "flex items-center active mt-2"
                    : "flex items-center mt-2"
                }
              >
                <div
                  onClick={() => {
                    if (selected) {
                      if (item.required) {
                        return;
                      }
                      setModules(
                        selectedModules.filter(
                          (module) => module.realName !== item.realName
                        )
                      );
                    } else {
                      setModules([...selectedModules, item]);
                    }
                  }}
                  className="flex-1"
                >
                  {item.nickName}
                </div>
                {/*<div className="flex items-center bg-base-300 rounded-md cursor-pointer text-black">*/}
                {/*  <CgSelect size="18px" />*/}
                {/*</div>*/}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabooModule;
