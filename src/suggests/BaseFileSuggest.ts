import { AbstractInputSuggest, App, TAbstractFile } from "obsidian";

export class BaseFileSuggest extends AbstractInputSuggest<TAbstractFile>{
	private inputElement: HTMLInputElement;

	constructor(app: App, inputElement: HTMLInputElement) {
		super(app, inputElement);
		this.inputElement = inputElement;
	}

	protected getSuggestions(query: string): TAbstractFile[] {
		const _query: string = query.toLowerCase();

		if (_query === "") return [];

		return this.app.vault
			.getAllLoadedFiles()
			.filter((file: TAbstractFile) => file.path.toLowerCase().includes(_query) && file.path.endsWith('.base'))
			.slice(0, 10);
	}

	renderSuggestion(abstractFile: TAbstractFile, element: HTMLElement): void {
		element.setText(abstractFile.path);
	}

	selectSuggestion(abstractFile: TAbstractFile): void {
		this.inputElement.value = abstractFile.path;
		this.inputElement.trigger("input");
		this.close();
	}
}
