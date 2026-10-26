import { App, TFile, TFolder } from "obsidian";
import { I_Settings } from "../settings/Settings";
import ZonzonsProjectManagement from "../main";
import { createBaseFile, createMarkdownFile } from "../helpers/file";

export class FileService {
	plugin: ZonzonsProjectManagement;
	app: App;
	settings: I_Settings;

	constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.app = plugin.app;
		this.settings = plugin.settings;
	}

	async createProjectFolder(name: string): Promise<TFolder> {
		return await this.app.vault.createFolder(this.settings.projectFolderPath + "/" + name);
	}

	async createProjectOverviewMarkdownFile(project: TFolder): Promise<TFile | null> {
		return await createMarkdownFile(
			this.app,
			project,
			this.settings.projectOverviewTemplatePath,
			this.settings.projectOverviewFileName
		);
	}

	async createAgileDashboardBaseFile(project: TFolder): Promise<TFile | null> {
		return await createBaseFile(
			this.app,
			project,
			this.settings.agileDashboardTemplatePath,
			this.settings.agileDashboardFileName
		)
	}

	async createEpicFolder(project: TFolder): Promise<TFolder> {
		return await this.app.vault.createFolder(project.path + "/" + this.settings.epicFolderName);
	}

	async createEpicMarkdownFile(project: TFolder, name: string): Promise<TFile | null> {
		return await createMarkdownFile(
			this.app,
			project,
			this.settings.epicTemplatePath,
			this.settings.epicFolderName + "/" + name
		);
	}

	async createUserStoryFolder(project: TFolder): Promise<TFolder> {
		return await this.app.vault.createFolder(project.path + "/" + this.settings.userStoryFolderName);
	}
}
