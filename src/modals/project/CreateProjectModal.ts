import { ButtonComponent, DropdownComponent, Modal, TextComponent } from "obsidian";
import { CreateProjectForm } from "../../forms/project/CreateProjectForm";
import ZonzonsProjectManagement from "../../main";

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

		const projectNameLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Name" });
		projectNameLabelEl.classList.add("input-container");
		const projectNameInput: TextComponent = new TextComponent(projectNameLabelEl)
			.setPlaceholder("Enter the name of the project.")
			.setValue(this.form.name)
			.onChange((value: string) => this.form.name = value);
		projectNameLabelEl.append(projectNameInput.inputEl);

		const projectTypeLabelEl: HTMLLabelElement = contentEl.createEl("label", { text: "Type" });
		projectTypeLabelEl.classList.add("input-container");
		const projectTypeDropdown: DropdownComponent = new DropdownComponent(projectTypeLabelEl)
			.addOption("traditional", "Traditional")
			.addOption("agile", "Agile")
			.setValue(this.form.type)
			.onChange((value: string) => this.form.type = value);
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
