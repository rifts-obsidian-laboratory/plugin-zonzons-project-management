import { Notice, TFolder } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { ProjectType } from "../../enums/ProjectType";
import { FileService } from "../../services/FileService";

export class CreateProjectForm {
	public plugin: ZonzonsProjectManagement;
	public name: string;
	public type: ProjectType;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.name = "";
		this.type = ProjectType.TRADITIONAL;
	}

	public async create(): Promise<void> {
		const fileService: FileService = new FileService(this.plugin);

		let project: TFolder | null = null;

		try {
			project = await fileService.createProjectFolder(this.name);
		} catch (error) {
			new Notice("Project already exists. Project creation aborted.", 5000);
			return;
		}

		await fileService.createProjectOverviewMarkdownFile(project);

		if (this.type === ProjectType.TRADITIONAL) {
			//
		} else if (this.type === ProjectType.AGILE) {
			await fileService.createAgileDashboardBaseFile(project);

			await fileService.createEpicFolder(project);
			await fileService.createUserStoryFolder(project);
		} else {
			await this.plugin.app.vault.delete(project, true);
			new Notice("Project type not supported. Project creation aborted.", 5000);
		}
	}
}
