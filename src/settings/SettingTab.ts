import { App, PluginSettingTab, Setting, TextComponent } from "obsidian";
import ZonzonsProjectManagement from "../main";
import { FolderSuggest } from "../suggests/FolderSuggest";
import { MarkdownFileSuggest } from "../suggests/MarkdownFileSuggest";
import { BaseFileSuggest } from "../suggests/BaseFileSuggest";
import { translate } from "../i18n";

export class SettingTab extends PluginSettingTab {
	plugin: ZonzonsProjectManagement;

	constructor(app: App, plugin: ZonzonsProjectManagement) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.addClass("zonzons-project-management-setting-tab");

		containerEl.empty();

		new Setting(containerEl).setName(translate("settings.global.title")).setHeading();

		new Setting(containerEl)
			.setName(translate("settings.global.project_folder.path.label"))
			.setDesc(translate("settings.global.project_folder.path.description"))
			.addText((text: TextComponent): void => {
				text.setPlaceholder(translate("settings.global.project_folder.path.placeholder"))
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
			.setName(translate("settings.global.project_overview.file_name.label"))
			.setDesc(translate("settings.global.project_overview.file_name.description"))
			.addText((text: TextComponent) => text
				.setPlaceholder(translate("settings.global.project_overview.file_name.placeholder"))
				.setValue(this.plugin.settings.projectOverviewFileName)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.projectOverviewFileName = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(projectOverviewItemsEl)
			.setName(translate("settings.global.project_overview.template_path.label"))
			.setDesc(translate("settings.global.project_overview.template_path.description"))
			.addText((text: TextComponent): void => {
				text.setPlaceholder(translate("settings.global.project_overview.template_path.placeholder"))
					.setValue(this.plugin.settings.projectOverviewTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.projectOverviewTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new MarkdownFileSuggest(this.app, text.inputEl);
			});

		new Setting(containerEl).setName(translate("settings.traditional_project_management.title")).setHeading();

		const traditionalDashboardGroupEl: HTMLDivElement = containerEl.createDiv({ cls: "setting-group" });
		const traditionalDashboardItemsEl: HTMLDivElement = traditionalDashboardGroupEl.createDiv({ cls: "setting-items" });

		new Setting(traditionalDashboardItemsEl)
			.setName(translate("settings.traditional_project_management.dashboard_file.name.label"))
			.setDesc(translate("settings.traditional_project_management.dashboard_file.name.description"))
			.addText((text: TextComponent) => text
				.setPlaceholder(translate("settings.traditional_project_management.dashboard_file.name.placeholder"))
				.setValue(this.plugin.settings.traditionalDashboardFileName)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.traditionalDashboardFileName = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(traditionalDashboardItemsEl)
			.setName(translate("settings.traditional_project_management.dashboard_file.template_path.label"))
			.setDesc(translate("settings.traditional_project_management.dashboard_file.template_path.description"))
			.addText((text: TextComponent): void => {
				text.setPlaceholder(translate("settings.traditional_project_management.dashboard_file.template_path.placeholder"))
					.setValue(this.plugin.settings.traditionalDashboardTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.traditionalDashboardTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new BaseFileSuggest(this.app, text.inputEl);
			});

		new Setting(containerEl).setName(translate("settings.agile_project_management.title")).setHeading();

		const agileDashboardGroupEl: HTMLDivElement = containerEl.createDiv({ cls: "setting-group" });
		const agileDashboardItemsEl: HTMLDivElement = agileDashboardGroupEl.createDiv({ cls: "setting-items" });

		new Setting(agileDashboardItemsEl)
			.setName(translate("settings.agile_project_management.dashboard_file.name.label"))
			.setDesc(translate("settings.agile_project_management.dashboard_file.name.description"))
			.addText((text: TextComponent) => text
				.setPlaceholder(translate("settings.agile_project_management.dashboard_file.name.placeholder"))
				.setValue(this.plugin.settings.agileDashboardFileName)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.agileDashboardFileName = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(agileDashboardItemsEl)
			.setName(translate("settings.agile_project_management.dashboard_file.template_path.label"))
			.setDesc(translate("settings.agile_project_management.dashboard_file.template_path.description"))
			.addText((text: TextComponent): void => {
				text.setPlaceholder(translate("settings.agile_project_management.dashboard_file.template_path.placeholder"))
					.setValue(this.plugin.settings.agileDashboardTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.agileDashboardTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new BaseFileSuggest(this.app, text.inputEl);
			});

		const epicGroupEl: HTMLDivElement = containerEl.createDiv({ cls: "setting-group" });
		const epicItemsEl: HTMLDivElement = epicGroupEl.createDiv({ cls: "setting-items" });

		new Setting(epicItemsEl)
			.setName(translate("settings.agile_project_management.epics.folder_name.label"))
			.setDesc(translate("settings.agile_project_management.epics.folder_name.description"))
			.addText((text: TextComponent) => text
				.setPlaceholder(translate("settings.agile_project_management.epics.folder_name.placeholder"))
				.setValue(this.plugin.settings.epicFolderName)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.epicFolderName = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(epicItemsEl)
			.setName(translate("settings.agile_project_management.epics.template_path.label"))
			.setDesc(translate("settings.agile_project_management.epics.template_path.description"))
			.addText((text: TextComponent): void => {
				text.setPlaceholder(translate("settings.agile_project_management.epics.template_path.placeholder"))
					.setValue(this.plugin.settings.epicTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.epicTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new MarkdownFileSuggest(this.app, text.inputEl);
			});

		const userStoryGroupEl: HTMLDivElement = containerEl.createDiv({ cls: "setting-group" });
		const userStoryItemsEl: HTMLDivElement = userStoryGroupEl.createDiv({ cls: "setting-items" });

		new Setting(userStoryItemsEl)
			.setName(translate("settings.agile_project_management.user_stories.folder_name.label"))
			.setDesc(translate("settings.agile_project_management.user_stories.folder_name.description"))
			.addText((text: TextComponent) => text
				.setPlaceholder(translate("settings.agile_project_management.user_stories.folder_name.placeholder"))
				.setValue(this.plugin.settings.userStoryFolderName)
				.onChange(async (value: string): Promise<void> => {
					this.plugin.settings.userStoryFolderName = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(userStoryItemsEl)
			.setName(translate("settings.agile_project_management.user_stories.template_path.label"))
			.setDesc(translate("settings.agile_project_management.user_stories.template_path.description"))
			.addText((text: TextComponent): void => {
				text.setPlaceholder(translate("settings.agile_project_management.user_stories.template_path.placeholder"))
					.setValue(this.plugin.settings.userStoryTemplatePath)
					.onChange(async (value: string): Promise<void> => {
						this.plugin.settings.userStoryTemplatePath = value;
						await this.plugin.saveSettings();
					});

				new MarkdownFileSuggest(this.app, text.inputEl);
			});
	}
}
