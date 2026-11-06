import {App, TAbstractFile, TFile, TFolder} from "obsidian";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";
import {I_Settings} from "../settings/Settings";
import {MarkdownPlaceholderHelper} from "./MarkdownPlaceholderHelper";
import {PathHelper} from "./PathHelper";
import {MarkdownMetadataHelper} from "./MarkdownMetadataHelper";
import {MarkdownFileTypeHelper} from "./MarkdownFileTypeHelper";

export class FileHelper {
	static getTemplate(app: App, path: string): TFile | null {
		const template: TFile | TAbstractFile | null = app.vault.getAbstractFileByPath(path);
		if (!(template instanceof TFile)) return null;
		return template;
	}

	static async createMarkdownFile(app: App, settings: I_Settings, project: TFolder, templatePath: string, payload: MarkdownFilePayload): Promise<TFile | null> {
		const template: TFile | null = this.getTemplate(app, templatePath);
		if (!(template instanceof TFile)) return null;

		let content: string = await MarkdownPlaceholderHelper.replace(app, template, payload);

		let file: TFile = await app.vault.create(PathHelper.buildMarkdownFilePath(project.path, payload.filePath), content);

		await MarkdownMetadataHelper.setIdentifier(app, settings, file, MarkdownFileTypeHelper.getIdentifierFromMarkdownFilePayload(payload));

		return file;
	}

	static async createBaseFile(app: App, project: TFolder, templatePath: string, fileName: string): Promise<TFile | null> {
		const template: TFile | null = this.getTemplate(app, templatePath);
		if (!(template instanceof TFile)) return null;

		return await app.vault.copy(template, PathHelper.buildBaseFilePath(project.path, fileName));
	}
}
