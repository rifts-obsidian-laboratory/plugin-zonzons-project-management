export interface I_Settings {
	projectFolderPath: string;
	projectOverviewTemplatePath: string;
	projectOverviewFileName: string;
	traditionalDashboardTemplatePath: string;
	traditionalDashboardFileName: string;
	agileDashboardTemplatePath: string;
	agileDashboardFileName: string;
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
	agileDashboardFileName: "",
	epicTemplatePath: "",
	userStoryTemplatePath: "",
}
