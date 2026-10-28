import { ButtonComponent, DropdownComponent, Modal, TextComponent } from "obsidian";
import { CreateProjectForm } from "../../forms/project/CreateProjectForm";
import ZonzonsProjectManagement from "../../main";
import { isProjectType, ProjectType } from "../../enums/ProjectType";

export class CreateProjectModal extends Modal {
	form: CreateProjectForm;

	constructor(plugin: ZonzonsProjectManagement) {
		super(plugin.app);
		this.form = new CreateProjectForm(plugin);
	}

	override onOpen(): void {
		const { modalEl, titleEl, contentEl } = this;
		modalEl.addClass("zonzons-project-management");

		const headerEl: HTMLElement = modalEl.querySelector<HTMLElement>(".modal-header")!;
		headerEl.append(this.modalEl.querySelector<HTMLElement>(".modal-header-button")!);

		titleEl.empty();
		titleEl.setText("Create a new project");

		contentEl.empty();

		this.createProjectTypeDropdown(contentEl);
		this.createProjectFolderNameInput(contentEl);
		this.createProjectOverviewTitleInput(contentEl);
		this.createSubmitButton(contentEl);
	}

	createProjectTypeDropdown(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: "Type"});
		label.setAttribute("for", "type-dropdown");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: "Choose the type of project you want to create. The type will determine the structure and files that will be generated for your project.",
		});
		description.classList.add("input-description");
		description.id = "type-dropdown-description";

		const input: DropdownComponent = new DropdownComponent(container)
			.addOption(ProjectType.TRADITIONAL, "Traditional")
			.addOption(ProjectType.AGILE, "Agile")
			.setValue(this.form.type)
			.onChange((value: string): ProjectType => isProjectType(value) ? this.form.type = value as ProjectType : ProjectType.TRADITIONAL);
		input.selectEl.id = "type-dropdown";
		input.selectEl.setAttribute("aria-describedby", "type-dropdown-description");
	}

	createProjectFolderNameInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: "Folder name"});
		label.setAttribute("for", "folder-name-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: "Enter the name of the folder where your project's information will be generated and written.",
		});
		description.classList.add("input-description");
		description.id = "folder-name-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder("Enter the name of the project's folder.")
			.setValue(this.form.folderName)
			.onChange((value: string): string => this.form.folderName = value);
		input.inputEl.id = "folder-name-input";
		input.inputEl.setAttribute("aria-describedby", "folder-name-input-description");
	}

	createProjectOverviewTitleInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: "Overview title"});
		label.setAttribute("for", "overview-title-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: "Enter the inline title of the project's overview file. This title will replace the {{ title }} placeholder in the project overview template. This is useful if you have invalid or special characters in the title that cannot be used in the file name.",
		});
		description.classList.add("input-description");
		description.id = "overview-title-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder("Enter the title of the project's overview file.")
			.setValue(this.form.title)
			.onChange((value: string): string => this.form.title = value);
		input.inputEl.id = "overview-title-input";
		input.inputEl.setAttribute("aria-describedby", "overview-title-input-description");
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
