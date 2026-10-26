import {
	Plugin,
} from 'obsidian';
import { DEFAULT_SETTINGS, I_Settings } from "./settings/Settings";

export default class ZonzonsProjectManagement extends Plugin {
	settings!: I_Settings;

	async onload() {
		await this.loadSettings();
	}

	onunload() {
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
