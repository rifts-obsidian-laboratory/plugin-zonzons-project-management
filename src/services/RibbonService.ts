import ZonzonsProjectManagement from "../main";
import { translate } from "../i18n";
import { CreateProjectModal } from "../modals/project/CreateProjectModal";
import { CreateEpicModal } from "../modals/epic/CreateEpicModal";
import { CreateUserStoryModal } from "../modals/user_story/CreateUserStoryModal";

export class RibbonService {
	public static initialize(plugin: ZonzonsProjectManagement): void {
		plugin.createProjectRibbonButton = this.refreshRibbonButton(
			plugin,
			plugin.createProjectRibbonButton,
			plugin.settings.displayProjectCreationRibbonButton,
			"folder-plus",
			translate("ribbon_icons.create_project"),
			() => new CreateProjectModal(plugin).open()
		);

		plugin.createEpicRibbonButton = this.refreshRibbonButton(
			plugin,
			plugin.createEpicRibbonButton,
			plugin.settings.displayEpicCreationRibbonButton,
			"file-plus",
			translate("ribbon_icons.create_epic"),
			() => new CreateEpicModal(plugin).open()
		);

		plugin.createUserStoryRibbonButton = this.refreshRibbonButton(
			plugin,
			plugin.createUserStoryRibbonButton,
			plugin.settings.displayUserStoryCreationRibbonButton,
			"clipboard-plus",
			translate("ribbon_icons.create_user_story"),
			() => new CreateUserStoryModal(plugin).open()
		);
	}

	static refreshRibbonButton(plugin: ZonzonsProjectManagement, button: HTMLElement | undefined, visible: boolean, icon: string, label: string, callback: () => void): HTMLElement | undefined {
		if (!visible) {
			button?.remove();
			return undefined;
		}

		return button ?? plugin.addRibbonIcon(icon, label, callback);
	}
}
