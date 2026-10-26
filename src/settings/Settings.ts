export interface I_Settings {
	projectFolderPath: string;
	projectOverviewTemplatePath: string;
	dashboardTemplatePath: string;
	epicTemplatePath: string;
	userStoryTemplatePath: string;
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectFolderPath: "",
	projectOverviewTemplatePath: "",
	dashboardTemplatePath: "",
	epicTemplatePath: "",
	userStoryTemplatePath: "",
}
