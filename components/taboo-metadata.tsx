import { AiFillDelete } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import useFormStore from "@/store/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

const TabooMetadata = () => {
  const metadata = useFormStore((state) => state.metadata);
  const setMetadata = useFormStore((state) => state.setMetadata);
  const inputData = useFormStore((state) => state.inputData);
  const setInputData = useFormStore((state) => state.setInputData);

  const itemsClasses =
    "flex items-center w-full px-2 h-8 rounded-md cursor-pointer bg-light-taboo text-white transition-all mb-2";
  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-3xl">描述文件</div>
      <div className="w-full mt-4">
        <Label htmlFor="desc" className="text-lg">
          插件说明
        </Label>
        <Textarea
          id="desc"
          className="textarea textarea-bordered"
          defaultValue={metadata.description}
          placeholder="我是插件的说明"
          onChange={(e) => {
            setMetadata({ ...metadata, description: e.target.value });
          }}
        ></Textarea>
      </div>
      <div className="form-control w-full mt-2">
        <Label htmlFor="author" className="text-lg">
          插件作者
        </Label>
        <ul className="w-full py-2">
          {metadata.authors?.map((item, key) => (
            <li key={key}>
              <a className={itemsClasses}>
                <div className="flex-1">{item}</div>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AiFillDelete
                          className="hover:text-red-500 transition-all duration-300"
                          onClick={() => {
                            setMetadata({
                              ...metadata,
                              authors: metadata.authors?.filter(
                                (item, index) => index !== key
                              ),
                            });
                          }}
                          size="18px"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>删除</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex w-full">
          <Input
            id="author"
            type="text"
            placeholder="请输入作者"
            defaultValue={inputData.author}
            className="w-full"
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
            className="ml-2 h-9 w-9 flex justify-center items-center cursor-pointer bg-base-200 rounded-md transition-all duration-300 hover:bg-white"
          >
            <GrFormAdd />
          </div>
        </div>
      </div>
      <div className="w-full mt-2">
        <Label htmlFor="dependency" className="text-lg">
          插件依赖
        </Label>
        <ul className="w-full py-2">
          {metadata.dependencies?.map((item, key) => (
            <li key={key}>
              <a className={itemsClasses}>
                <div className="flex-1">{item}</div>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AiFillDelete
                          className="hover:text-red-500 transition-all duration-300"
                          onClick={() => {
                            setMetadata({
                              ...metadata,
                              dependencies: metadata.dependencies?.filter(
                                (item, index) => index !== key
                              ),
                            });
                          }}
                          size="18px"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>删除</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex w-full">
          <Input
            id="dependency"
            type="text"
            placeholder="请输入依赖"
            defaultValue={inputData.dependency}
            className="w-full"
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
            className="ml-2 h-9 w-9 flex justify-center items-center cursor-pointer bg-base-200 rounded-md transition-all duration-300 hover:bg-white"
          >
            <GrFormAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabooMetadata;
