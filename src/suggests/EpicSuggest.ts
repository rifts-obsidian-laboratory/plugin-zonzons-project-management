import {AbstractInputSuggest, TAbstractFile, TFile, TFolder} from "obsidian";
import ZonzonsProjectManagement from "../main";
import {EpicRepository} from "../repositories/EpicRepository";

export class EpicSuggest extends AbstractInputSuggest<TFile> {
	plugin: ZonzonsProjectManagement;
	repository: EpicRepository;
	project: TFolder | null;
	inputElement: HTMLInputElement;

	constructor(plugin: ZonzonsProjectManagement, inputElement: HTMLInputElement, project: TFolder | null) {
		super(plugin.app, inputElement);
		this.plugin = plugin;
		this.repository = new EpicRepository(this.plugin)
		this.project = project;
		this.inputElement = inputElement;
	}

	protected getSuggestions(query: string): TFile[] {
		if (!this.project) return [];

		const epics: TFolder | null = this.repository.getEpicsFolder(this.project);
		if (!epics) return [];

		const _query: string = query.toLowerCase();

		return epics.children
			.filter((file: TAbstractFile): file is TFile => file instanceof TFile)
			.filter((file: TFile): boolean => file.name.toLowerCase().includes(_query) || Boolean(this.repository.getIdentifier(file)?.includes(query)))
			.sort((a: TFile, b: TFile): number => {
				const aIdentifier: string | null = this.repository.getIdentifier(a);
				const bIdentifier: string | null = this.repository.getIdentifier(b);

				if (!aIdentifier) return bIdentifier ? 1 : 0;
				if (!bIdentifier) return -1;

				return aIdentifier.localeCompare(bIdentifier, undefined, { numeric: true });
			})
			.slice(0, 10);
	}

	renderSuggestion(file: TFile, element: HTMLElement): void {
		const identifier: string | null = this.repository.getIdentifier(file);
		if (!identifier) return;

		element.setText(identifier + " - " + file.name.replace(".md", ""));
	}

	selectSuggestion(file: TFile): void {
		const identifier: string | null = this.repository.getIdentifier(file);
		if (!identifier) return;

		this.inputElement.value = identifier;
		this.inputElement.trigger("input");
		this.close();
	}
}
