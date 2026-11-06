import { ProjectType } from "../enums/ProjectType";

export interface I_Settings {
	projectFolderPath: string;
	displayProjectCreationRibbonButton: boolean;
	projectOverviewFileName: string;
	projectOverviewTemplatePath: string;
	traditionalDashboardFileName: string;
	traditionalDashboardTemplatePath: string;
	agileDashboardFileName: string;
	agileDashboardTemplatePath: string;
	epicsFolderName: string;
	epicTemplatePath: string;
	displayEpicCreationRibbonButton: boolean;
	userStoriesFolderName: string;
	userStoryTemplatePath: string;
	displayUserStoryCreationRibbonButton: boolean;
	identifierPropertyName: string;
	epicIdentifierPrefix: string;
	userStoryIdentifierPrefix: string;
	projectLinkPropertyName: string;
	epicLinkPropertyName: string;
	projects: Record<string, ProjectType>
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
	epicsFolderName: "",
	epicTemplatePath: "",
	displayEpicCreationRibbonButton: true,
	userStoriesFolderName: "",
	userStoryTemplatePath: "",
	displayUserStoryCreationRibbonButton: true,
	identifierPropertyName: "",
	epicIdentifierPrefix: "",
	userStoryIdentifierPrefix: "",
	projectLinkPropertyName: "",
	epicLinkPropertyName: "",
	projects: {},
}
