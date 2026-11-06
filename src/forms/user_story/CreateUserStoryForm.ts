import ZonzonsProjectManagement from "../../main";
import {TFolder} from "obsidian";
import {I_HasFileName} from "../../interfaces/I_HasFileName";
import {I_HasInlineTitle} from "../../interfaces/I_HasInlineTitle";
import {I_HasIdentifier} from "../../interfaces/I_HasIdentifier";
import {UserStoryService} from "../../services/UserStoryService";
import {ProjectRepository} from "../../repositories/ProjectRepository";

export class CreateUserStoryForm implements I_HasFileName, I_HasInlineTitle, I_HasIdentifier {
	public plugin: ZonzonsProjectManagement;
	public projectRepository: ProjectRepository;
	public userStoryService: UserStoryService;
	public project: TFolder | null;
	public fileName: string;
	public hasInlineTitle: boolean;
	public inlineTitle: string;
	public identifier: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.projectRepository = new ProjectRepository(plugin);
		this.userStoryService = new UserStoryService(plugin);
		this.project = null;
		this.fileName = "";
		this.hasInlineTitle = false;
		this.inlineTitle = "";
		this.identifier = "";
	}

	public setProject(projectName: string): void {
		this.project = this.projectRepository.getFolderByName(projectName);
	}

	public getProject(): string {
		return this.project?.name ?? "";
	}

	public async create(): Promise<void> {
		await this.userStoryService.create(this.project, this.fileName, this.inlineTitle);
	}
}
