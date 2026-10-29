import ZonzonsProjectManagement from "../../main";
import { FileService } from "../../services/FileService";
import { Notice, TFolder } from "obsidian";

export class DeleteProjectForm {
	public plugin: ZonzonsProjectManagement;
	public fileService: FileService;
	public folderName: string;

	public constructor(plugin: ZonzonsProjectManagement) {
		this.plugin = plugin;
		this.fileService = new FileService(plugin);
		this.folderName = "";
	}

	public async delete(): Promise<void> {
		let project: TFolder | null = null;

		try {
			project = this.fileService.getProjectFolder(this.folderName);
			if (project) {
				delete this.plugin.settings.projects[project.name];
				await this.plugin.saveSettings();
				await this.plugin.app.vault.delete(project, true);
				this.plugin.settingTab?.display();
			}
			else throw new Error("Project doesn't exist anymore.");
		} catch (error) {
			new Notice("Failed to delete project", 5000);
		}
	}
}
