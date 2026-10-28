import {
	Plugin,
} from 'obsidian';
import { DEFAULT_SETTINGS, I_Settings } from "./settings/Settings";
import { SettingTab } from "./settings/SettingTab";
import { CreateProjectModal } from "./modals/project/CreateProjectModal";
import { CreateEpicModal } from "./modals/epic/CreateEpicModal";
import { CreateUserStoryModal } from "./modals/user_story/CreateUserStoryModal";
import { translate } from "./i18n";

export default class ZonzonsProjectManagement extends Plugin {
	settings!: I_Settings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addCommand({
			id: "create-project",
			name: translate("commands.create_project"),
			callback: (): void => {
				new CreateProjectModal(this).open();
			}
		});

		this.addCommand({
			id: "create-epic",
			name: translate("commands.create_epic"),
			callback: (): void => {
				new CreateEpicModal(this).open();
			}
		});

		this.addCommand({
			id: "create-user-story",
			name: translate("commands.create_user_story"),
			callback: (): void => {
				new CreateUserStoryModal(this).open();
			}
		});

		this.addRibbonIcon(
			'folder-plus',
			translate("ribbon_icons.create_project"),
			(): void => {
				new CreateProjectModal(this).open();
			}
		);

		this.addRibbonIcon(
			'file-plus',
			translate("ribbon_icons.create_epic"),
			(): void => {
				new CreateEpicModal(this).open();
			}
		);

		this.addRibbonIcon(
			'clipboard-plus',
			translate("ribbon_icons.create_user_story"),
			(): void => {
				new CreateUserStoryModal(this).open();
			}
		);

		this.addSettingTab(new SettingTab(this.app, this));
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
	}
}
