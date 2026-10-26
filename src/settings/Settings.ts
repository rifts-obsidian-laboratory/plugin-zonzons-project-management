export interface I_Settings {
	projectFolderPath: string;
	projectOverviewTemplatePath: string;
	traditionalDashboardTemplatePath: string;
	agileDashboardTemplatePath: string;
	epicTemplatePath: string;
	userStoryTemplatePath: string;
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectFolderPath: "",
	projectOverviewTemplatePath: "",
	traditionalDashboardTemplatePath: "",
	agileDashboardTemplatePath: "",
	epicTemplatePath: "",
	userStoryTemplatePath: "",
}
