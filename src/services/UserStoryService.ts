import ZonzonsProjectManagement from "../main";
import {I_Settings} from "../settings/Settings";
import {ProjectRepository} from "../repositories/ProjectRepository";
import {EpicRepository} from "../repositories/EpicRepository";
import {UserStoryRepository} from "../repositories/UserStoryRepository";
import {Notice, TFile, TFolder} from "obsidian";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";
import {MarkdownFileType} from "../enums/MarkdownFileType";
import {PathHelper} from "../helpers/PathHelper";
import {MarkdownMetadataHelper} from "../helpers/MarkdownMetadataHelper";

export class UserStoryService {
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

	async create(project: TFolder | null, epic: TFile | null,  name: string, inlineTitle: string): Promise<void> {
		try {
			if (!project) throw new Error("Selected project not found.");

			if (!epic) throw new Error("Selected epic not found.");

			const userStoriesFolder: TFolder | null = this.userStoryRepository.getUserStoriesFolder(project);
			if (!userStoriesFolder) throw new Error("Project's user stories folder not found.");

			const projectIdentifier: string | null = this.projectRepository.getIdentifier(project);
			const epicIdentifier: string | null = this.epicRepository.getIdentifier(epic);
			const identifier: string = this.generateIdentifier(userStoriesFolder);

			const payload: MarkdownFilePayload = {
				type: MarkdownFileType.USER_STORY,
				filePath: PathHelper.buildMarkdownFilePath(this.plugin.settings.userStoriesFolderName, name),
				fileName: name,
				inlineTitle,
				projectName: project.name,
				projectIdentifier: projectIdentifier ?? "",
				epicIdentifier: epicIdentifier ?? "",
				userStoryIdentifier: identifier
			}

			const userStory: TFile | null = await this.userStoryRepository.createUserStoryFile(project, payload);
			if (!userStory) throw new Error("User story couldn't be created.");

			await MarkdownMetadataHelper.setProjectLink(this.plugin, userStory, project);
			await MarkdownMetadataHelper.setEpicLink(this.plugin, userStory, epic);
			await MarkdownMetadataHelper.setIdentifier(this.plugin.app, this.settings, userStory, identifier);

			await this.plugin.app.workspace.getLeaf(true).openFile(userStory);
		} catch (error) {
			new Notice("User story creation aborted: " + String(error), 500);
		}
	}

	generateIdentifier(userStoriesFolder: TFolder): string {
		return this.settings.userStoryIdentifierPrefix + (userStoriesFolder.children.length + 1);
	}
}
