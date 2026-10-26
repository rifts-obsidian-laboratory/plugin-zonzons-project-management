import { App } from "obsidian";
import { I_Settings } from "../../settings/Settings";
import ZonzonsProjectManagement from "../../main";

export class CreateProjectForm {
	public plugin: ZonzonsProjectManagement;
	public name: string;
	public type: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.name = "";
		this.type = "traditional";
	}

	public create(): void {
		console.log(this.name, this.type);
	}
}
