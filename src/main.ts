import {
	Plugin,
} from 'obsidian';
import { DEFAULT_SETTINGS, I_Settings } from "./settings/Settings";
import { SettingTab } from "./settings/SettingTab";

export default class ZonzonsProjectManagement extends Plugin {
	settings!: I_Settings;

	async onload(): Promise<void> {
		await this.loadSettings();

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
