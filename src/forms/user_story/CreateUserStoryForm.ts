import ZonzonsProjectManagement from "../../main";
import {TFile, TFolder} from "obsidian";
import {I_HasFileName} from "../../interfaces/I_HasFileName";
import {I_HasInlineTitle} from "../../interfaces/I_HasInlineTitle";
import {I_HasIdentifier} from "../../interfaces/I_HasIdentifier";
import {UserStoryService} from "../../services/UserStoryService";
import {ProjectRepository} from "../../repositories/ProjectRepository";
import {EpicRepository} from "../../repositories/EpicRepository";

export class CreateUserStoryForm implements I_HasFileName, I_HasInlineTitle, I_HasIdentifier {
	public plugin: ZonzonsProjectManagement;
	public projectRepository: ProjectRepository;
	public epicRepository: EpicRepository;
	public userStoryService: UserStoryService;
	public project: TFolder | null;
	public epic: TFile | null;
	public fileName: string;
	public hasInlineTitle: boolean;
	public inlineTitle: string;
	public identifier: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.projectRepository = new ProjectRepository(plugin);
		this.epicRepository = new EpicRepository(plugin);
		this.userStoryService = new UserStoryService(plugin);
		this.project = null;
		this.epic = null;
		this.fileName = "";
		this.hasInlineTitle = false;
		this.inlineTitle = "";
		this.identifier = "";
	}

	public setProject(projectName: string): void {
		this.project = this.projectRepository.getFolderByName(projectName);
	}

	public getProjectName(): string {
		return this.project?.name ?? "";
	}

	public setEpic(identifier: string): void {
		if (!this.project) return;

		this.epic = this.epicRepository.getByIdentifier(this.project, identifier);
	}

	public getEpicName(): string {
		return this.epic?.name ?? "";
	}

	public getEpicIdentifier(): string {
		if (!this.epic) return "";
		else return this.epicRepository.getIdentifier(this.epic) ?? "";
	}

	public async create(): Promise<void> {
		await this.userStoryService.create(this.project, this.epic, this.fileName, this.inlineTitle);
	}
}
