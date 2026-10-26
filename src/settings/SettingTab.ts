import { App, PluginSettingTab, Setting, TextComponent } from "obsidian";
import ZonzonsProjectManagement from "../main";
import { FolderSuggest } from "../suggests/FolderSuggest";

export class SettingTab extends PluginSettingTab {
	plugin: ZonzonsProjectManagement;

	constructor(app: App, plugin: ZonzonsProjectManagement) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Project folder path")
			.setDesc("The path to the folder where new projects will be scaffolded.")
			.addText((text: TextComponent): void => {
				text.setPlaceholder("Start to type the name of a folder...")
					.setValue(this.plugin.settings.projectFolderPath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.projectFolderPath = value;
						await this.plugin.saveSettings();
					});

				new FolderSuggest(this.app, text.inputEl);
			});
	}
}
