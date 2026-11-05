import ZonzonsProjectManagement from "../main";
import {I_Settings} from "../settings/Settings";
import {ProjectRepository} from "../repositories/ProjectRepository";
import {EpicRepository} from "../repositories/EpicRepository";
import {Notice, TFile, TFolder} from "obsidian";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";
import {MarkdownFileType} from "../enums/MarkdownFileType";
import {PathHelper} from "../helpers/PathHelper";

export class EpicService {
	plugin: ZonzonsProjectManagement;
	settings: I_Settings;
	projectRepository: ProjectRepository;
	epicRepository: EpicRepository;

	constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.settings = plugin.settings;
		this.projectRepository = new ProjectRepository(plugin);
		this.epicRepository = new EpicRepository(plugin);
	}

	async create(project: TFolder | null, name: string, title: string): Promise<void> {
		try {
			if (!project) throw new Error("Selected project not found.");

			const epicsFolder: TFolder | null = this.epicRepository.getEpicsFolder(project);
			if (!epicsFolder) throw new Error("Project's epics folder not found.");

			const payload: MarkdownFilePayload = {
				type: MarkdownFileType.EPIC,
				filePath: PathHelper.buildMarkdownFilePath(this.settings.epicsFolderName, name),
				fileName: name,
				title,
				projectName: project.name,
				epicIdentifier: this.generateIdentifier(epicsFolder)
			};

			const epic: TFile | null = await this.epicRepository.createEpicFile(project, payload);
			if (!epic) throw new Error("Epic file couldn't be created.");

			await this.plugin.app.workspace.getLeaf(true).openFile(epic);
		} catch (error) {
			new Notice("Epic creation aborted: " + String(error), 5000);
		}
	}

	generateIdentifier(epicsFolder: TFolder): string {
		return this.settings.epicIdentifierPrefix + (epicsFolder.children.length + 1);
	}
}
