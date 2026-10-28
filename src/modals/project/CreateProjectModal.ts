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

		const projectFolderNameLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Folder name" });
		projectFolderNameLabelEl.classList.add("input-container");
		const projectFolderNameInput: TextComponent = new TextComponent(projectFolderNameLabelEl)
			.setPlaceholder("Enter the name of the project's folder.")
			.setValue(this.form.folderName)
			.onChange((value: string): string => this.form.folderName = value);
		projectFolderNameLabelEl.append(projectFolderNameInput.inputEl);

		const projectOverviewFileNameLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Overview file name" });
		projectOverviewFileNameLabelEl.classList.add("input-container");
		const projectOverviewFileNameInput: TextComponent = new TextComponent(projectOverviewFileNameLabelEl)
			.setPlaceholder("Enter the name of the project's overview file.")
			.setValue(this.form.title)
			.onChange((value: string): string => this.form.title = value);
		projectOverviewFileNameLabelEl.append(projectOverviewFileNameInput.inputEl);

		const projectTypeLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Type" });
		projectTypeLabelEl.classList.add("input-container");
		const projectTypeDropdown: DropdownComponent = new DropdownComponent(projectTypeLabelEl)
			.addOption(ProjectType.TRADITIONAL, "Traditional")
			.addOption(ProjectType.AGILE, "Agile")
			.setValue(this.form.type)
			.onChange((value: string): ProjectType => isProjectType(value) ? this.form.type = value as ProjectType : ProjectType.TRADITIONAL);
		projectTypeLabelEl.append(projectTypeDropdown.selectEl);

		new ButtonComponent(contentEl)
			.setButtonText("Create")
			.onClick(async (): Promise<void> => {
				await this.form.create();
				this.close();
			})
			.setClass("submit-form-button");
	}
}
