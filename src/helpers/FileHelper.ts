import { App, TAbstractFile, TFile, TFolder } from "obsidian";

export class FileHelper {
	app: App;

	constructor(app: App) {
		this.app = app;
	}

	async createMarkdownFile(project: TFolder, templatePath: string, fileName: string): Promise<TFile | null> {
		const template: TFile | TAbstractFile | null = this.app.vault.getAbstractFileByPath(templatePath);
		if (!(template instanceof TFile)) return null;

		const content: string = await this.app.vault.read(template);

		let path: string = project.path + "/" + fileName;
		if (!path.endsWith(".md")) path += ".md";

		return await this.app.vault.create(path, content);
	}

	async createBaseFile(project: TFolder, templatePath: string, fileName: string): Promise<TFile | null> {
		const template: TFile | TAbstractFile | null = this.app.vault.getAbstractFileByPath(templatePath);
		if (!(template instanceof TFile)) return null;

		let path: string = project.path + "/" + fileName;
		if (!path.endsWith(".base")) path += ".base";

		return await this.app.vault.copy(template, path);
	}
}
