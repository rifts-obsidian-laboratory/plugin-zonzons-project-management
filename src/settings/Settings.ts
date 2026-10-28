export interface I_Settings {
	projectFolderPath: string;
	displayProjectCreationRibbonButton: boolean;
	projectOverviewFileName: string;
	projectOverviewTemplatePath: string;
	traditionalDashboardFileName: string;
	traditionalDashboardTemplatePath: string;
	agileDashboardFileName: string;
	agileDashboardTemplatePath: string;
	epicFolderName: string;
	epicTemplatePath: string;
	displayEpicCreationRibbonButton: boolean;
	userStoryFolderName: string;
	userStoryTemplatePath: string;
	displayUserStoryCreationRibbonButton: boolean;
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectFolderPath: "",
	displayProjectCreationRibbonButton: true,
	projectOverviewFileName: "",
	projectOverviewTemplatePath: "",
	traditionalDashboardFileName: "",
	traditionalDashboardTemplatePath: "",
	agileDashboardFileName: "",
	agileDashboardTemplatePath: "",
	epicFolderName: "",
	epicTemplatePath: "",
	displayEpicCreationRibbonButton: true,
	userStoryFolderName: "",
	userStoryTemplatePath: "",
	displayUserStoryCreationRibbonButton: true,
}
