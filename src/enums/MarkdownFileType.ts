import {MarkdownFilePayload} from "../types/MarkdownFilePayload";

export enum MarkdownFileType {
	PROJECT = "project",
	EPIC = "epic",
	USER_STORY = "user-story",
	OTHER = "other",
}

export const MarkdownFileTypes: MarkdownFileType[] = [
	MarkdownFileType.PROJECT,
	MarkdownFileType.EPIC,
	MarkdownFileType.USER_STORY,
	MarkdownFileType.OTHER,
];

export function isMarkdownFileType(value: string): boolean {
	return MarkdownFileTypes.includes(value as MarkdownFileType);
}

export function getIdentifierFromMarkdownFilePayload(payload: MarkdownFilePayload): string | undefined {
	switch (payload.type) {
		case MarkdownFileType.PROJECT:
			return payload.projectIdentifier;
		case MarkdownFileType.EPIC:
			return payload.epicIdentifier;
		case MarkdownFileType.USER_STORY:
			return payload.userStoryIdentifier;
		default:
			return undefined;
	}
}
