import {
	Plugin,
} from 'obsidian';
import { DEFAULT_SETTINGS, I_Settings } from "./settings/Settings";
import { SettingTab } from "./settings/SettingTab";
import { CreateProjectModal } from "./modals/project/CreateProjectModal";
import { CreateEpicModal } from "./modals/epic/CreateEpicModal";
import { CreateUserStoryModal } from "./modals/userstory/CreateUserStoryModal";

export default class ZonzonsProjectManagement extends Plugin {
	settings!: I_Settings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addCommand({
			id: "create-project",
			name: "Create project",
			callback: (): void => {
				new CreateProjectModal(this).open();
			}
		});

		this.addCommand({
			id: "create-epic",
			name: "Create epic",
			callback: (): void => {
				new CreateEpicModal(this).open();
			}
		});

		this.addCommand({
			id: "create-user-story",
			name: "Create user story",
			callback: (): void => {
				new CreateUserStoryModal(this).open();
			}
		});

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
