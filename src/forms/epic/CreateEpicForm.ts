import ZonzonsProjectManagement from "../../main";
import { App, Notice, TAbstractFile, TFile, TFolder } from "obsidian";
import { I_Settings } from "../../settings/Settings";
import { createMarkdownFile } from "../../helpers/file";

export class CreateEpicForm {
	public plugin: ZonzonsProjectManagement;
	public project: TFolder | null;
	public name: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.project = null;
		this.name = "";
	}

	public setProject(projectName: string): void {
		this.project = this.plugin.app.vault.getFolderByPath(this.plugin.settings.projectFolderPath + "/" + projectName);
	}

	public async create(): Promise<void> {
		const app: App = this.plugin.app;
		const settings: I_Settings = this.plugin.settings;

		console.log(this.project, this.name);

		if (!this.project) {
			new Notice("Project not found. Epic creation aborted.", 5000);
			return;
		}

		await createMarkdownFile(
			app,
			this.project,
			settings.epicTemplatePath,
			settings.epicFolderName + "/" + this.name + ".md",
		);
	}
}
