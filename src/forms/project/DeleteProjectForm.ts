import ZonzonsProjectManagement from "../../main";
import {ProjectService} from "../../services/ProjectService";

export class DeleteProjectForm {
	public projectService: ProjectService;
	public folderName: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.projectService = new ProjectService(plugin);
		this.folderName = "";
	}

	public async delete(): Promise<void> {
		await this.projectService.delete(this.folderName);
	}
}
