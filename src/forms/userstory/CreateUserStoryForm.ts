import ZonzonsProjectManagement from "../../main";
import { Notice, TFolder } from "obsidian";
import { FileService } from "../../services/FileService";

export class CreateUserStoryForm {
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
			new Notice("Project not found. User story creation aborted.", 5000);
			return;
		}

		await this.fileService.createUserStoryMarkdownFile(this.project, this.name);
	}
}
