import { App, TAbstractFile, TFile, TFolder } from "obsidian";
import { MarkdownFilePayload } from "../types/MarkdownFilePayload";
import ZonzonsProjectManagement from "../main";
import {I_Settings} from "../settings/Settings";

export class FileHelper {
	app: App;
	settings: I_Settings;

	constructor(plugin: ZonzonsProjectManagement) {
		this.app = plugin.app;
		this.settings = plugin.settings;
	}

	async createMarkdownFile(project: TFolder, templatePath: string, payload: MarkdownFilePayload): Promise<TFile | null> {
		const template: TFile | TAbstractFile | null = this.app.vault.getAbstractFileByPath(templatePath);
		if (!(template instanceof TFile)) return null;

		const content: string = (await this.app.vault.read(template))
			.replaceAll(/\{\{\s*code\s*\}\}/gm, payload.identifier)
			.replaceAll(/\{\{\s*title\s*\}\}/gm, payload.title || payload.fileName)
			.replaceAll(/\{\{\s*project-name\s*\}\}/gm, project.name)
			.replaceAll(/^> \[!template-help\][^\n]*\n(?:>[^\n]*\n?)*/gm, "");

		let path: string = project.path + "/" + payload.filePath
		if (!path.endsWith(".md")) path += ".md";

		let file: TFile = await this.app.vault.create(path, content);

		await this.app.fileManager.processFrontMatter(file, (frontMatter: any) => {
			frontMatter[this.settings.identifierPropertyName] = payload.identifier;
		});

		return file;
	}

	async createBaseFile(project: TFolder, templatePath: string, fileName: string): Promise<TFile | null> {
		const template: TFile | TAbstractFile | null = this.app.vault.getAbstractFileByPath(templatePath);
		if (!(template instanceof TFile)) return null;

		let path: string = project.path + "/" + fileName;
		if (!path.endsWith(".base")) path += ".base";

		return await this.app.vault.copy(template, path);
	}
}
