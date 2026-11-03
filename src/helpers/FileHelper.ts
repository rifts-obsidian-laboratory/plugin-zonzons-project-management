import { App, TAbstractFile, TFile, TFolder } from "obsidian";
import { MarkdownFilePayload } from "../types/MarkdownFilePayload";
import ZonzonsProjectManagement from "../main";
import {I_Settings} from "../settings/Settings";
import {getIdentifierFromMarkdownFilePayload} from "../enums/MarkdownFileType";
import {replaceMarkdownPlaceholders} from "../enums/MarkdownPlaceholder";

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

		let content: string = await this.app.vault.read(template);
		content = replaceMarkdownPlaceholders(content, payload);

		let path: string = project.path + "/" + payload.filePath
		if (!path.endsWith(".md")) path += ".md";

		let file: TFile = await this.app.vault.create(path, content);
		const identifier: string | undefined = getIdentifierFromMarkdownFilePayload(payload);

		if (identifier !== undefined) {
			await this.app.fileManager.processFrontMatter(file, (frontMatter: any) => {
				frontMatter[this.settings.identifierPropertyName] = identifier;
			});
		}

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
