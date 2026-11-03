import {MarkdownFileType} from "../enums/MarkdownFileType";

export type MarkdownFilePayload = {
	type: MarkdownFileType;
	filePath: string;
	fileName: string;
	title: string;
	projectIdentifier?: string;
	projectName?: string;
	epicIdentifier?: string;
	userStoryIdentifier?: string;
};
