import { App, PluginSettingTab, Setting, TextComponent } from "obsidian";
import ZonzonsProjectManagement from "../main";
import { FolderSuggest } from "../suggests/FolderSuggest";
import { MarkdownFileSuggest } from "../suggests/MarkdownFileSuggest";
import { BaseFileSuggest } from "../suggests/BaseFileSuggest";

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

		new Setting(containerEl)
			.setName("Project overview template path")
			.setDesc("The path to the template project overviews will be created with.")
			.addText((text: TextComponent): void => {
				text.setPlaceholder("Start to type the name of a file...")
					.setValue(this.plugin.settings.projectOverviewTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.projectOverviewTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new MarkdownFileSuggest(this.app, text.inputEl);
			});

		new Setting(containerEl)
			.setName("Dashboard template path")
			.setDesc("The path to the template dashboards will be created with.")
			.addText((text: TextComponent): void => {
				text.setPlaceholder("Start to type the name of a file...")
					.setValue(this.plugin.settings.dashboardTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.dashboardTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new BaseFileSuggest(this.app, text.inputEl);
			});

		new Setting(containerEl)
			.setName("Epic template path")
			.setDesc("The path to the template epics will be created with.")
			.addText((text: TextComponent): void => {
				text.setPlaceholder("Start to type the name of a file...")
					.setValue(this.plugin.settings.epicTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.epicTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new MarkdownFileSuggest(this.app, text.inputEl);
			});

		new Setting(containerEl)
			.setName("User story template path")
			.setDesc("The path to the template user stories will be created with.")
			.addText((text: TextComponent): void => {
				text.setPlaceholder("Start to type the name of a file...")
					.setValue(this.plugin.settings.userStoryTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.userStoryTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new MarkdownFileSuggest(this.app, text.inputEl);
			});
	}
}
