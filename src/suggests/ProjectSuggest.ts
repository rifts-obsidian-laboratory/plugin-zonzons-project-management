import { AbstractInputSuggest, App, TAbstractFile, TFolder } from "obsidian";
import ZonzonsProjectManagement from "../main";

export class ProjectSuggest extends AbstractInputSuggest<TFolder> {
	plugin: ZonzonsProjectManagement;
	inputElement: HTMLInputElement;

	constructor(plugin: ZonzonsProjectManagement, inputElement: HTMLInputElement) {
		super(plugin.app, inputElement);
		this.plugin = plugin;
		this.inputElement = inputElement;
	}

	protected getSuggestions(query: string): TFolder[] {
		const _query: string = query.toLowerCase();

		const projects: TFolder | null = this.app.vault.getFolderByPath(this.plugin.settings.projectFolderPath);
		if (!projects || _query === "") return [];

		return projects.children
			.filter((file: TAbstractFile): file is TFolder => file instanceof TFolder)
			.filter((folder: TFolder): boolean => folder.path.toLowerCase().includes(_query))
			.slice(0, 10);
	}

	renderSuggestion(folder: TFolder, element: HTMLElement): void {
		element.setText(folder.path.replace(this.plugin.settings.projectFolderPath + "/", ""));
	}

	selectSuggestion(folder: TFolder): void {
		this.inputElement.value = folder.path.replace(this.plugin.settings.projectFolderPath + "/", "");
		this.inputElement.trigger("input");
		this.close();
	}
}
