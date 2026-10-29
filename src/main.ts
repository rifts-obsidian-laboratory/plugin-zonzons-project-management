import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, I_Settings } from "./settings/Settings";
import { SettingTab } from "./settings/SettingTab";
import { CommandService } from "./services/CommandService";
import { FileMenuService } from "./services/FileMenuService";
import { RibbonService } from "./services/RibbonService";
import { I_HasRibbon } from "./interfaces/I_HasRibbon";

export default class ZonzonsProjectManagement extends Plugin implements I_HasRibbon {
	settings!: I_Settings;
	settingTab: SettingTab | undefined;
	createProjectRibbonButton: HTMLElement | undefined;
	createEpicRibbonButton: HTMLElement | undefined;
	createUserStoryRibbonButton: HTMLElement | undefined;

	async onload(): Promise<void> {
		await this.loadSettings();

		CommandService.initialize(this);
		FileMenuService.initialize(this);
		RibbonService.initialize(this);

		this.settingTab = new SettingTab(this.app, this);
		this.addSettingTab(this.settingTab);
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
		RibbonService.initialize(this);
	}
}
