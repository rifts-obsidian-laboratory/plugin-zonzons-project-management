import { ButtonComponent, DropdownComponent, Modal, TextComponent } from "obsidian";
import { CreateProjectForm } from "../../forms/project/CreateProjectForm";
import ZonzonsProjectManagement from "../../main";
import { isProjectType, ProjectType, translateProjectType } from "../../enums/ProjectType";
import { translate } from "../../i18n";
import {HasTitleService} from "../../services/HasTitleService";
import {HasTitleServiceOptions} from "../../types/HasTitleServiceOptions";
import {HasIdentifierService} from "../../services/HasIdentifierService";

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
		titleEl.setText(translate("modals.project.create.title"));

		contentEl.empty();

		this.createProjectTypeDropdown(contentEl);
		this.createProjectFolderNameInput(contentEl);

		const hasTitleServiceOptions: HasTitleServiceOptions = {
			translations: {
				checkbox: {
					label: translate("modals.project.create.overview_title.checkbox.label")
				},
				input: {
					label: translate("modals.project.create.overview_title.input.label"),
					description: translate("modals.project.create.overview_title.input.description"),
					placeholder: translate("modals.project.create.overview_title.input.placeholder"),
				}
			}
		}
		const hasTitleService = new HasTitleService(this.form, hasTitleServiceOptions);
		hasTitleService.initialize(contentEl);

		const hasCodeService = new HasIdentifierService(this.form);
		hasCodeService.initialize(contentEl);

		this.createSubmitButton(contentEl);
	}

	createProjectTypeDropdown(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.project.create.type.label")});
		label.setAttribute("for", "type-dropdown");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.project.create.type.description"),
		});
		description.classList.add("input-description");
		description.id = "type-dropdown-description";

		const input: DropdownComponent = new DropdownComponent(container)
			.addOption(ProjectType.TRADITIONAL, translateProjectType(ProjectType.TRADITIONAL))
			.addOption(ProjectType.AGILE, translateProjectType(ProjectType.AGILE))
			.setValue(this.form.type)
			.onChange((value: string): ProjectType => isProjectType(value) ? this.form.type = value as ProjectType : ProjectType.TRADITIONAL);
		input.selectEl.id = "type-dropdown";
		input.selectEl.setAttribute("aria-describedby", "type-dropdown-description");
	}

	createProjectFolderNameInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.project.create.folder_name.label")});
		label.setAttribute("for", "folder-name-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.project.create.folder_name.description"),
		});
		description.classList.add("input-description");
		description.id = "folder-name-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.project.create.folder_name.placeholder"))
			.setValue(this.form.folderName)
			.onChange((value: string): string => this.form.folderName = value);
		input.inputEl.id = "folder-name-input";
		input.inputEl.setAttribute("aria-describedby", "folder-name-input-description");
	}

	createSubmitButton(contentEl: HTMLElement): void {
		new ButtonComponent(contentEl)
			.setButtonText(translate("modals.project.create.submit"))
			.onClick(async (): Promise<void> => {
				await this.form.create();
				this.close();
			})
			.setClass("submit-form-button");
	}
}
