import JSZip from "jszip";
import streamToBlob from "stream-to-blob";
import { Expansion, Metadata, Module, Platform, Project } from "@/store/form";
import * as fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const project = JSON.parse(searchParams.get("project") || "{}") as Project;
  const zip = new JSZip();
  await writeDefaultFile(zip);
  await writeBuildFile(zip, searchParams);
  await writeSettingsFile(zip, searchParams);
  await writeSrcFile(zip, searchParams);
  await writeGradleFile(zip, searchParams);
  const stream = await zip.generateNodeStream({
    type: "nodebuffer",
    streamFiles: true,
  });
  const blob = await streamToBlob(stream, "application/zip");
  return new Response(blob, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${project.name}.zip"`,
    },
  });
}

async function writeSrcFile(zip: JSZip, searchParams: URLSearchParams) {
  const project = JSON.parse(searchParams.get("project") || "{}") as Project;
  zip.folder("src")?.folder("main")?.folder("resources");
  let projectContent = `package ${project.package}`;
  projectContent += `\n\nimport taboolib.common.platform.Plugin`;
  projectContent += `\nimport taboolib.common.platform.function.info`;
  projectContent += `\n\nobject ExampleProject : Plugin() {`;
  projectContent += `\n\n    override fun onEnable() {`;
  projectContent += `\n        info("Hello TabooLib")`;
  projectContent += `\n    }`;
  projectContent += `\n\n}`;
  zip.file(
    "src/main/kotlin/" +
      project.package.replaceAll(".", "/") +
      "/" +
      project.name +
      ".kt",
    projectContent
  );
}

async function writeGradleFile(zip: JSZip, searchParams: URLSearchParams) {
  const project = JSON.parse(searchParams.get("project") || "{}") as Project;
  let content = `group=${project.package}`;
  content += `\nversion=1.0.0`;
  zip.file("gradle.properties", content);
}

async function writeSettingsFile(zip: JSZip, searchParams: URLSearchParams) {
  const project = JSON.parse(searchParams.get("project") || "{}") as Project;
  zip.file("settings.gradle.kts", "rootProject.name=" + project.name);
}

