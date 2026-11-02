import ZonzonsProjectManagement from "../../main";
import { Notice, TFile, TFolder } from "obsidian";
import { FileService } from "../../services/FileService";
import { I_HasFileName } from "../../interfaces/I_HasFileName";
import { MarkdownFilePayload } from "../../types/MarkdownFilePayload";
import { I_HasTitle } from "../../interfaces/I_HasTitle";
import {I_HasCode} from "../../interfaces/I_HasCode";

export class CreateUserStoryForm implements I_HasFileName, I_HasTitle, I_HasCode {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public project: TFolder | null;
	public fileName: string;
	public hasTitle: boolean;
	public title: string;
	public code: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.project = null;
		this.fileName = "";
		this.hasTitle = false;
		this.title = "";
		this.code = this.plugin.settings.userStoryCodePrefix;
	}

	public setProject(projectName: string): void {
		this.project = this.fileService.getProjectFolder(projectName);
	}

	public getProject(): string {
		return this.project?.name ?? "";
	}

	public async create(): Promise<void> {
		if (!this.project) {
			new Notice("Project not found. User story creation aborted.", 5000);
			return;
		}

		const userStoriesFolder: TFolder | null = this.plugin.app.vault.getFolderByPath(this.project.path + "/" + this.plugin.settings.userStoriesFolderName);

		const userStoryPayload: MarkdownFilePayload = {
			filePath: this.plugin.settings.userStoriesFolderName + "/" + this.fileName,
			title: this.title,
			code: this.code + ((userStoriesFolder?.children.length ?? 0) + 1)
		}

		const userStory: TFile | null = await this.fileService.createUserStoryMarkdownFile(this.project, userStoryPayload);

		if (!userStory) {
			return;
		}

		await this.plugin.app.workspace.getLeaf(true).openFile(userStory);
	}
}
