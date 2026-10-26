export interface I_Settings {
	projectFolderPath: string;
	projectOverviewTemplatePath: string;
	projectOverviewFileName: string;
	traditionalDashboardTemplatePath: string;
	traditionalDashboardFileName: string;
	agileDashboardTemplatePath: string;
	epicTemplatePath: string;
	userStoryTemplatePath: string;
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectFolderPath: "",
	projectOverviewTemplatePath: "",
	projectOverviewFileName: "",
	traditionalDashboardTemplatePath: "",
	traditionalDashboardFileName: "",
	agileDashboardTemplatePath: "",
	epicTemplatePath: "",
	userStoryTemplatePath: "",
}
