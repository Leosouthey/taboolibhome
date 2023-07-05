import Link from "next/link";
import { Button } from "@/components/ui/button";
import taboolib from "@/public/taboolib.png";
import Image from "next/image";
import NewBlank from "@/components/new-blank";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-6xl flex flex-row mx-auto px-8 md:px-4 pt-24 pb-24 lg:pt-42 lg:pb-48 w-full">
        <div className="flex-1 lg:flex hidden justify-start items-center">
          <Image src={taboolib} alt="TabooLib" className="h-80 w-80" />
        </div>
        <div className="flex-1">
          <h1 className="font-medium leading-normal lg:text-5xl lg:leading-normal text-4xl">
            现代化框架
            <br />
            <span className="text-light-taboo">助力高效开发</span>
          </h1>
          <p className="text-xl mt-4">
            TabooLib是一个基于Kotlin的跨平台框架，旨在提供快速、安全的软件和丰富的插件API。作为Minecraft中最广泛使用、性能最佳、稳定性最高的软件之一，TabooLib提供快速更新和有益的支持，旨在改善Minecraft的生态系统。
          </p>
          <div className="flex flex-row gap-4 mt-8">
            <Link href="/quickstart">
              <Button className="bg-taboo hover:bg-taboo-hover w-40 font-medium mr-4">
                快速开始
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="secondary"
                className="bg-card hover:bg-card-item w-44 font-medium"
              >
                查看文档
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full pt-12 pb-8 bg-card-item">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-semibold text-xl md:text-2xl px-6 lg:px-4 mb-4">
            TabooLib，让你的开发尽享
            <span className="text-light-taboo">最佳体验。</span>
          </h2>
          <div className="grid md:grid-cols-3 md:-ml-4 gap-2 px-2 xl:gap-4">
            <NewBlank
              href="https://github.com/TabooLib/adyeshach"
              className="cursor-pointer hover:bg-card-item-hover px-8 py-8 rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="font-medium">Adyeshach</h3>
              <p className="text-gray-800 mt-4">
                Adyeshach
                是一款基于TabooLib进行开发的NPC插件，旨在大幅提升性能并提供更高级的功能和API。与Minecraft游戏服务器Paper类似，Adyeshach致力于改善游戏体验，为玩家提供更加丰富的内容和更好的性能表现。
              </p>
            </NewBlank>
            <NewBlank
              href="https://github.com/TabooLib/chemdah"
              className="cursor-pointer hover:bg-card-item-hover px-8 py-8 rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="font-medium">Chemdah</h3>
              <p className="text-gray-800 mt-4">
                Chemdah
                是一款基于TabooLib的任务插件，旨在大幅提升性能并提供更高级的功能和API。与Minecraft游戏服务器Paper类似，Chemdah致力于改善游戏体验，为玩家提供更加丰富的任务内容和更好的性能表现。
              </p>
            </NewBlank>
            <NewBlank
              href="https://kether.tabooproject.org"
              className="cursor-pointer hover:bg-card-item-hover px-8 py-8 rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="font-medium">Kether</h3>
              <p className="text-gray-800 mt-4">
                Kether
                是一款与TabooLib密不可分的脚本系统，旨在大幅提升性能并提供更高级的功能和API。与Minecraft游戏服务器Paper类似，Kether致力于改善游戏体验，为玩家提供更加丰富的脚本内容和更好的性能表现。
              </p>
            </NewBlank>
          </div>
        </div>
      </div>
    </div>
  );
}
