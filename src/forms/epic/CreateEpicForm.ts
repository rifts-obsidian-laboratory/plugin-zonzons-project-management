import ZonzonsProjectManagement from "../../main";
import { Notice, TFile, TFolder } from "obsidian";
import { FileService } from "../../services/FileService";
import { I_HasFileName } from "../../interfaces/I_HasFileName";
import { I_HasTitle } from "../../interfaces/I_HasTitle";
import { MarkdownFilePayload } from "../../types/MarkdownFilePayload";
import {I_HasIdentifier} from "../../interfaces/I_HasIdentifier";

export class CreateEpicForm implements I_HasFileName, I_HasTitle, I_HasIdentifier {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public project: TFolder | null;
	public fileName: string;
	public hasTitle: boolean;
	public title: string;
	public identifier: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.project = null;
		this.fileName = "";
		this.hasTitle = false;
		this.title = "";
		this.identifier = this.plugin.settings.epicIdentifierPrefix;
	}

	public setProject(projectName: string): void {
		this.project = this.fileService.getProjectFolder(projectName);
	}

	public getProject(): string {
		return this.project?.name ?? "";
	}

	public async create(): Promise<void> {
		if (!this.project) {
			new Notice("Project not found. Epic creation aborted.", 5000);
			return;
		}

		const epicsFolder: TFolder | null = this.plugin.app.vault.getFolderByPath(this.project.path + "/" + this.plugin.settings.epicsFolderName);

		const epicPayload: MarkdownFilePayload = {
			filePath: this.plugin.settings.epicsFolderName + "/" + this.fileName,
			fileName: this.fileName,
			title: this.title,
			identifier: this.identifier + ((epicsFolder?.children.length ?? 0) + 1)
		}

		const epic: TFile | null = await this.fileService.createEpicMarkdownFile(this.project, epicPayload);

		if (!epic) {
			return;
		}

		await this.plugin.app.workspace.getLeaf(true).openFile(epic);
	}
}
