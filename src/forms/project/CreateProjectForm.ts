import { Notice, TFolder } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { ProjectType } from "../../enums/ProjectType";
import { FileService } from "../../services/FileService";

export class CreateProjectForm {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public name: string;
	public type: ProjectType;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.name = "";
		this.type = ProjectType.TRADITIONAL;
	}

	public async create(): Promise<void> {
		let project: TFolder | null = null;

		try {
			project = await this.fileService.createProjectFolder(this.name);
		} catch (error) {
			new Notice("Project already exists. Project creation aborted.", 5000);
			return;
		}

		await this.fileService.createProjectOverviewMarkdownFile(project);

		if (this.type === ProjectType.TRADITIONAL) {
			//
		} else if (this.type === ProjectType.AGILE) {
			await this.fileService.createAgileDashboardBaseFile(project);

			await this.fileService.createEpicFolder(project);
			await this.fileService.createUserStoryFolder(project);
		} else {
			await this.plugin.app.vault.delete(project, true);
			new Notice("Project type not supported. Project creation aborted.", 5000);
		}
	}
}
