import {App, CachedMetadata, FrontMatterCache, TFile} from "obsidian";
import {I_Settings} from "../settings/Settings";

export class MarkdownMetadataHelper {
	static getFrontmatter(app: App, file: TFile): FrontMatterCache | undefined {
		const metadata: CachedMetadata | null = app.metadataCache.getFileCache(file);
		if (!metadata) return undefined;

		return metadata.frontmatter;
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
}
