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

		this.createProjectInput(contentEl);
		this.createEpicFileNameInput(contentEl);
		this.createEpicTitleInput(contentEl);
		this.createSubmitButton(contentEl);
	}

	createProjectInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: "Project" });
		label.setAttribute("for", "project-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: "Choose to which project the created epic belongs. The file will be created in the epic folder of the chosen project.",
		});
		description.classList.add("input-description");
		description.id = "project-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder("Start typing the name of a project...")
			.onChange(async (value: string): Promise<void> => {
				this.form.setProject(value);
			});
		input.inputEl.id = "project-input";
		input.inputEl.setAttribute("aria-describedby", "project-input-description");
		new ProjectSuggest(this.plugin, input.inputEl);
	}

	createEpicFileNameInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: "File name" });
		label.setAttribute("for", "file-name-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: "Enter the name of the file that will be created for the epic.",
		});
		description.classList.add("input-description");
		description.id = "file-name-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder("Enter the name of the file.")
			.onChange((value: string): void => {
				this.form.fileName = value;
			});
		input.inputEl.id = "file-name-input";
		input.inputEl.setAttribute("aria-describedby", "file-name-input-description");
	}

	createEpicTitleInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: "Title" });
		label.setAttribute("for", "title-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: "Enter the inline title of the epic. This title will replace the {{ title }} placeholder in the epic template. This is useful if you have invalid or special characters in the title that cannot be used in the file name.",
		});
		description.classList.add("input-description");
		description.id = "title-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder("Enter the title of the epic.")
			.onChange((value: string): void => {
				this.form.title = value;
			});
		input.inputEl.id = "title-input";
		input.inputEl.setAttribute("aria-describedby", "title-input-description");
	}

	createSubmitButton(contentEl: HTMLElement): void {
		new ButtonComponent(contentEl)
			.setButtonText("Create")
			.onClick(async (): Promise<void> => {
				await this.form.create();
				this.close();
			})
			.setClass("submit-form-button");
	}
}
