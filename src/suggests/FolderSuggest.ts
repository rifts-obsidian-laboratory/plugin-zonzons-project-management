import { AbstractInputSuggest, App, TAbstractFile, TFolder } from "obsidian";

export class FolderSuggest extends AbstractInputSuggest<TFolder> {
	private inputElement: HTMLInputElement;

	constructor(app: App, inputElement: HTMLInputElement) {
		super(app, inputElement);
		this.inputElement = inputElement;
	}

	protected getSuggestions(query: string): TFolder[] {
		const _query: string = query.toLowerCase();

		return this.app.vault
			.getAllLoadedFiles()
			.filter((file: TAbstractFile): file is TFolder => {
				return file instanceof TFolder
					&& file.path.toLowerCase().includes(_query);
			})
			.slice(0, 10);
	}

	renderSuggestion(folder: TFolder, element: HTMLElement): void {
		element.setText(folder.path);
	}

	selectSuggestion(folder: TFolder): void {
		this.inputElement.value = folder.path;
		this.inputElement.trigger("input");
		this.close();
	}
}
