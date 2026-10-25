import {
	Plugin,
} from 'obsidian';

export default class ZonzonsProjectManagement extends Plugin {
	async onload() {
		await this.loadSettings();
	}

	onunload() {
		//
	}

	async loadSettings() {
		//
	}

	async saveSettings() {
		// await this.saveData(this.settings);
	}
}
