export interface I_Settings {
	projectFolderPath: string;
	projectOverviewFileName: string;
	projectOverviewTemplatePath: string;
	traditionalDashboardFileName: string;
	traditionalDashboardTemplatePath: string;
	agileDashboardFileName: string;
	agileDashboardTemplatePath: string;
	epicFolderName: string;
	epicTemplatePath: string;
	userStoryFolderName: string;
	userStoryTemplatePath: string;
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectFolderPath: "",
	projectOverviewFileName: "",
	projectOverviewTemplatePath: "",
	traditionalDashboardFileName: "",
	traditionalDashboardTemplatePath: "",
	agileDashboardFileName: "",
	agileDashboardTemplatePath: "",
	epicFolderName: "",
	epicTemplatePath: "",
	userStoryFolderName: "",
	userStoryTemplatePath: "",
}
