import { ButtonComponent, Modal, TextComponent } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { CreateUserStoryForm } from "../../forms/userstory/CreateUserStoryForm";
import { ProjectSuggest } from "../../suggests/ProjectSuggest";

export class CreateUserStoryModal extends Modal {
	plugin: ZonzonsProjectManagement;
	form: CreateUserStoryForm;

	constructor(plugin: ZonzonsProjectManagement) {
		super(plugin.app);
		this.plugin = plugin;
		this.form = new CreateUserStoryForm(plugin);
	}

	override onOpen(): void {
		const { modalEl, titleEl, contentEl } = this;
		modalEl.addClass("zonzons-project-management");

		const headerEl: HTMLElement = modalEl.querySelector<HTMLElement>(".modal-header")!;
		headerEl.append(this.modalEl.querySelector<HTMLElement>(".modal-header-button")!);

		titleEl.empty();
		titleEl.setText("Create a new user story");

		contentEl.empty();

		const projectLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Project" });
		projectLabelEl.classList.add("input-container");
		const projectInput: TextComponent = new TextComponent(projectLabelEl)
			.setPlaceholder("Start to type the name of a project...")
			.onChange(async (value: string): Promise<void> => {
				this.form.setProject(value);
			});
		new ProjectSuggest(this.plugin, projectInput.inputEl);

		const userStoryFileNameLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "File name" });
		userStoryFileNameLabelEl.classList.add("input-container");
		new TextComponent(userStoryFileNameLabelEl)
			.setPlaceholder("Enter the name of the file...")
			.onChange((value: string): void => {
				this.form.fileName = value;
			});

		const userStoryTitleLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Title" });
		userStoryTitleLabelEl.classList.add("input-container");
		new TextComponent(userStoryTitleLabelEl)
			.setPlaceholder("Enter the inline title of the file...")
			.onChange((value: string): void => {
				this.form.title = value;
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
