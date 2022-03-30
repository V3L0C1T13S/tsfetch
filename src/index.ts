import baseDistro from "@distros/baseDistro";
import { readFileSync } from "node:fs";

const osName = baseDistro.getName(readFileSync(baseDistro.getOsFilePath()).toString());

const distro = require(`./distros/${osName}`);
const distroInstance: baseDistro = new distro.default();

distroInstance.printDistro();
