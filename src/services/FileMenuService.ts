import ZonzonsProjectManagement from "../main";
import {Menu, MenuItem, TAbstractFile, TFile, TFolder} from "obsidian";
import { translate } from "../i18n";
import { CreateProjectModal } from "../modals/project/CreateProjectModal";
import { CreateEpicModal } from "../modals/epic/CreateEpicModal";
import { CreateUserStoryModal } from "../modals/user_story/CreateUserStoryModal";
import { ProjectType } from "../enums/ProjectType";
import {ProjectRepository} from "../repositories/ProjectRepository";
import {MarkdownMetadataHelper} from "../helpers/MarkdownMetadataHelper";

export class FileMenuService {
	public static initialize(plugin: ZonzonsProjectManagement): void {
		plugin.app.workspace.on("file-menu", (menu: Menu, file: TAbstractFile, source: string): void => {
			if (file instanceof TFolder && file.path === plugin.settings.projectsFolderPath) {
				this.addCreateProjectMenuItem(plugin, menu);
			}

			if (file instanceof TFolder) {
				const repository: ProjectRepository = new ProjectRepository(plugin);

				const overview: TFile | null = repository.getOverview(file);
				if (!overview) return;

				const type: ProjectType | null = MarkdownMetadataHelper.getProjectType(plugin.app, plugin.settings, overview);
				if (!type) return;

				if (type === ProjectType.AGILE) {
					if (file.parent?.path === plugin.settings.projectsFolderPath) {
						this.addCreateEpicMenuItem(plugin, menu, file.name);

						this.addCreateUserStoryMenuItem(plugin, menu, file.name);
					}
				}

				if (type === ProjectType.AGILE) {
					if (file.parent?.parent?.path === plugin.settings.projectsFolderPath) {
						if (file.name === plugin.settings.epicsFolderName) {
							this.addCreateEpicMenuItem(plugin, menu, file.parent.name);
						}

						if (file.name === plugin.settings.userStoriesFolderName) {
							this.addCreateUserStoryMenuItem(plugin, menu, file.parent.name);
						}
					}
				}
			}
		});
	}

	static addCreateProjectMenuItem(plugin: ZonzonsProjectManagement, menu: Menu): void {
		menu.addItem((item: MenuItem): void => {
			item.setTitle(translate("file_menu.items.create_project"))
				.setIcon("folder-plus")
				.onClick((): void => {
					new CreateProjectModal(plugin).open();
				});
		});
	}

	static addCreateEpicMenuItem(plugin: ZonzonsProjectManagement, menu: Menu, projectName: string): void {
		menu.addItem((item: MenuItem): void => {
			item.setTitle(translate("file_menu.items.create_epic"))
				.setIcon("file-plus")
				.onClick((): void => {
					new CreateEpicModal(plugin, projectName).open();
				});
		});
	}

	static addCreateUserStoryMenuItem(plugin: ZonzonsProjectManagement, menu: Menu, projectName: string): void {
		menu.addItem((item: MenuItem): void => {
			item.setTitle(translate("file_menu.items.create_user_story"))
				.setIcon("clipboard-plus")
				.onClick((): void => {
					new CreateUserStoryModal(plugin, projectName).open();
				});
		})
	}
}
