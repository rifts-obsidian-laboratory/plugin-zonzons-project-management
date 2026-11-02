import { Notice, TFile, TFolder } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { ProjectType } from "../../enums/ProjectType";
import { FileService } from "../../services/FileService";
import { I_HasFolderName } from "../../interfaces/I_HasFolderName";
import { MarkdownFilePayload } from "../../types/MarkdownFilePayload";
import { I_HasTitle } from "../../interfaces/I_HasTitle";
import {I_HasCode} from "../../interfaces/I_HasCode";

export class CreateProjectForm implements I_HasFolderName, I_HasTitle, I_HasCode {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public folderName: string;
	public type: ProjectType;
	public hasTitle: boolean;
	public title: string;
	public code: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.folderName = "";
		this.type = ProjectType.TRADITIONAL;
		this.hasTitle = false;
		this.title = "";
		this.code = "";
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
			filePath: this.plugin.settings.projectOverviewFileName,
			fileName: this.plugin.settings.projectOverviewFileName,
			title: this.title,
			code: this.code,
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
			await this.plugin.app.fileManager.trashFile(project);
			delete this.plugin.settings.projects[this.folderName];
			new Notice("Project type not supported. Project creation aborted.", 5000);
		}

		await this.plugin.saveSettings();
	}
}
