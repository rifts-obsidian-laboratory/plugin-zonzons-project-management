import { App, TFile, TFolder } from "obsidian";
import { I_Settings } from "../settings/Settings";
import ZonzonsProjectManagement from "../main";
import { FileHelper } from "../helpers/FileHelper";

export class FileService {
	app: App;
	settings: I_Settings;
	fileHelper: FileHelper;

	constructor(plugin: ZonzonsProjectManagement) {
		this.app = plugin.app;
		this.settings = plugin.settings;
		this.fileHelper = new FileHelper(this.app);
	}

	getProjectFolder(name: string): TFolder | null {
		return this.app.vault.getFolderByPath(this.settings.projectFolderPath + "/" + name);
	}

	async createProjectFolder(name: string): Promise<TFolder> {
		return await this.app.vault.createFolder(this.settings.projectFolderPath + "/" + name);
	}

	async createProjectOverviewMarkdownFile(project: TFolder): Promise<TFile | null> {
		return await this.fileHelper.createMarkdownFile(
			project,
			this.settings.projectOverviewTemplatePath,
			this.settings.projectOverviewFileName
		);
	}

	async createAgileDashboardBaseFile(project: TFolder): Promise<TFile | null> {
		return await this.fileHelper.createBaseFile(
			project,
			this.settings.agileDashboardTemplatePath,
			this.settings.agileDashboardFileName
		)
	}

	async createEpicFolder(project: TFolder): Promise<TFolder> {
		return await this.app.vault.createFolder(project.path + "/" + this.settings.epicFolderName);
	}

	async createEpicMarkdownFile(project: TFolder, name: string): Promise<TFile | null> {
		return await this.fileHelper.createMarkdownFile(
			project,
			this.settings.epicTemplatePath,
			this.settings.epicFolderName + "/" + name
		);
	}

	async createUserStoryFolder(project: TFolder): Promise<TFolder> {
		return await this.app.vault.createFolder(project.path + "/" + this.settings.userStoryFolderName);
	}

	async createUserStoryMarkdownFile(project: TFolder, name: string): Promise<TFile | null> {
		return await this.fileHelper.createMarkdownFile(
			project,
			this.settings.userStoryTemplatePath,
			this.settings.userStoryFolderName + "/" + name
		);
	}
}
