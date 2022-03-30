import baseDistro from "@distros/baseDistro";
import { readFileSync } from "node:fs";

const osPath = baseDistro.getOsFilePath();
const osName = baseDistro.getName(readFileSync(osPath).toString());

const distro = (() => {
    try {
        return require(`./distros/${osName}`);
    } catch(e) {
        try {
            return require(`./distros/${baseDistro.getNameLike(readFileSync(osPath).toString())}`);
        } catch (e) {
            return require("./distros/baseDistro");
        }
    }
})();
const distroInstance: baseDistro = new distro.default();

distroInstance.printDistro();