async function writeBuildFile(zip: JSZip, searchParams: URLSearchParams) {
  let plugins = `plugins {
    \`java-library\`
    \`maven-publish\`
    id("org.jetbrains.kotlin.jvm") version "1.5.10"`;
  const tabooLibPluginVersion = await getTabooLibPluginVersion();
  const tabooLibPlugin = `\n    id("io.izzel.taboolib") version "${tabooLibPluginVersion}"`;
  plugins += tabooLibPlugin;
  plugins += "\n}\n";
  const tabooModules = JSON.parse(
    `${searchParams.get("modules")}` || "{}"
  ) as Module[];
  const platforms = JSON.parse(
    `${searchParams.get("platforms")}` || "{}"
  ) as Platform[];
  const metadata = JSON.parse(searchParams.get("metadata") || "{}") as Metadata;

  let taboolib = `\ntaboolib {`;
  tabooModules.forEach((module) => {
    taboolib += `\n    install("${module.realName}")`;
  });
  platforms.forEach((platform) => {
    taboolib += `\n    install("${platform.realName}")`;
  });
  taboolib += "\n    classifier = null";
  const version = await getTabooLibVersion();
  version;
  taboolib += `\n    version = "${version}"`;
  if (metadata.description || metadata.authors || metadata.dependencies) {
    taboolib += `\n    description {`;
    if (metadata.description) {
      taboolib += `\n        desc = "${metadata.description}"`;
    }
    if (metadata.authors) {
      taboolib += `\n        contributors {`;
      metadata.authors.forEach((author: string) => {
        taboolib += `\n            name("${author}")`;
      });
      taboolib += `\n        }`;
    }
    if (metadata.dependencies) {
      taboolib += `\n        dependencies {`;
      metadata.dependencies.forEach((dependency: string) => {
        taboolib += `\n            name("${dependency}")`;
      });
      taboolib += `\n        }`;
    }
    taboolib += "\n    }";
  }
  taboolib += "\n}\n";

  let repositories = `\nrepositories {`;
  repositories += `\n    mavenCentral()`;
  if (contains(platforms, "platform-nukkit")) {
    repositories += `\n    maven { url = uri("https://repo.nukkitx.com/maven-snapshots") }`;
  }
  if (
    contains(platforms, "platform-sponge-api7") ||
    contains(platforms, "platform-sponge-api8")
  ) {
    repositories += `\n    maven { url = uri("https://repo.spongepowered.org/maven") }`;
  }
  if (contains(platforms, "platform-velocity")) {
    repositories += `\n    maven { url = uri("https://nexus.velocitypowered.com/repository/maven-public/") }`;
  }
  repositories += "\n}\n";
  const expansions = JSON.parse(
    searchParams.get("expansions") || "{}"
  ) as Expansion[];
  let dependencies = `\ndependencies {`;
  expansions.forEach((expansion) => {
    dependencies += `\n    taboo("${expansion.realName}")`;
  });
  if (contains(platforms, "platform-bukkit")) {
    dependencies += `\n    compileOnly("ink.ptms:nms-all:1.0.0")`;
    dependencies += `\n    compileOnly("ink.ptms.core:v11902:11902-minimize:mapped")`;
    dependencies += `\n    compileOnly("ink.ptms.core:v11902:11902-minimize:universal")`;
  }
  if (contains(platforms, "platform-bungee")) {
    dependencies += `\n    compileOnly("net.md_5.bungee:BungeeCord:1")`;
  }
  if (contains(platforms, "platform-nukkit")) {
    dependencies += `\n    compileOnly("cn.nukkit:nukkit:2.0.0-SNAPSHOT")`;
  }
  if (contains(platforms, "platform-sponge-api7")) {
    dependencies += `\n    compileOnly("org.spongepowered:spongeapi:7.2.0")`;
  }
  if (contains(platforms, "platform-sponge-api8")) {
    dependencies += `\n    compileOnly("org.spongepowered:spongeapi:8.0.0-SNAPSHOT")`;
  }
  if (contains(platforms, "platform-velocity")) {
    dependencies += `\n    compileOnly("com.velocitypowered:velocity-api:1.1.8")`;
  }
  dependencies += `\n    compileOnly(kotlin("stdlib"))`;
  dependencies += `\n    compileOnly(fileTree("libs"))`;
  dependencies += "\n}\n";

  let JavaCompile = "\ntasks.withType<JavaCompile> {";
  JavaCompile += '\n    options.encoding = "UTF-8"';
  JavaCompile += "\n}\n";

  let KotlinCompile =
    "\ntasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {";
  KotlinCompile += "\n    kotlinOptions {";
  KotlinCompile += '\n        jvmTarget = "1.8"';
  KotlinCompile += '\n        freeCompilerArgs = listOf("-Xjvm-default=all")';
  KotlinCompile += "\n    }";
  KotlinCompile += "\n}\n";

  let JavaPluginConvention = "\nconfigure<JavaPluginConvention> {";
  JavaPluginConvention += "\n    sourceCompatibility = JavaVersion.VERSION_1_8";
  JavaPluginConvention += "\n    targetCompatibility = JavaVersion.VERSION_1_8";
  JavaPluginConvention += "\n}\n";

  let publishing = `\npublishing {
    repositories {
        maven {
            url = uri("https://repo.tabooproject.org/repository/releases")
            credentials {
                username = project.findProperty("taboolibUsername").toString()
                password = project.findProperty("taboolibPassword").toString()
            }
            authentication {
                create<BasicAuthentication>("basic")
            }
        }
    }
    publications {
        create<MavenPublication>("library") {
            from(components["java"])
            groupId = project.group.toString()
        }
    }
}`;

  const fileContents =
    plugins +
    taboolib +
    repositories +
    dependencies +
    JavaCompile +
    KotlinCompile +
    JavaPluginConvention +
    publishing;
  zip.file("build.gradle.kts", fileContents);
}

function contains(obj: any[], key: string): boolean {
  return (
    obj.find((item) => {
      return item.realName === key;
    }) != null
  );
}

async function getTabooLibVersion() {
  const response = await fetch(
    "https://api.github.com/repos/TabooLib/Taboolib/releases/latest"
  );
  const data = await response.json();
  return data["tag_name"];
}

async function getTabooLibPluginVersion() {
  const response = await fetch(
    "https://api.github.com/repos/TabooLib/TabooLib-Gradle-Plugin/releases/latest"
  );
  const data = await response.json();
  return data["tag_name"];
}

async function writeDefaultFile(zip: JSZip) {
  const sdkPath = path.join(process.cwd(), "public", "sdk");
  await writeFileToZip(zip, sdkPath);
}

async function writeFileToZip(zip: JSZip, filePath: string) {
  if (filePath.endsWith(".gitingore")) {
    const fileName = filePath.split("sdk")[1];
    const fileContents = fs.readFileSync(filePath);
    zip.file(fileName, fileContents);
  }
  if (filePath.endsWith(".github")) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      writeFileToZip(zip, path.join(filePath, file));
    });
  }
  if (fs.statSync(filePath).isFile()) {
    const fileName = filePath.split("sdk")[1];
    const fileContents = fs.readFileSync(filePath);
    zip.file(fileName, fileContents);
  } else {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      writeFileToZip(zip, path.join(filePath, file));
    });
  }
}
