import {TFolder} from "obsidian";
import ZonzonsProjectManagement from "../main";

export class IdentifierHelper {
	public static generateEpicIdentifier(plugin: ZonzonsProjectManagement, projectPath: string): string {
		const epics: TFolder | null = plugin.app.vault.getFolderByPath(projectPath + "/" + plugin.settings.epicsFolderName);

		return plugin.settings.epicIdentifierPrefix + ((epics?.children.length ?? 0) + 1);
	}

	public static generateUserStoryIdentifier(plugin: ZonzonsProjectManagement, projectPath: string): string {
		const userStories: TFolder | null = plugin.app.vault.getFolderByPath(projectPath + "/" + plugin.settings.userStoriesFolderName);

		return plugin.settings.userStoryIdentifierPrefix + ((userStories?.children.length ?? 0) + 1);
	}
}
