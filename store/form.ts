import { create } from "zustand";

interface FormState {
  metadata: Metadata;
  inputData: any;
  modules: Module[];
  platforms: Platform[];
  expansions: Expansion[];
  setExpansions: (expansions: Expansion[]) => void;
  setPlatforms: (platforms: Platform[]) => void;
  setModules: (modules: Module[]) => void;
  setMetadata: (metadata: Metadata) => void;
  setInputData: (inputData: any) => void;
}

export interface Expansion {
  nickName: string;
  realName: string;
  desc: string;
}

export interface Platform {
  name: string;
  available: boolean;
}

export interface Metadata {
  description?: string;
  authors?: string[];
  dependencies?: string[];
}

export interface Module {
  nickName: string;
  realName: string;
  desc: string;
  required: boolean;
  defaultSelected: boolean;
}

export const platforms: Platform[] = [
  {
    name: "Bukkit",
    available: true,
  },
  {
    name: "BungeeCord",
    available: true,
  },
  {
    name: "Velocity",
    available: false,
  },
];

export const modules: Module[] = [
  {
    realName: "common",
    nickName: "common",
    desc: "基础模块",
    required: true,
    defaultSelected: true,
  },
  {
    realName: "common-5",
    nickName: "common-5",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: true,
  },
  {
    realName: "common-5（shaded）",
    nickName: "common-5（shaded）",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "ai",
    nickName: "ai",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "chat",
    nickName: "chat",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "chat（shaded）",
    nickName: "chat（shaded）",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "configuration",
    nickName: "configuration",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "configuration（shaded）",
    nickName: "configuration（shaded）",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "configuration-legacy",
    nickName: "configuration-legacy",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "configuration-legacy（shaded）",
    nickName: "configuration-legacy（shaded）",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "database",
    nickName: "database",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
  {
    realName: "database（shaded）",
    nickName: "database（shaded）",
    desc: "TabooLib5 中的基础模块",
    required: false,
    defaultSelected: false,
  },
];

export const expansions: Expansion[] = [
  {
    nickName: "Universal Mythic",
    realName: "Universal Mythic",
    desc: "MythicMobs 版本兼容工具",
  },
];

const useFormStore = create<FormState>((set) => ({
  metadata: {} as Metadata,
  inputData: {} as any,
  modules: modules.filter(
    (module) => module.required || module.defaultSelected
  ),
  platforms: [],
  expansions: [],
  setExpansions: (expansions: Expansion[]) => set({ expansions }),
  setPlatforms: (platforms: Platform[]) => set({ platforms }),
  setModules: (modules: Module[]) => set({ modules }),
  setMetadata: (metadata: Metadata) => set({ metadata }),
  setInputData: (inputData: any) => set({ inputData }),
}));

export default useFormStore;
