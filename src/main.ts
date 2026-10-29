import { Menu, MenuItem, Plugin, TAbstractFile, TFolder } from 'obsidian';
import { DEFAULT_SETTINGS, I_Settings } from "./settings/Settings";
import { SettingTab } from "./settings/SettingTab";
import { CreateProjectModal } from "./modals/project/CreateProjectModal";
import { CreateEpicModal } from "./modals/epic/CreateEpicModal";
import { CreateUserStoryModal } from "./modals/user_story/CreateUserStoryModal";
import { translate } from "./i18n";
import { ProjectType } from "./enums/ProjectType";
import { CommandService } from "./services/CommandService";

export default class ZonzonsProjectManagement extends Plugin {
	settings!: I_Settings;
	settingTab: SettingTab | undefined;
	createProjectRibbonButton: HTMLElement | undefined;
	createEpicRibbonButton: HTMLElement | undefined;
	createUserStoryRibbonButton: HTMLElement | undefined;

	async onload(): Promise<void> {
		await this.loadSettings();

		CommandService.initialize(this);

		this.refreshRibbonButtons();

		this.addContextualActionsToFileMenu();

		this.settingTab = new SettingTab(this.app, this);
		this.addSettingTab(this.settingTab);
	}

	onunload(): void {
		//
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<I_Settings>
		);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
		this.refreshRibbonButtons();
	}

	refreshRibbonButtons(): void {
		this.createProjectRibbonButton = this.refreshRibbonButton(
			this.createProjectRibbonButton,
			this.settings.displayProjectCreationRibbonButton,
			"folder-plus",
			translate("ribbon_icons.create_project"),
			() => new CreateProjectModal(this).open()
		);

		this.createEpicRibbonButton = this.refreshRibbonButton(
			this.createEpicRibbonButton,
			this.settings.displayEpicCreationRibbonButton,
			"file-plus",
			translate("ribbon_icons.create_epic"),
			() => new CreateEpicModal(this).open()
		);

		this.createUserStoryRibbonButton = this.refreshRibbonButton(
			this.createUserStoryRibbonButton,
			this.settings.displayUserStoryCreationRibbonButton,
			"clipboard-plus",
			translate("ribbon_icons.create_user_story"),
			() => new CreateUserStoryModal(this).open()
		);
	}

	refreshRibbonButton(button: HTMLElement | undefined, visible: boolean, icon: string, label: string, callback: () => void): HTMLElement | undefined {
		if (!visible) {
			button?.remove();
			return undefined;
		}

		return button ?? this.addRibbonIcon(icon, label, callback);
	}

	addContextualActionsToFileMenu(): void {
		this.app.workspace.on("file-menu", (menu: Menu, file: TAbstractFile, source: string): void => {
			if (file instanceof TFolder && file.path === this.settings.projectFolderPath) {
				menu.addItem((item: MenuItem): void => {
					item.setTitle(translate("file_menu.items.create_project"))
						.setIcon("folder-plus")
						.onClick((): void => {
							new CreateProjectModal(this).open();
						});
				});
			}

			if (file instanceof TFolder) {
				if (this.settings.projects[file.name] === ProjectType.AGILE) {
					if (file.parent?.path === this.settings.projectFolderPath) {
						menu.addItem((item: MenuItem): void => {
							item.setTitle(translate("file_menu.items.create_epic"))
								.setIcon("file-plus")
								.onClick((): void => {
									new CreateEpicModal(this, file.name).open();
								});
						});

						menu.addItem((item: MenuItem): void => {
							item.setTitle(translate("file_menu.items.create_user_story"))
								.setIcon("clipboard-plus")
								.onClick((): void => {
									new CreateUserStoryModal(this, file.name).open();
								});
						})
					}
				}

				if (this.settings.projects[file.parent?.name ?? ""] === ProjectType.AGILE) {
					if (file.parent?.parent?.path === this.settings.projectFolderPath) {
						if (file.name === this.settings.epicFolderName) {
							menu.addItem((item: MenuItem): void => {
								item.setTitle(translate("file_menu.items.create_epic"))
									.setIcon("file-plus")
									.onClick((): void => {
										new CreateEpicModal(this, file.parent?.name).open();
									});
							});
						}

						if (file.name === this.settings.userStoryFolderName) {
							menu.addItem((item: MenuItem): void => {
								item.setTitle(translate("file_menu.items.create_user_story"))
									.setIcon("clipboard-plus")
									.onClick((): void => {
										new CreateUserStoryModal(this, file.parent?.name).open();
									});
							})
						}
					}
				}
			}
		});
	}
}
