import { Notice, TFile, TFolder } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { ProjectType } from "../../enums/ProjectType";
import { FileService } from "../../services/FileService";
import { I_HasFolderName } from "../../interfaces/I_HasFolderName";
import { MarkdownFilePayload } from "../../types/MarkdownFilePayload";

export class CreateProjectForm implements I_HasFolderName, I_HasTitle {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public folderName: string;
	public type: ProjectType;
	public title: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.folderName = "";
		this.type = ProjectType.TRADITIONAL;
		this.title = "";
	}

	public async create(): Promise<void> {
		let project: TFolder | null = null;

		try {
			project = await this.fileService.createProjectFolder(this.folderName);
			this.plugin.settings.projects[this.folderName] = this.type;
		} catch (error) {
			new Notice("Project already exists. Project creation aborted.", 5000);
			delete this.plugin.settings.projects[this.folderName];
			return;
		}

		let projectOverviewPayload: MarkdownFilePayload = {
			fileName: this.plugin.settings.projectOverviewFileName,
			title: this.title
		}

		const projectOverview: TFile | null = await this.fileService.createProjectOverviewMarkdownFile(project, projectOverviewPayload);

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
			delete this.plugin.settings.projects[this.folderName];
			new Notice("Project type not supported. Project creation aborted.", 5000);
		}

		await this.plugin.saveSettings();
	}
}
