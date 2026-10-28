import { ButtonComponent, DropdownComponent, Modal, TextComponent, TFolder } from "obsidian";
import { CreateEpicForm } from "../../forms/epic/CreateEpicForm";
import ZonzonsProjectManagement from "../../main";
import { ProjectSuggest } from "../../suggests/ProjectSuggest";

export class CreateEpicModal extends Modal {
	plugin: ZonzonsProjectManagement;
	form: CreateEpicForm;

	constructor(plugin: ZonzonsProjectManagement) {
		super(plugin.app);
		this.plugin = plugin;
		this.form = new CreateEpicForm(plugin);
	}

	override onOpen(): void {
		const { modalEl, titleEl, contentEl } = this;
		modalEl.addClass("zonzons-project-management");

		const headerEl: HTMLElement = modalEl.querySelector<HTMLElement>(".modal-header")!;
		headerEl.append(this.modalEl.querySelector<HTMLElement>(".modal-header-button")!);

		titleEl.empty();
		titleEl.setText("Create a new epic");

		contentEl.empty();

		const projectLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Project" });
		projectLabelEl.classList.add("input-container");
		const projectInput: TextComponent = new TextComponent(projectLabelEl)
			.setPlaceholder("Start to type the name of a project...")
			.onChange(async (value: string): Promise<void> => {
				this.form.setProject(value);
			});
		new ProjectSuggest(this.plugin, projectInput.inputEl);

		const epicFileNameLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "File name" });
		epicFileNameLabelEl.classList.add("input-container");
		new TextComponent(epicFileNameLabelEl)
			.setPlaceholder("Enter the name of the file...")
			.onChange((value: string): void => {
				this.form.fileName = value;
			});

		new ButtonComponent(contentEl)
			.setButtonText("Create")
			.onClick(async (): Promise<void> => {
				await this.form.create();
				this.close();
			})
			.setClass("submit-form-button");
	}
}
