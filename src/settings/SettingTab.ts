import { App, PluginSettingTab } from "obsidian";
import ZonzonsProjectManagement from "../main";

export class SettingTab extends PluginSettingTab {
	plugin: ZonzonsProjectManagement;

	constructor(app: App, plugin: ZonzonsProjectManagement) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		// Ajouter les éléments du panneau. :3
	}
}
