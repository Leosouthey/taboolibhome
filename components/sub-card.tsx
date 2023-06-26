import TabooMetadata from "@/components/taboo-metadata";
import useFormStore, { Metadata } from "@/store/form";
import TabooModule from "@/components/taboo-module";
import TabooPlatform from "@/components/taboo-platform";
import TabooExpansions from "@/components/taboo-expansions";

const SubCard = ({ content }: { content: string }) => {
  const metadata = useFormStore((state) => state.metadata);
  return (
    <div className="flex flex-col w-full h-full p-8">
      {content === "元数据" && <TabooMetadata />}
      {content === "模块" && <TabooModule />}
      {content === "运行平台" && <TabooPlatform />}
      {content === "附加组件" && <TabooExpansions />}
    </div>
  );
};

export default SubCard;
