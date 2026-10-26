import ZonzonsProjectManagement from "../../main";
import { Notice, TFolder } from "obsidian";
import { FileService } from "../../services/FileService";

export class CreateUserStoryForm {
	public plugin: ZonzonsProjectManagement;
	public project: TFolder | null;
	public name: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.project = null;
		this.name = "";
	}

	public setProject(projectName: string): void {
		this.project = this.plugin.app.vault.getFolderByPath(this.plugin.settings.projectFolderPath + "/" + projectName);
	}

	public async create(): Promise<void> {
		const fileService: FileService = new FileService(this.plugin);

		if (!this.project) {
			new Notice("Project not found. User story creation aborted.", 5000);
			return;
		}

		await fileService.createUserStoryMarkdownFile(this.project, this.name);
	}
}
