import ZonzonsProjectManagement from "../../main";
import { Notice, TFile, TFolder } from "obsidian";
import { FileService } from "../../services/FileService";
import { I_HasFileName } from "../../interfaces/I_HasFileName";
import { MarkdownFilePayload } from "../../types/MarkdownFilePayload";
import { I_HasTitle } from "../../interfaces/I_HasTitle";

export class CreateUserStoryForm implements I_HasFileName, I_HasTitle {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public project: TFolder | null;
	public fileName: string;
	public title: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.project = null;
		this.fileName = "";
		this.title = "";
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

		const userStoryPayload: MarkdownFilePayload = {
			fileName: this.plugin.settings.userStoriesFolderName + "/" + this.fileName,
			title: this.title,
		}

		const userStory: TFile | null = await this.fileService.createUserStoryMarkdownFile(this.project, userStoryPayload);

		if (!userStory) {
			return;
		}

		await this.plugin.app.workspace.getLeaf(true).openFile(userStory);
	}
}
