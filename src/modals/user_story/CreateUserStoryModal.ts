import { ButtonComponent, Modal, TextComponent } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { CreateUserStoryForm } from "../../forms/user_story/CreateUserStoryForm";
import { AgileProjectSuggest } from "../../suggests/AgileProjectSuggest";
import { translate } from "../../i18n";
import {HasInlineTitleService} from "../../services/HasInlineTitleService";
import {EpicSuggest} from "../../suggests/EpicSuggest";

export class CreateUserStoryModal extends Modal {
	plugin: ZonzonsProjectManagement;
	form: CreateUserStoryForm;
	isProjectInputDisabled: boolean = false;
	epicSuggest: EpicSuggest | null;
	isEpicInputDisabled: boolean = false;

	constructor(plugin: ZonzonsProjectManagement, projectName?: string) {
		super(plugin.app);
		this.plugin = plugin;
		this.form = new CreateUserStoryForm(plugin);
		if (projectName) {
			this.form.setProject(projectName);
			this.isProjectInputDisabled = true;
		}
		this.epicSuggest = null;
	}

	override onOpen(): void {
		const { modalEl, titleEl, contentEl } = this;
		modalEl.addClass("zonzons-project-management");

		const headerEl: HTMLElement = modalEl.querySelector<HTMLElement>(".modal-header")!;
		headerEl.append(this.modalEl.querySelector<HTMLElement>(".modal-header-button")!);

		titleEl.empty();
		titleEl.setText(translate("modals.user_story.create.title"));

		contentEl.empty();

		this.createProjectInput(contentEl);
		this.createEpicInput(contentEl);
		this.createUserStoryFileNameInput(contentEl);

		const hasInlineTitleService = new HasInlineTitleService(this.form);
		hasInlineTitleService.initialize(contentEl);

		this.createSubmitButton(contentEl);
	}

	createProjectInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.user_story.create.project.label") });
		label.setAttribute("for", "project-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.user_story.create.project.description"),
		});
		description.classList.add("input-description");
		description.id = "project-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.user_story.create.project.placeholder"))
			.setValue(this.form.getProjectName())
			.onChange(async (value: string): Promise<void> => {
				this.form.setProject(value);
				if (this.epicSuggest) this.epicSuggest.project = this.form.project;
			});
		input.inputEl.id = "project-input";
		input.inputEl.setAttribute("aria-describedby", "project-input-description");
		input.setDisabled(this.isProjectInputDisabled);
		new AgileProjectSuggest(this.plugin, input.inputEl);
	}

	createEpicInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container "});

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.user_story.create.epic.label") });
		label.setAttribute("for", "epic-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.user_story.create.epic.description"),
		});
		description.classList.add("input-description");
		description.id = "epic-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.user_story.create.epic.placeholder"))
			.setValue(this.form.getEpicIdentifier())
			.onChange(async (value: string): Promise<void> => {
				this.form.setEpic(value);
			});
		input.inputEl.id = "epic-input";
		input.inputEl.setAttribute("aria-describedby", "epic-input-description");
		input.setDisabled(this.isEpicInputDisabled);

		this.epicSuggest = new EpicSuggest(this.plugin, input.inputEl, this.form.project);
	}

	createUserStoryFileNameInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.user_story.create.user_story_file_name.label") });
		label.setAttribute("for", "file-name-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.user_story.create.user_story_file_name.description"),
		});
		description.classList.add("input-description");
		description.id = "file-name-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.user_story.create.user_story_file_name.placeholder"))
			.onChange((value: string): void => {
				this.form.fileName = value;
			});
		input.inputEl.id = "file-name-input";
		input.inputEl.setAttribute("aria-describedby", "file-name-input-description");
	}

	createSubmitButton(contentEl: HTMLElement): void {
		new ButtonComponent(contentEl)
			.setButtonText(translate("modals.user_story.create.submit"))
			.onClick(async (): Promise<void> => {
				await this.form.create();
				this.close();
			})
			.setClass("submit-form-button");
	}
}
