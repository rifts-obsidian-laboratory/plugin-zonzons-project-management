import { ProjectType } from "../enums/ProjectType";

export interface I_Settings {
	projectsFolderPath: string;
	projectTypePropertyName: string;
	displayProjectCreationRibbonButton: boolean;
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
}


export const DEFAULT_SETTINGS: I_Settings = {
	projectsFolderPath: "projects",
	projectTypePropertyName: "type",
	displayProjectCreationRibbonButton: true,
	projectOverviewTemplatePath: "",
	traditionalDashboardFileName: "",
	traditionalDashboardTemplatePath: "",
	agileDashboardFileName: "",
	agileDashboardTemplatePath: "",
	epicsFolderName: "epics",
	epicTemplatePath: "",
	displayEpicCreationRibbonButton: true,
	userStoriesFolderName: "user-stories",
	userStoryTemplatePath: "",
	displayUserStoryCreationRibbonButton: true,
	identifierPropertyName: "identifier",
	epicIdentifierPrefix: "E-",
	userStoryIdentifierPrefix: "US-",
	projectLinkPropertyName: "project",
	epicLinkPropertyName: "epic",
}
