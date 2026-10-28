import ZonzonsProjectManagement from "../../main";
import { Notice, TFile, TFolder } from "obsidian";
import { FileService } from "../../services/FileService";
import { I_HasFileName } from "../../interfaces/I_HasFileName";
import { MarkdownFilePayload } from "../../types/MarkdownFilePayload";

export class CreateEpicForm implements I_HasFileName, I_HasTitle {
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

	public async create(): Promise<void> {
		if (!this.project) {
			new Notice("Project not found. Epic creation aborted.", 5000);
			return;
		}

		const epicPayload: MarkdownFilePayload = {
			fileName: this.fileName,
			title: this.title,
		}

		const epic: TFile | null = await this.fileService.createEpicMarkdownFile(this.project, epicPayload);

		if (!epic) {
			return;
		}

		await this.plugin.app.workspace.getLeaf(true).openFile(epic);
	}
}
