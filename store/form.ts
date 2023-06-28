import { create } from "zustand";
import rawPlatforms from "@/public/platforms.json";
import rawModules from "@/public/modules.json";
import rawExpansions from "@/public/expansions.json";

interface FormState {
  metadata: Metadata;
  inputData: any;
  modules: Module[];
  platforms: Platform[];
  expansions: Expansion[];
  project: Project;
  setProject: (project: Project) => void;
  setExpansions: (expansions: Expansion[]) => void;
  setPlatforms: (platforms: Platform[]) => void;
  setModules: (modules: Module[]) => void;
  setMetadata: (metadata: Metadata) => void;
  setInputData: (inputData: any) => void;
}

export interface Project {
  name: string;
  package: string;
}

export interface Expansion {
  nickName: string;
  realName: string;
  desc: string;
}

export interface Platform {
  nickName: string;
  realName: string;
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

export const modules: Module[] = rawModules;
export const platforms: Platform[] = rawPlatforms;
export const expansions: Expansion[] = rawExpansions;

const useFormStore = create<FormState>((set) => ({
  metadata: {} as Metadata,
  inputData: {} as any,
  modules: modules.filter(
    (module) => module.required || module.defaultSelected
  ),
  platforms: [],
  expansions: [],
  project: {} as Project,
  setProject: (project: Project) => set({ project }),
  setExpansions: (expansions: Expansion[]) => set({ expansions }),
  setPlatforms: (platforms: Platform[]) => set({ platforms }),
  setModules: (modules: Module[]) => set({ modules }),
  setMetadata: (metadata: Metadata) => set({ metadata }),
  setInputData: (inputData: any) => set({ inputData }),
}));

export default useFormStore;
