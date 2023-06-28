"use client";

import Image from "next/image";
import github from "public/github.png";
import mcbbs from "public/mcbbs.png";
import useSWR from "swr";

export default function Home() {
  const { data, isLoading, error } = useSWR(
    "https://api.github.com/repos/TabooLib/Taboolib/actions/runs",
    async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-fit min-h-full">
        <div className="flex flex-col items-center">
          <div
            onClick={() =>
              window.open("https://github.com/TabooLib/taboolib", "_blank")
            }
            className="flex flex-col items-center justify-center w-[18rem] h-[6rem] mr-8 bg-base-100 rounded-xl shadow-xl mb-4 cursor-pointer"
          >
            <div className="flex flex-col px-8">
              <Image src={github} className="select-none" alt="Github" />
            </div>
          </div>
          <div
            onClick={() =>
              window.open(
                "https://www.mcbbs.net/thread-773065-1-1.html",
                "_blank"
              )
            }
            className="flex flex-col items-center justify-center w-[18rem] h-[6rem] mr-8 bg-base-100 rounded-xl shadow-xl cursor-pointer"
          >
            <div className="flex flex-col px-8">
              <Image src={mcbbs} className="select-none" alt="MCBBS" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {isLoading && (
            <div className="flex w-[48rem] h-[13rem] rounded-xl overflow-x-hidden mb-4 justify-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
          {error && <div>ERROR</div>}
          {data &&
            data.workflow_runs
              .filter((action: any) =>
                action.display_title.includes("[publish]")
              )
              .slice(0, 5)
              .map((action: any, key: number) => {
                return (
                  <div
                    key={key}
                    className="card w-[48rem] bg-base-100 h-[13rem] rounded-xl shadow-xl overflow-x-hidden mb-4"
                  >
                    <div className="card-body">
                      <h2 className="card-title">
                        {getVersion(action)}
                        {action.conclusion === "success" ? (
                          <div className="badge badge-success">构建成功</div>
                        ) : (
                          <div className="badge badge-error">构建失败</div>
                        )}
                        {key === 0 && (
                          <div className="badge badge-ghost">最新版本</div>
                        )}
                      </h2>
                      <p>{getDesc(action)}</p>
                      <div className="card-actions justify-between items-center">
                        <div className="font-mono text-sm">
                          {new Date(action.created_at).toLocaleString()}
                        </div>
                        <button
                          onClick={() => {
                            window.open(
                              "https://github.com/TabooLib/taboolib/releases/tag/" +
                                getVersion(action)
                            );
                          }}
                          className="btn"
                        >
                          点击查看
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          {data && (
            <button
              onClick={() => {
                window.open(
                  "https://github.com/TabooLib/taboolib/actions",
                  "_blank"
                );
              }}
              className="btn text-xl w-[48rem] bg-base-100 h-[4rem] rounded-xl shadow-xl overflow-x-hidden mb-4"
            >
              更多版本点我前往Github查看
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function getVersion(action: any) {
  return (
    action.display_title.split("]")[0].split("[")[1] + "-" + action.run_number
  );
}

function getDesc(action: any) {
  return action.display_title.split("]")[2];
}
