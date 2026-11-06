import {MarkdownFileType} from "../enums/MarkdownFileType";

export type MarkdownFilePayload = {
	type: MarkdownFileType;
	filePath: string;
	fileName: string;
	inlineTitle: string;
	projectIdentifier?: string;
	projectName?: string;
	epicIdentifier?: string;
	userStoryIdentifier?: string;
};
