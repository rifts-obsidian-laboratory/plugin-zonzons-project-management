import {Notice, TFile, TFolder} from "obsidian";
import {ProjectRepository} from "../repositories/ProjectRepository";
import ZonzonsProjectManagement from "../main";
import {ProjectType} from "../enums/ProjectType";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";
import {MarkdownFileType} from "../enums/MarkdownFileType";
import {EpicRepository} from "../repositories/EpicRepository";
import {UserStoryRepository} from "../repositories/UserStoryRepository";
import {I_Settings} from "../settings/Settings";
import {MarkdownMetadataHelper} from "../helpers/MarkdownMetadataHelper";

export class ProjectService {
	plugin: ZonzonsProjectManagement;
	settings: I_Settings;
	projectRepository: ProjectRepository;
	epicRepository: EpicRepository;
	userStoryRepository: UserStoryRepository;

	constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.settings = plugin.settings;
		this.projectRepository = new ProjectRepository(plugin);
		this.epicRepository = new EpicRepository(plugin);
		this.userStoryRepository = new UserStoryRepository(plugin);
	}

	async create(type: ProjectType, name: string, overviewInlineTitle: string, identifier: string): Promise<void> {
		try {
			let project: TFolder = await this.projectRepository.createFolder(name);
			this.settings.projects[name] = type;

			let payload: MarkdownFilePayload = {
				type: MarkdownFileType.PROJECT,
				filePath: name,
				fileName: name,
				inlineTitle: overviewInlineTitle,
				projectName: name,
				projectIdentifier: identifier
			}

			const overview: TFile | null = await this.projectRepository.createOverviewFile(project, payload);
			if (!overview) throw new Error("Overview file couldn't be created.");

			await MarkdownMetadataHelper.setProjectType(this.plugin.app, this.settings, overview, type);
			await MarkdownMetadataHelper.setIdentifier(this.plugin.app, this.settings, overview, identifier);

			await this.plugin.app.workspace.getLeaf(true).openFile(overview);

			if (type === ProjectType.TRADITIONAL) {
				await this.projectRepository.createDashboardFile(project, this.settings.traditionalDashboardTemplatePath, this.settings.traditionalDashboardFileName);
			} else if (type === ProjectType.AGILE) {
				await this.projectRepository.createDashboardFile(project, this.settings.agileDashboardTemplatePath, this.settings.agileDashboardFileName);
				await this.epicRepository.createEpicsFolder(project);
				await this.userStoryRepository.createUserStoriesFolder(project);
			} else throw new Error("Project type is not recognized.");
		} catch (error) {
			new Notice("Project creation aborted: " + String(error), 5000);

			const project: TFolder | null = this.projectRepository.getFolderByName(name);
			if (!project) return;

			delete this.settings.projects[project.name];
			await this.projectRepository.deleteFolder(project);
		}

		await this.plugin.saveSettings();
	}

	async delete(name: string): Promise<void> {
		try {
			let project: TFolder | null = this.projectRepository.getFolderByName(name);
			if (!project) throw new Error("Project couldn't be found.");

			delete this.settings.projects[project.name];
			await this.projectRepository.deleteFolder(project);

			this.plugin.settingTab?.display();
		} catch (error) {
			new Notice("Failed to delete project: " + String(error), 5000);
		}

		await this.plugin.saveSettings();
	}
}
