import { Notice, TFile, TFolder } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { ProjectType } from "../../enums/ProjectType";
import { FileService } from "../../services/FileService";
import { I_HasFolderName } from "../../interfaces/I_HasFolderName";

export class CreateProjectForm implements I_HasFolderName {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public folderName: string;
	public type: ProjectType;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.folderName = "";
		this.type = ProjectType.TRADITIONAL;
	}

	public async create(): Promise<void> {
		let project: TFolder | null = null;

		try {
			project = await this.fileService.createProjectFolder(this.folderName);
		} catch (error) {
			new Notice("Project already exists. Project creation aborted.", 5000);
			return;
		}

		const projectOverview: TFile | null = await this.fileService.createProjectOverviewMarkdownFile(project);

		if (!projectOverview) {
			return;
		}

		await this.plugin.app.workspace.getLeaf(true).openFile(projectOverview);

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
