import Image from "next/image";
import github from "public/github.png";
import mcbbs from "public/mcbbs.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NewBlank from "@/components/new-blank";

async function getData() {
  const res = await fetch(
    "https://api.github.com/repos/TabooLib/Taboolib/actions/runs"
  );
  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-fit min-h-full">
        <div className="flex flex-col items-center">
          <NewBlank
            href="https://github.com/TabooLib/taboolib"
            className="bg-card flex flex-col items-center justify-center w-[18rem] h-[6rem] mr-8 rounded-xl shadow-xl mb-4 cursor-pointer"
          >
            <div className="flex flex-col px-8">
              <Image src={github} className="select-none" alt="Github" />
            </div>
          </NewBlank>
          <NewBlank
            href="https://www.mcbbs.net/thread-773065-1-1.html"
            className="bg-card flex flex-col items-center justify-center w-[18rem] h-[6rem] mr-8 rounded-xl shadow-xl cursor-pointer"
          >
            <div className="flex flex-col px-8">
              <Image src={mcbbs} className="select-none" alt="MCBBS" />
            </div>
          </NewBlank>
        </div>
        <div className="flex flex-col">
          {data == null ?? (
            <div className="flex w-[48rem] h-[13rem] rounded-xl mb-4 justify-center items-center">
              <div className="bg-blue-600 p-2 w-4 h-4 rounded-full animate-bounce blue-circle mr-2"></div>
              <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle mr-2"></div>
              <div className="bg-red-600 p-2 w-4 h-4 rounded-full animate-bounce red-circle mr-2"></div>
            </div>
          )}
          {data != null &&
            data.workflow_runs
              ?.filter((action: any) =>
                action.display_title.includes("[publish]")
              )
              .slice(0, 5)
              .map((action: any, key: number) => {
                return (
                  <Card
                    key={key}
                    className="border-none bg-card w-[48rem] h-[13rem] rounded-xl shadow-xl mb-4"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="mr-2">{getVersion(action)}</div>
                        {action.conclusion === "success" ? (
                          <Badge className="mr-2">构建成功</Badge>
                        ) : (
                          <Badge className="mr-2" variant="destructive">
                            构建失败
                          </Badge>
                        )}
                        {key === 0 && (
                          <Badge className="bg-light-taboo hover:bg-taboo">
                            最新版本
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        <div className="font-mono text-sm">
                          {new Date(action.created_at).toLocaleString()}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{getDesc(action)}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-end items-center">
                        <NewBlank
                          href={
                            "https://github.com/TabooLib/taboolib/releases/tag/" +
                            getVersion(action)
                          }
                          className="bg-light-taboo hover:bg-taboo text-white"
                        >
                          点击查看
                        </NewBlank>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
          {data != null && (
            <NewBlank
              href="https://github.com/TabooLib/taboolib/actions"
              className="bg-card text-xl w-[48rem] h-[4rem] rounded-xl shadow-xl overflow-x-hidden mb-4"
            >
              更多版本点我前往Github查看
            </NewBlank>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return {
    props: { data },
  };
}

function getVersion(action: any) {
  return (
    action.display_title.split("]")[0].split("[")[1] + "-" + action.run_number
  );
}

function getDesc(action: any) {
  return action.display_title.split("]")[2];
}
