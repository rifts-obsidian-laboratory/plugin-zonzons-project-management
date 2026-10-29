import { AbstractInputSuggest, App, TFile } from "obsidian";

export class MarkdownFileSuggest extends AbstractInputSuggest<TFile> {
	private inputElement: HTMLInputElement;

	constructor(app: App, inputElement: HTMLInputElement) {
		super(app, inputElement);
		this.inputElement = inputElement;
	}

	protected getSuggestions(query: string): TFile[] {
		const _query: string = query.toLowerCase();

		if (_query === "") return [];

		return this.app.vault
			.getMarkdownFiles()
			.filter((file: TFile) => file.path.toLowerCase().includes(_query))
			.slice(0, 10);
	}

	renderSuggestion(file: TFile, element: HTMLElement): void {
		element.setText(file.path);
	}

	selectSuggestion(file: TFile): void {
		this.inputElement.value = file.path;
		this.inputElement.trigger("input");
		this.close();
	}
}
