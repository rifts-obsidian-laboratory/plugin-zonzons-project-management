import { translate } from "../i18n";

export enum ProjectType {
	TRADITIONAL = "traditional",
	AGILE = "agile",
}

export const ProjectTypes: ProjectType[] = [ProjectType.TRADITIONAL, ProjectType.AGILE];

export function isProjectType(value: string): boolean {
	return ProjectTypes.includes(value as ProjectType);
}

export function translateProjectType(projectType: ProjectType): string {
	return translate("enums.project_type." + projectType);
}
