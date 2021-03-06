import { existsSync, readFileSync } from "node:fs";
import logo from "./logo";

export default class baseDistro {
    private osFilePath: string;
    private osFile: string;

    public name: string;
    public prettyName: string;
    public idLike: string;

    public static windowsMsg = "windows user lol (windows support coming soon, why not try linux?)";

    public logo = logo;

    constructor() {
        this.osFilePath = baseDistro.getOsFilePath();
        this.osFile = readFileSync(this.osFilePath).toString();

        this.name = baseDistro.getName(this.osFile);
        this.prettyName = this.getPrettyName();
        this.idLike = baseDistro.getNameLike(this.osFile);
    }

    public static getOsFilePath(): string {
        if (existsSync("/etc/os-release")) return "/etc/os-release";
        return "/bedrock/os-release";
    }

    public static getName(osFile: string): string {
        // Get the name of the distro
        const name = osFile.split("ID")[1]?.split("\n")[0];

        // Return the name of the distro
        return name ?? this.windowsMsg;
    }

    public static getNameLike(osFile: string): string {
        const nameLike = osFile.split("ID_LIKE=")[1]?.split("\n")[0];

        return nameLike ?? this.windowsMsg;
    }

    private getPrettyName(): string {
        const prettyname = this.osFile.split("PRETTY_NAME=")[1]?.split("\n")[0];

        return prettyname ?? baseDistro.windowsMsg;
    }

    public printDistro(): void {
        console.log(this.logo);
        console.log(`OS: ${this.prettyName}`);
    }

}
