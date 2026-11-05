import ZonzonsProjectManagement from "../../main";
import {TFolder} from "obsidian";
import {I_HasFileName} from "../../interfaces/I_HasFileName";
import {I_HasTitle} from "../../interfaces/I_HasTitle";
import {I_HasIdentifier} from "../../interfaces/I_HasIdentifier"
import {EpicService} from "../../services/EpicService";
import {ProjectRepository} from "../../repositories/ProjectRepository";

export class CreateEpicForm implements I_HasFileName, I_HasTitle, I_HasIdentifier {
	public projectRepository: ProjectRepository;
	public epicService: EpicService;
	public project: TFolder | null;
	public fileName: string;
	public hasTitle: boolean;
	public title: string;
	public identifier: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.projectRepository = new ProjectRepository(plugin);
		this.epicService = new EpicService(plugin);
		this.project = null;
		this.fileName = "";
		this.hasTitle = false;
		this.title = "";
		this.identifier = "";
	}

	public setProject(projectName: string): void {
		this.project = this.projectRepository.getFolderByName(projectName);
	}

	public getProject(): string {
		return this.project?.name ?? "";
	}

	public async create(): Promise<void> {
		await this.epicService.create(this.project, this.fileName, this.title);
	}
}
