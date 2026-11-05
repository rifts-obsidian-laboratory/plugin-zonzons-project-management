import {MarkdownFileType} from "../enums/MarkdownFileType";
import {MarkdownFilePayload} from "../types/MarkdownFilePayload";

export class MarkdownFileTypeHelper {
	static types: MarkdownFileType[] = [
		MarkdownFileType.PROJECT,
		MarkdownFileType.EPIC,
		MarkdownFileType.USER_STORY,
		MarkdownFileType.OTHER,
	];

	static exists(value: string): boolean {
		return this.types.includes(value as MarkdownFileType);
	}

	static getIdentifierFromMarkdownFilePayload(payload: MarkdownFilePayload): string | undefined {
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
}
