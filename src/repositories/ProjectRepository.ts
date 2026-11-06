import {App, TAbstractFile, TFile, TFolder} from "obsidian";
import {I_Settings} from "../settings/Settings";
import ZonzonsProjectManagement from "../main";
import {MarkdownMetadataHelper} from "../helpers/MarkdownMetadataHelper";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";
import {PathHelper} from "../helpers/PathHelper";
import {FileHelper} from "../helpers/FileHelper";

export class ProjectRepository {
	app: App;
	settings: I_Settings;

	constructor(plugin: ZonzonsProjectManagement) {
		this.app = plugin.app;
		this.settings = plugin.settings;
	}

	// <editor-fold desc="About the global projects folder.">
	getProjectsFolder(): TFolder | null {
		return this.app.vault.getFolderByPath(this.settings.projectsFolderPath);
	}
	// </editor-fold>

	// <editor-fold desc="About a targeted project's folder.">
	async createFolder(name: string): Promise<TFolder> {
		return await this.app.vault.createFolder(PathHelper.join(this.settings.projectsFolderPath, name));
	}

	getFolderByName(name: string): TFolder | null {
		return this.app.vault.getFolderByPath(PathHelper.join(this.settings.projectsFolderPath, name));
	}

	getFolderByIdentifier(identifier: string): TFolder | null {
		const projectsFolder: TFolder | null = this.getProjectsFolder();
		if (!projectsFolder) return null;

		for (const file of projectsFolder.children) {
			if (!(file instanceof TFolder)) continue;

			if (this.getIdentifier(file) === identifier) return file;
		}

		return null;
	}

	getFolderByPath(path: string): TFolder | null {
		return this.app.vault.getFolderByPath(path);
	}

	exists(name: string): boolean {
		return Boolean(this.getFolderByName(name));
	}

	async createDashboardFile(project: TFolder, templatePath: string, fileName: string): Promise<TFile | null> {
		return await FileHelper.createBaseFile(
			this.app,
			project,
			templatePath,
			fileName
		);
	}

	async createOverviewFile(project: TFolder, payload: MarkdownFilePayload): Promise<TFile | null> {
		return await FileHelper.createMarkdownFile(
			this.app,
			this.settings,
			project,
			this.settings.projectOverviewTemplatePath,
			payload
		);
	}

	getOverview(project: TFolder): TFile | null {
		let path: string = PathHelper.buildMarkdownFilePath(project.path, this.settings.projectOverviewFileName);

		const overviewFile: TAbstractFile | null = this.app.vault.getAbstractFileByPath(path);
		if (!(overviewFile instanceof TFile)) return null;

		return overviewFile;
	}

	getIdentifier(project: TFolder): string | null {
		const overviewFile: TAbstractFile | null = this.getOverview(project);
		if (!(overviewFile instanceof TFile)) return null;

		return MarkdownMetadataHelper.getIdentifier(this.app, this.settings, overviewFile);
	}

	async deleteFolder(project: TFolder): Promise<void> {
		await this.app.fileManager.trashFile(project);
	}
	// </editor-fold>
}
