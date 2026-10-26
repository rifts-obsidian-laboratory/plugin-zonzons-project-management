import ZonzonsProjectManagement from "../../main";
import { Notice, TFile, TFolder } from "obsidian";
import { FileService } from "../../services/FileService";

export class CreateEpicForm {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public project: TFolder | null;
	public name: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.project = null;
		this.name = "";
	}

	public setProject(projectName: string): void {
		this.project = this.fileService.getProjectFolder(projectName);
	}

	public async create(): Promise<void> {
		if (!this.project) {
			new Notice("Project not found. Epic creation aborted.", 5000);
			return;
		}

		const epic: TFile | null = await this.fileService.createEpicMarkdownFile(this.project, this.name);

		if (!epic) {
			return;
		}

		await this.plugin.app.workspace.getLeaf(true).openFile(epic);
	}
}
