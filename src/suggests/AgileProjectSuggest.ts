import {AbstractInputSuggest, TAbstractFile, TFile, TFolder} from "obsidian";
import ZonzonsProjectManagement from "../main";
import { ProjectType } from "../enums/ProjectType";
import {ProjectRepository} from "../repositories/ProjectRepository";
import {MarkdownMetadataHelper} from "../helpers/MarkdownMetadataHelper";

export class AgileProjectSuggest extends AbstractInputSuggest<TFolder> {
	plugin: ZonzonsProjectManagement;
	repository: ProjectRepository;
	inputElement: HTMLInputElement;

	constructor(plugin: ZonzonsProjectManagement, inputElement: HTMLInputElement) {
		super(plugin.app, inputElement);
		this.plugin = plugin;
		this.repository = new ProjectRepository(plugin);
		this.inputElement = inputElement;
	}

	protected getSuggestions(query: string): TFolder[] {
		const _query: string = query.toLowerCase();

		const projects: TFolder | null = this.app.vault.getFolderByPath(this.plugin.settings.projectsFolderPath);
		if (!projects || _query === "") return [];

		return projects.children
			.filter((file: TAbstractFile): file is TFolder => file instanceof TFolder)
			.filter((folder: TFolder): boolean => folder.path.toLowerCase().includes(_query))
			.filter((project: TFolder): boolean => {
				const overview: TFile | null = this.repository.getOverview(project);
				if (!overview) return false;

				return MarkdownMetadataHelper.getProjectType(this.app, this.plugin.settings, overview) === ProjectType.AGILE;
			})
			.slice(0, 10);
	}

	renderSuggestion(folder: TFolder, element: HTMLElement): void {
		element.setText(folder.path.replace(this.plugin.settings.projectsFolderPath + "/", ""));
	}

	selectSuggestion(folder: TFolder): void {
		this.inputElement.value = folder.path.replace(this.plugin.settings.projectsFolderPath + "/", "");
		this.inputElement.trigger("input");
		this.close();
	}
}
