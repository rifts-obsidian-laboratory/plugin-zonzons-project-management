import ZonzonsProjectManagement from "../main";
import { translate } from "../i18n";
import { CreateUserStoryModal } from "../modals/user_story/CreateUserStoryModal";
import { CreateEpicModal } from "../modals/epic/CreateEpicModal";
import { CreateProjectModal } from "../modals/project/CreateProjectModal";

export class CommandService {
	public static initialize(plugin: ZonzonsProjectManagement): void {
		this.registerCreateProjectCommand(plugin);
		this.registerCreateEpicCommand(plugin);
		this.registerCreateUserStoryCommand(plugin);
	}

	static registerCreateProjectCommand(plugin: ZonzonsProjectManagement): void {
		plugin.addCommand({
			id: "create-project",
			name: translate("commands.create_project"),
			callback: (): void => {
				new CreateProjectModal(plugin).open();
			}
		});
	}

	static registerCreateEpicCommand(plugin: ZonzonsProjectManagement): void {
		plugin.addCommand({
			id: "create-epic",
			name: translate("commands.create_epic"),
			callback: (): void => {
				new CreateEpicModal(plugin).open();
			}
		});
	}

	static registerCreateUserStoryCommand(plugin: ZonzonsProjectManagement): void {
		plugin.addCommand({
			id: "create-user-story",
			name: translate("commands.create_user_story"),
			callback: (): void => {
				new CreateUserStoryModal(plugin).open();
			}
		});
	}
}
