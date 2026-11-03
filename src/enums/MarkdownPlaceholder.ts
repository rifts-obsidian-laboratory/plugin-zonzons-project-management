import {MarkdownFilePayload} from "../types/MarkdownFilePayload";

export enum MarkdownPlaceholder {
	EPIC_IDENTIFIER = "epic-identifier",
	PROJECT_IDENTIFIER = "project-identifier",
	PROJECT_NAME = "project-name",
	TITLE = "title",
	TEMPLATE_HELP = "template-help",
 	USER_STORY_IDENTIFIER = "user-story-identifier",
}

export const MarkdownPlaceholders: MarkdownPlaceholder[] = [
	MarkdownPlaceholder.EPIC_IDENTIFIER,
	MarkdownPlaceholder.PROJECT_IDENTIFIER,
	MarkdownPlaceholder.PROJECT_NAME,
	MarkdownPlaceholder.TITLE,
	MarkdownPlaceholder.TEMPLATE_HELP,
	MarkdownPlaceholder.USER_STORY_IDENTIFIER,
];

export function isMarkdownPlaceholder(value: string): boolean {
	return MarkdownPlaceholders.includes(value as MarkdownPlaceholder);
}

export function getPlaceholder(placeholder: MarkdownPlaceholder): RegExp {
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

export function getValueFromMarkdownFilePayload(placeholder: MarkdownPlaceholder, payload: MarkdownFilePayload): string | undefined {
	switch (placeholder) {
		case MarkdownPlaceholder.EPIC_IDENTIFIER:
			return payload.epicIdentifier;
		case MarkdownPlaceholder.PROJECT_IDENTIFIER:
			return payload.projectIdentifier;
		case MarkdownPlaceholder.PROJECT_NAME:
			return payload.projectName;
		case MarkdownPlaceholder.TITLE:
			return payload.title || payload.fileName;
		case MarkdownPlaceholder.USER_STORY_IDENTIFIER:
			return payload.userStoryIdentifier;
		case MarkdownPlaceholder.TEMPLATE_HELP:
			return undefined;
	}
}

export function replaceMarkdownPlaceholders(content: string, payload: MarkdownFilePayload): string {
	let _content: string = content;

	MarkdownPlaceholders.forEach((placeholder): void => {
		const payloadValue: string | undefined = getValueFromMarkdownFilePayload(placeholder, payload);

		_content = _content.replaceAll(getPlaceholder(placeholder), payloadValue === undefined ? "" : payloadValue);
	});

	return _content;
}
