import {App, CachedMetadata, FrontMatterCache, TFile, TFolder} from "obsidian";
import {I_Settings} from "../settings/Settings";
import {ProjectRepository} from "../repositories/ProjectRepository";
import ZonzonsProjectManagement from "../main";
import {ProjectType} from "../enums/ProjectType";

export class MarkdownMetadataHelper {
	static getFrontmatter(app: App, file: TFile): FrontMatterCache | undefined {
		const metadata: CachedMetadata | null = app.metadataCache.getFileCache(file);
		if (!metadata) return undefined;

		return metadata.frontmatter;
	}

	static getProjectType(app: App, settings: I_Settings, file: TFile): ProjectType | null {
		const frontmatter: FrontMatterCache | undefined = this.getFrontmatter(app, file);
		if (!frontmatter) return null;

		const type: ProjectType = frontmatter[settings.projectTypePropertyName] as ProjectType;
		if (!type) return null;

		return type;
	}

	static async setProjectType(app: App, settings: I_Settings, file: TFile, type: ProjectType) {
		return await app.fileManager.processFrontMatter(file, (frontmatter: FrontMatterCache): string => frontmatter[settings.projectTypePropertyName] = type);
	}

	static getIdentifier(app: App, settings: I_Settings, file: TFile): string | null {
		const frontmatter: FrontMatterCache | undefined = this.getFrontmatter(app, file);
		if (!frontmatter) return null;

		const identifier: unknown = frontmatter[settings.identifierPropertyName];
		if (!identifier || typeof identifier !== "string") return null;

		return identifier;
	}

	static async setIdentifier(app: App, settings: I_Settings, file: TFile, identifier: string | undefined): Promise<void> {
		if (!identifier) return;

		return await app.fileManager.processFrontMatter(file, (frontmatter: FrontMatterCache): string => frontmatter[settings.identifierPropertyName] = identifier);
	}

	static getProjectLink(app: App, settings: I_Settings, file: TFile): string | null {
		const frontmatter: FrontMatterCache | undefined = this.getFrontmatter(app, file);
		if (!frontmatter) return null;

		const projectLink: unknown = frontmatter[settings.projectLinkPropertyName];
		if (!projectLink || typeof  projectLink !== "string") return null;

		return projectLink;
	}

	static async setProjectLink(plugin: ZonzonsProjectManagement, file: TFile, project: TFolder): Promise<void> {
		if (!project) return;

		const repository: ProjectRepository = new ProjectRepository(plugin);

		const projectOverviewFile: TFile | null = repository.getOverview(project);
		if (!projectOverviewFile) throw new Error("Project's overview file not found.");

		return await plugin.app.fileManager.processFrontMatter(file, (frontmatter: FrontMatterCache): string => frontmatter[plugin.settings.projectLinkPropertyName] = plugin.app.fileManager.generateMarkdownLink(projectOverviewFile, file.path));
	}

	static getEpicLink(app: App, settings: I_Settings, file: TFile): string | null {
		const frontmatter: FrontMatterCache | undefined = this.getFrontmatter(app, file);
		if (!frontmatter) return null;

		const epicLink: unknown = frontmatter[settings.epicLinkPropertyName];
		if (!epicLink || typeof  epicLink !== "string") return null;

		return epicLink;
	}

	static async setEpicLink(plugin: ZonzonsProjectManagement, file: TFile, epic: TFile): Promise<void> {
		if (!epic) return;

		return await plugin.app.fileManager.processFrontMatter(file, (frontmatter: FrontMatterCache): string => frontmatter[plugin.settings.epicLinkPropertyName] = plugin.app.fileManager.generateMarkdownLink(epic, file.path));
	}
}
