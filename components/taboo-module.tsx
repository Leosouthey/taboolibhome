import useFormStore, { modules } from "@/store/form";
import { Badge } from "@/components/ui/badge";

const TabooModule = () => {
  const selectedModules = useFormStore((state) => state.modules);
  const setModules = useFormStore((state) => state.setModules);

  const itemsClasses =
    "flex items-center w-full px-2 h-8 rounded-md cursor-pointer transition-all mb-2 hover:bg-card-item hover:text-black";
  const selectedClasses =
    "flex items-center w-full px-2 h-8 rounded-md cursor-pointer transition-all mb-2 bg-light-taboo text-white hover:bg-light-taboo hover:text-white";
  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl">
        模块选择<span> ({selectedModules.length})</span>
      </div>
      <ul className="w-full p-0 mt-4">
        {modules.map((item, key) => {
          const selected =
            selectedModules.find(
              (module) => module.realName === item.realName
            ) !== undefined;
          return (
            <li key={key}>
              <a
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
                className={selected ? selectedClasses : itemsClasses}
              >
                <div className="flex-1">{item.nickName}</div>
                {/*<div className="flex items-center bg-base-300 rounded-md cursor-pointer text-black">*/}
                {/*  <CgSelect size="18px" />*/}
                {/*</div>*/}
                {item.required && <Badge variant="secondary">必选</Badge>}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabooModule;
