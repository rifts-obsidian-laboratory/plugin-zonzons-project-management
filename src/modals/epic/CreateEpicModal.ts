import { ButtonComponent, Modal, TextComponent} from "obsidian";
import { CreateEpicForm } from "../../forms/epic/CreateEpicForm";
import ZonzonsProjectManagement from "../../main";
import { AgileProjectSuggest } from "../../suggests/AgileProjectSuggest";
import { translate } from "../../i18n";

export class CreateEpicModal extends Modal {
	plugin: ZonzonsProjectManagement;
	form: CreateEpicForm;
	isProjectInputDisabled: boolean = false;

	constructor(plugin: ZonzonsProjectManagement, projectName?: string) {
		super(plugin.app);
		this.plugin = plugin;
		this.form = new CreateEpicForm(plugin);
		if (projectName) {
			this.form.setProject(projectName);
			this.isProjectInputDisabled = true;
		}
	}

	override onOpen(): void {
		const { modalEl, titleEl, contentEl } = this;
		modalEl.addClass("zonzons-project-management");

		const headerEl: HTMLElement = modalEl.querySelector<HTMLElement>(".modal-header")!;
		headerEl.append(this.modalEl.querySelector<HTMLElement>(".modal-header-button")!);

		titleEl.empty();
		titleEl.setText(translate("modals.epic.create.title"));

		contentEl.empty();

		this.createProjectInput(contentEl);
		this.createEpicFileNameInput(contentEl);
		this.createEpicTitleInput(contentEl);
		this.createSubmitButton(contentEl);
	}

	createProjectInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.epic.create.project.label") });
		label.setAttribute("for", "project-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.epic.create.project.description"),
		});
		description.classList.add("input-description");
		description.id = "project-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.epic.create.project.placeholder"))
			.setValue(this.form.getProject())
			.onChange(async (value: string): Promise<void> => {
				this.form.setProject(value);
			});
		input.inputEl.id = "project-input";
		input.inputEl.setAttribute("aria-describedby", "project-input-description");
		input.setDisabled(this.isProjectInputDisabled);
		new AgileProjectSuggest(this.plugin, input.inputEl);
	}

	createEpicFileNameInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.epic.create.epic_file_name.label") });
		label.setAttribute("for", "file-name-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.epic.create.epic_file_name.description"),
		});
		description.classList.add("input-description");
		description.id = "file-name-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.epic.create.epic_file_name.placeholder"))
			.onChange((value: string): void => {
				this.form.fileName = value;
			});
		input.inputEl.id = "file-name-input";
		input.inputEl.setAttribute("aria-describedby", "file-name-input-description");
	}

	createEpicTitleInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.epic.create.epic_title.label") });
		label.setAttribute("for", "title-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.epic.create.epic_title.description"),
		});
		description.classList.add("input-description");
		description.id = "title-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.epic.create.epic_title.placeholder"))
			.onChange((value: string): void => {
				this.form.title = value;
			});
		input.inputEl.id = "title-input";
		input.inputEl.setAttribute("aria-describedby", "title-input-description");
	}

	createSubmitButton(contentEl: HTMLElement): void {
		new ButtonComponent(contentEl)
			.setButtonText(translate("modals.epic.create.submit"))
			.onClick(async (): Promise<void> => {
				await this.form.create();
				this.close();
			})
			.setClass("submit-form-button");
	}
}
