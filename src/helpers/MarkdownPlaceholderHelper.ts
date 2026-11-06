import {App, TFile} from "obsidian";
import {MarkdownPlaceholder} from "../enums/MarkdownPlaceholder";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";

export class MarkdownPlaceholderHelper {
	static placeholders: MarkdownPlaceholder[] = [
		MarkdownPlaceholder.EPIC_IDENTIFIER,
		MarkdownPlaceholder.PROJECT_IDENTIFIER,
		MarkdownPlaceholder.PROJECT_NAME,
		MarkdownPlaceholder.TITLE,
		MarkdownPlaceholder.TEMPLATE_HELP,
		MarkdownPlaceholder.USER_STORY_IDENTIFIER,
	];

	static exists(value: string): boolean {
		return this.placeholders.includes(value as MarkdownPlaceholder);
	}

	static getPlaceholder(placeholder: MarkdownPlaceholder): RegExp {
		switch (placeholder) {
			case MarkdownPlaceholder.EPIC_IDENTIFIER:
			case MarkdownPlaceholder.PROJECT_IDENTIFIER:
			case MarkdownPlaceholder.PROJECT_NAME:
			case MarkdownPlaceholder.TITLE:
			case MarkdownPlaceholder.USER_STORY_IDENTIFIER:
				return new RegExp(`\\{\\{\\s*${placeholder}\\s*\\}\\}`, "gm");
			case MarkdownPlaceholder.TEMPLATE_HELP:
				return /^> \[!template-help\][^\n]*\n(?:>[^\n]*\n?)*/gm;
		}
	}

	static getValueFromMarkdownFilePayload(placeholder: MarkdownPlaceholder, payload: MarkdownFilePayload): string | undefined {
		switch (placeholder) {
			case MarkdownPlaceholder.EPIC_IDENTIFIER:
				return payload.epicIdentifier;
			case MarkdownPlaceholder.PROJECT_IDENTIFIER:
				return payload.projectIdentifier;
			case MarkdownPlaceholder.PROJECT_NAME:
				return payload.projectName;
			case MarkdownPlaceholder.TITLE:
				return payload.inlineTitle || payload.fileName;
			case MarkdownPlaceholder.USER_STORY_IDENTIFIER:
				return payload.userStoryIdentifier;
			case MarkdownPlaceholder.TEMPLATE_HELP:
				return undefined;
		}
	}

	static async replace(app: App, file: TFile, payload: MarkdownFilePayload): Promise<string> {
		let content: string = await app.vault.read(file);

		for (const placeholder of this.placeholders) {
			const value: string | undefined = this.getValueFromMarkdownFilePayload(placeholder, payload);
			if (!value) continue;

			content = content.replaceAll(this.getPlaceholder(placeholder), value);
		}

		content = content.replaceAll(this.getPlaceholder(MarkdownPlaceholder.TEMPLATE_HELP), "");

		return content;
	}
}
