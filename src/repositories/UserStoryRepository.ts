import {App, TFile, TFolder} from "obsidian";
import {I_Settings} from "../settings/Settings";
import ZonzonsProjectManagement from "../main";
import {MarkdownMetadataHelper} from "../helpers/MarkdownMetadataHelper";
import {PathHelper} from "../helpers/PathHelper";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";
import {FileHelper} from "../helpers/FileHelper";

export class UserStoryRepository {
	app: App;
	settings: I_Settings;

	constructor(plugin: ZonzonsProjectManagement) {
		this.app = plugin.app;
		this.settings = plugin.settings;
	}

	// <editor-fold desc="About the global user stories folder.">
	async createUserStoriesFolder(project: TFolder): Promise<TFolder> {
		return await this.app.vault.createFolder(PathHelper.join(project.path, this.settings.userStoriesFolderName));
	}

	getUserStoriesFolder(project: TFolder): TFolder | null {
		return this.app.vault.getFolderByPath(PathHelper.join(project.path, this.settings.userStoriesFolderName));
	}
	// </editor-fold>

	// <editor-fold desc="About a targeted user story's file.">
	async createUserStoryFile(project: TFolder, payload: MarkdownFilePayload): Promise<TFile | null> {
		return await FileHelper.createMarkdownFile(
			this.app,
			this.settings,
			project,
			this.settings.userStoryTemplatePath,
			payload
		);
	}

	getByName(project: TFolder, name: string): TFile | null {
		const userStoriesFolder: TFolder | null = this.getUserStoriesFolder(project);
		if (!userStoriesFolder) return null;

		return this.app.vault.getFileByPath(PathHelper.buildMarkdownFilePath(userStoriesFolder.path, name));
	}

	getByIdentifier(project: TFolder, identifier: string): TFile | null {
		const userStoriesFolder: TFolder | null = this.getUserStoriesFolder(project);
		if (!userStoriesFolder) return null;

		for (const file of userStoriesFolder.children) {
			if (!(file instanceof TFile)) continue;

			if (this.getIdentifier(file) === identifier) return file;
		}

		return null;
	}

	buildPath(project: TFolder, name: string): string | null {
		const userStoriesFolder: TFolder | null = this.getUserStoriesFolder(project);
		if (!userStoriesFolder) return null;

		return PathHelper.buildMarkdownFilePath(userStoriesFolder.path, name);
	}

	exists(project: TFolder, identifier: string): boolean {
		return Boolean(this.getByIdentifier(project, identifier));
	}

	getIdentifier(userStory: TFile): string | null {
		return MarkdownMetadataHelper.getIdentifier(this.app, this.settings, userStory);
	}
	// </editor-fold>
}
