"use client";

import { PiWarningFill } from "react-icons/pi";
import { FaPen } from "react-icons/fa";
import React from "react";
import useFormStore from "@/store/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabooModule from "@/components/taboo-module";
import TabooPlatform from "@/components/taboo-platform";
import TabooExpansions from "@/components/taboo-expansions";
import TabooMetadata from "@/components/taboo-metadata";
import { Button } from "@/components/ui/button";

export default function Quickstart() {
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
    <div className="flex items-start justify-center">
      <div className="flex flex-col md:flex-row h-fit min-h-full">
        <div className="bg-card flex flex-col items-center w-full md:w-[18rem] h-fit mr-8 rounded-xl shadow-xl px-4 py-8">
          <div className="flex flex-col items-center w-full">
            <h1 className="flex text-3xl text-taboo">
              <FaPen className="mr-1" />
              创建项目
            </h1>
            <p className="text-lg text-opacity-80 mt-4">
              输入基本信息并选择一些模块来快速生成你的 TabooLib 项目。
            </p>
          </div>
          <div className="border-b border-gray-300 w-full mt-4"></div>
          <div className="flex flex-col h-full w-full mt-4">
            <div className="form-control w-full max-w-xs">
              <Label htmlFor="name" className="text-base mb-1">
                项目名称
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="ExampleProject"
                className="input input-bordered w-full h-8 max-w-xs"
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
            </div>
            <div className="w-full max-w-xs mt-2">
              <Label htmlFor="package">
                <div className="flex justify-between text-base mb-1">
                  <span>包名</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <PiWarningFill size="18px" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>包名不要与现有的项目重复，</p>
                        <p>否则将会导致 TabooLib 无法加载。</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Label>
              <Input
                id="package"
                type="text"
                placeholder="com.github.username"
                className="input input-bordered w-full h-8"
                onChange={(e) =>
                  setProject({ ...project, package: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full">
            <Button
              className="w-full bg-taboo mt-8 text-xl hover:bg-taboo-hover"
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
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full h-fit md:w-[48rem] rounded-xl overflow-x-hidden">
        <Tabs defaultValue="metadata" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metadata">元数据</TabsTrigger>
            <TabsTrigger value="modules">模块</TabsTrigger>
            <TabsTrigger value="platforms">运行平台</TabsTrigger>
            <TabsTrigger value="expansions">附加组件</TabsTrigger>
          </TabsList>
          <TabsContent value="metadata">
            <div className="bg-card flex flex-col p-8 w-full md:w-[48rem] rounded-xl shadow-xl">
              <TabooMetadata />
            </div>
          </TabsContent>
          <TabsContent value="modules">
            <div className="bg-card flex flex-col p-8 w-full md:w-[48rem] rounded-xl shadow-xl">
              <TabooModule />
            </div>
          </TabsContent>
          <TabsContent value="platforms">
            <div className="bg-card flex flex-col p-8 w-full md:w-[48rem] rounded-xl shadow-xl">
              <TabooPlatform />
            </div>
          </TabsContent>
          <TabsContent value="expansions">
            <div className="bg-card flex flex-col p-8 w-full md:w-[48rem] rounded-xl shadow-xl">
              <TabooExpansions />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
