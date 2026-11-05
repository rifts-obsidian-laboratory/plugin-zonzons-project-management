import {App, TFile, TFolder} from "obsidian";
import {I_Settings} from "../settings/Settings";
import ZonzonsProjectManagement from "../main";
import {MarkdownMetadataHelper} from "../helpers/MarkdownMetadataHelper";
import {PathHelper} from "../helpers/PathHelper";
import {FileHelper} from "../helpers/FileHelper";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";

export class EpicRepository {
	app: App;
	settings: I_Settings;

	constructor(plugin: ZonzonsProjectManagement) {
		this.app = plugin.app;
		this.settings = plugin.settings;
	}

	// <editor-fold desc="About the global epics folder.">
	async createEpicsFolder(project: TFolder): Promise<TFolder> {
		return await this.app.vault.createFolder(PathHelper.join(project.path, this.settings.epicsFolderName));
	}

	getEpicsFolder(project: TFolder): TFolder | null {
		return this.app.vault.getFolderByPath(PathHelper.join(project.path, this.settings.epicsFolderName));
	}
	// </editor-fold>

	// <editor-fold desc="About a targeted epic's file.">
	async createEpicFile(project: TFolder, payload: MarkdownFilePayload): Promise<TFile | null> {
		return await FileHelper.createMarkdownFile(
			this.app,
			this.settings,
			project,
			this.settings.epicTemplatePath,
			payload
		);
	}

	getByName(project: TFolder, name: string): TFile | null {
		const epicsFolder: TFolder | null = this.getEpicsFolder(project);
		if (!epicsFolder) return null;

		return this.app.vault.getFileByPath(PathHelper.buildMarkdownFilePath(epicsFolder.path, name));
	}

	getByIdentifier(project: TFolder, identifier: string): TFile | null {
		const epicsFolder: TFolder | null = this.getEpicsFolder(project);
		if (!epicsFolder) return null;

		for (const file of epicsFolder.children) {
			if (!(file instanceof TFile)) continue;

			if (this.getIdentifier(file) === identifier) return file;
		}

		return null;
	}

	buildPath(project: TFolder, name: string): string | null {
		const epicsFolder: TFolder | null = this.getEpicsFolder(project);
		if (!epicsFolder) return null;

		return PathHelper.buildMarkdownFilePath(epicsFolder.path, name);
	}

	exists(project: TFolder, identifier: string): boolean {
		return Boolean(this.getByIdentifier(project, identifier));
	}

	getIdentifier(epic: TFile): string | null {
		return MarkdownMetadataHelper.getIdentifier(this.app, this.settings, epic);
	}
	// </editor-fold>
}
