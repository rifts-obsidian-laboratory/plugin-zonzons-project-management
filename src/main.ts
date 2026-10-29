import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, I_Settings } from "./settings/Settings";
import { SettingTab } from "./settings/SettingTab";
import { CreateProjectModal } from "./modals/project/CreateProjectModal";
import { CreateEpicModal } from "./modals/epic/CreateEpicModal";
import { CreateUserStoryModal } from "./modals/user_story/CreateUserStoryModal";
import { translate } from "./i18n";
import { CommandService } from "./services/CommandService";
import { FileMenuService } from "./services/FileMenuService";

export default class ZonzonsProjectManagement extends Plugin {
	settings!: I_Settings;
	settingTab: SettingTab | undefined;
	createProjectRibbonButton: HTMLElement | undefined;
	createEpicRibbonButton: HTMLElement | undefined;
	createUserStoryRibbonButton: HTMLElement | undefined;

	async onload(): Promise<void> {
		await this.loadSettings();

		CommandService.initialize(this);
		FileMenuService.initialize(this);

		this.refreshRibbonButtons();

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
}
