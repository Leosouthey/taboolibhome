"use client";

import { PiWarningFill } from "react-icons/pi";
import { FaPen } from "react-icons/fa";
import SubCard from "@/components/sub-card";
import { useState } from "react";
import useFormStore from "@/store/form";

const contents = ["元数据", "模块", "运行平台", "附加组件"];

declare global {
  interface Window {
    messageModal: HTMLDialogElement;
  }
}

export default function Quickstart() {
  const [content, setContent] = useState("元数据");
  const project = useFormStore((state) => state.project);
  const metadata = useFormStore((state) => state.metadata);
  const platforms = useFormStore((state) => state.platforms);
  const modules = useFormStore((state) => state.modules);
  const expansions = useFormStore((state) => state.expansions);
  const setProject = useFormStore((state) => state.setProject);

  const buildURL = () => {
    const params = new URLSearchParams({
      project: JSON.stringify(project),
      metadata: JSON.stringify(metadata),
      platforms: JSON.stringify(platforms),
      modules: JSON.stringify(modules),
      expansions: JSON.stringify(expansions),
    });
    return `/api/quickstart?${params.toString()}`;
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-fit min-h-full">
        <div className="flex flex-col items-center w-[18rem] h-fit mr-8 bg-base-100 rounded-xl shadow-xl px-4 py-8">
          <div className="flex flex-col items-center w-full">
            <h1 className="flex text-3xl text-taboo-primary">
              <FaPen className="mr-1" />
              创建项目
            </h1>
            <p className="text-base-content text-opacity-80 mt-4">
              输入基本信息并选择一些模块来快速生成你的 TabooLib 项目。
            </p>
          </div>
          <div className="divider" />
          <div className="flex flex-col h-full">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-xl">项目名称</span>
              </label>
              <input
                type="text"
                placeholder="ExampleProject"
                className="input input-bordered w-full h-8 max-w-xs"
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
            </div>
            <div className="form-control w-full max-w-xs mt-2">
              <label className="label">
                <span className="label-text text-xl">包名</span>
                <span className="label-text-alt">
                  <div
                    className="tooltip z-10"
                    data-tip="包名不要与现有的项目重复，否则将会导致 TabooLib 无法加载。"
                  >
                    <PiWarningFill size="18px" />
                  </div>
                </span>
              </label>
              <input
                type="text"
                placeholder="com.github.username"
                className="input input-bordered w-full h-8 max-w-xs"
                onChange={(e) =>
                  setProject({ ...project, package: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full">
            <ul className="menu text-xl rounded-box p-0 mt-4">
              {contents.map((item) => (
                <li key={item}>
                  <a
                    className={`${content === item && "active"}`}
                    onClick={() => setContent(item)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <button
              className="w-full btn mt-4 text-xl"
              onClick={() => {
                if (!project.name || !project.package) {
                  // window.messageModal.showModal();
                  alert("项目名称和包名不能为空");
                  return;
                } else {
                  window.open(buildURL(), "_blank");
                }
              }}
            >
              生成项目
            </button>
            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">注意</h3>
                <p className="py-4">项目名称和包名不能为空</p>
                <div className="modal-action">
                  <button className="btn">确定</button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
        <div className="flex w-[48rem] bg-base-100 rounded-xl shadow-xl overflow-x-hidden">
          <SubCard content={content} />
        </div>
      </div>
    </div>
  );
}
