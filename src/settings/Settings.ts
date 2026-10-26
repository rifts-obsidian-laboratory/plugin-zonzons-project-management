export interface I_Settings {
	projectFolderPath: string;
	dashboardTemplatePath: string;
	epicTemplatePath: string;
	userStoryTemplatePath: string;
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectFolderPath: "",
	dashboardTemplatePath: "",
	epicTemplatePath: "",
	userStoryTemplatePath: "",
}
