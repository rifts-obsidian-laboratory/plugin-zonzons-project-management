import ZonzonsProjectManagement from "../../main";
import {ProjectType} from "../../enums/ProjectType";
import {I_HasFolderName} from "../../interfaces/I_HasFolderName";
import {I_HasInlineTitle} from "../../interfaces/I_HasInlineTitle";
import {I_HasIdentifier} from "../../interfaces/I_HasIdentifier";
import {ProjectService} from "../../services/ProjectService";

export class CreateProjectForm implements I_HasFolderName, I_HasInlineTitle, I_HasIdentifier {
	public projectService: ProjectService;
	public folderName: string;
	public type: ProjectType;
	public hasInlineTitle: boolean;
	public inlineTitle: string;
	public identifier: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.projectService = new ProjectService(plugin);
		this.folderName = "";
		this.type = ProjectType.TRADITIONAL;
		this.hasInlineTitle = false;
		this.inlineTitle = "";
		this.identifier = "";
	}

	public async create(): Promise<void> {
		await this.projectService.create(this.type, this.folderName, this.inlineTitle, this.identifier);
	}
}
