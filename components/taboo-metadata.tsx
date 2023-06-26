import { AiFillDelete } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import useFormStore from "@/store/form";

const TabooMetadata = () => {
  const metadata = useFormStore((state) => state.metadata);
  const setMetadata = useFormStore((state) => state.setMetadata);
  const inputData = useFormStore((state) => state.inputData);
  const setInputData = useFormStore((state) => state.setInputData);
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl">描述文件</h1>
      <div className="form-control w-full max-w-xs mt-2">
        <label className="label">
          <span className="label-text text-lg">插件说明</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="我是插件的说明"
        ></textarea>
      </div>
      <div className="form-control w-full max-w-xs mt-2">
        <label className="label">
          <span className="label-text text-lg">插件作者</span>
        </label>
        <div className="py-2">
          <ul className="menu w-full p-0">
            {metadata.authors?.map((item, key) => (
              <li key={key}>
                <a className="flex items-center">
                  <div className="flex-1">{item}</div>
                  <div className="flex items-center">
                    <div
                      onClick={() => {
                        setMetadata({
                          ...metadata,
                          authors: metadata.authors?.filter(
                            (item, index) => index !== key
                          ),
                        });
                      }}
                      className="tooltip"
                      data-tip="删除"
                    >
                      <AiFillDelete size="18px" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full h-8">
          <input
            type="text"
            placeholder="作者"
            className="w-full input input-bordered h-8 max-w-xs"
            onChange={(e) => {
              setInputData({ ...inputData, author: e.target.value });
            }}
          />
          <div
            onClick={() => {
              if (inputData.author) {
                setMetadata({
                  ...metadata,
                  authors: [
                    ...(metadata.authors ? metadata.authors : []),
                    inputData.author,
                  ],
                });
              }
            }}
            className="ml-2 h-8 w-8 flex justify-center items-center cursor-pointer bg-base-200 rounded-md transition-all hover:bg-base-300"
          >
            <GrFormAdd />
          </div>
        </div>
      </div>
      <div className="form-control w-full max-w-xs mt-2">
        <label className="label">
          <span className="label-text text-lg">插件依赖</span>
        </label>
        <div className="py-2">
          <ul className="menu w-full p-0">
            {metadata.dependencies?.map((item, key) => (
              <li key={key}>
                <a className="flex items-center">
                  <div className="flex-1">{item}</div>
                  <div className="flex items-center">
                    <div
                      onClick={() => {
                        setMetadata({
                          ...metadata,
                          dependencies: metadata.dependencies?.filter(
                            (item, index) => index !== key
                          ),
                        });
                      }}
                      className="tooltip"
                      data-tip="删除"
                    >
                      <AiFillDelete size="18px" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full h-8">
          <input
            type="text"
            placeholder="依赖"
            className="w-full input input-bordered h-8 max-w-xs"
            onChange={(e) => {
              setInputData({ ...inputData, dependency: e.target.value });
            }}
          />
          <div
            onClick={() => {
              if (inputData.dependency) {
                setMetadata({
                  ...metadata,
                  dependencies: [
                    ...(metadata.dependencies ? metadata.dependencies : []),
                    inputData.dependency,
                  ],
                });
              }
            }}
            className="ml-2 h-8 w-8 flex justify-center items-center cursor-pointer bg-base-200 rounded-md transition-all hover:bg-base-300"
          >
            <GrFormAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabooMetadata;
