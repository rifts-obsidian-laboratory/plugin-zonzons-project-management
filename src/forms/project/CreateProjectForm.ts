import { App, Notice, TFile, TFolder } from "obsidian";
import { I_Settings } from "../../settings/Settings";
import ZonzonsProjectManagement from "../../main";
import { createBaseFile, createMarkdownFile } from "../../helpers/file";
import { ProjectType } from "../../enums/ProjectType";

export class CreateProjectForm {
	public plugin: ZonzonsProjectManagement;
	public name: string;
	public type: ProjectType;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.name = "";
		this.type = ProjectType.TRADITIONAL;
	}

	public async create(): Promise<void> {
		const app: App = this.plugin.app;
		const settings: I_Settings = this.plugin.settings;

		let project: TFolder | null = null;

		try {
			project = await app.vault.createFolder(settings.projectFolderPath + "/" + this.name);
		} catch (error) {
			new Notice("Project already exists. Project creation aborted.", 5000);
			return;
		}

		const projectOverview: TFile | null = await createMarkdownFile(
			app,
			project,
			settings.projectOverviewTemplatePath,
			settings.projectOverviewFileName,
		);

		if (this.type === ProjectType.TRADITIONAL) {
			//
		} else if (this.type === ProjectType.AGILE) {
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
