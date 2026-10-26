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

		new Setting(containerEl).setName("General").setHeading();

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

		const projectOverviewGroupEl: HTMLDivElement = containerEl.createDiv({ cls: "setting-group" });
		const projectOverviewItemsEl: HTMLDivElement = projectOverviewGroupEl.createDiv({ cls: "setting-items" });

		new Setting(projectOverviewItemsEl)
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

		new Setting(projectOverviewItemsEl)
			.setName("Project overview file name")
			.setDesc("The name given to the project overview file of each project.")
			.addText((text: TextComponent) => text
				.setPlaceholder("Enter the name of the project overview file.")
				.setValue(this.plugin.settings.projectOverviewFileName)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.projectOverviewFileName = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl).setName("Traditional project management").setHeading();

		const traditionalDashboardGroupEl: HTMLDivElement = containerEl.createDiv({ cls: "setting-group" });
		const traditionalDashboardItemsEl: HTMLDivElement = traditionalDashboardGroupEl.createDiv({ cls: "setting-items" });

		new Setting(traditionalDashboardItemsEl)
			.setName("Dashboard template path")
			.setDesc("the path to the template dashboards will be created with.")
			.addText((text: TextComponent): void => {
				text.setPlaceholder("Start to type the name of a file...")
					.setValue(this.plugin.settings.traditionalDashboardTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.traditionalDashboardTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new BaseFileSuggest(this.app, text.inputEl);
			});

		new Setting(traditionalDashboardItemsEl)
			.setName("Dashboard file name")
			.setDesc("The name given to the dashboard file of each traditional project.")
			.addText((text: TextComponent) => text
				.setPlaceholder("Enter the name of the dashboard file.")
				.setValue(this.plugin.settings.traditionalDashboardFileName)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.traditionalDashboardFileName = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl).setName("AGILE project management").setHeading();

		new Setting(containerEl)
			.setName("Dashboard template path")
			.setDesc("The path to the template dashboards will be created with.")
			.addText((text: TextComponent): void => {
				text.setPlaceholder("Start to type the name of a file...")
					.setValue(this.plugin.settings.agileDashboardTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.agileDashboardTemplatePath = value;
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
