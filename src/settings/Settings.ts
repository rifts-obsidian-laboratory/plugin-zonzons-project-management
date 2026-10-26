export interface I_Settings {
	projectFolderPath: string;
	epicTemplatePath: string;
	userStoryTemplatePath: string;
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectFolderPath: "",
	epicTemplatePath: "",
	userStoryTemplatePath: "",
}
