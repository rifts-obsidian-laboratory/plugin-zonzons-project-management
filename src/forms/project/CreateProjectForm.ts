import { App, Notice, TAbstractFile, TFile, TFolder } from "obsidian";
import { I_Settings } from "../../settings/Settings";
import ZonzonsProjectManagement from "../../main";
import { createBaseFile, createMarkdownFile } from "../../helpers/file";

export class CreateProjectForm {
	public plugin: ZonzonsProjectManagement;
	public name: string;
	public type: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.name = "";
		this.type = "traditional";
	}

	public async create(): Promise<void> {
		const app: App = this.plugin.app;
		const settings: I_Settings = this.plugin.settings;

		const project: TFolder = await app.vault.createFolder(settings.projectFolderPath + "/" + this.name);

		const projectOverview: TFile | null = await createMarkdownFile(
			app,
			project,
			settings.projectOverviewTemplatePath,
			settings.projectOverviewFileName,
		);

		if (this.type === "traditional") {
			//
		} else if (this.type === "agile") {
			const dashboard: TFile | null = await createBaseFile(
				app,
				project,
				settings.agileDashboardTemplatePath,
				settings.agileDashboardFileName,
			);

			const epics: TFolder = await app.vault.createFolder(project.path + "/" + settings.epicFolderName);
			const userStories: TFolder = await app.vault.createFolder(project.path + "/" + settings.userStoryFolderName);
		} else {
			await app.vault.delete(project, true);
			new Notice("Project type not supported. Project creation aborted.", 5000);
		}
	}
}
