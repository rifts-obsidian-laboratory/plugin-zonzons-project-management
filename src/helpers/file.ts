import { App, TAbstractFile, TFile, TFolder } from "obsidian";

export async function createMarkdownFile(app: App, project: TFolder, templatePath: string, fileName: string): Promise<TFile | null> {
	const template: TFile | TAbstractFile | null = app.vault.getAbstractFileByPath(templatePath);
	if (!(template instanceof TFile)) return null;

	const content: string = await app.vault.read(template);

	let path: string = project.path + "/" + fileName;
	if (!path.endsWith(".md")) path += ".md";

	return await app.vault.create(path, content);
}

export async function createBaseFile(app: App, project: TFolder, templatePath: string, fileName: string): Promise<TFile | null> {
	const template: TFile | TAbstractFile | null = app.vault.getAbstractFileByPath(templatePath);
	if (!(template instanceof TFile)) return null;

	let path: string = project.path + "/" + fileName;
	if (!path.endsWith(".base")) path += ".base";

	return await app.vault.copy(template, path);
}
