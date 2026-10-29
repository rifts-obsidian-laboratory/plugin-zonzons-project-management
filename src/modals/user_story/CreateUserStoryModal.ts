import { ButtonComponent, Modal, TextComponent } from "obsidian";
import ZonzonsProjectManagement from "../../main";
import { CreateUserStoryForm } from "../../forms/user_story/CreateUserStoryForm";
import { ProjectSuggest } from "../../suggests/ProjectSuggest";
import { translate } from "../../i18n";

export class CreateUserStoryModal extends Modal {
	plugin: ZonzonsProjectManagement;
	form: CreateUserStoryForm;
	isProjectInputDisabled: boolean = false;

	constructor(plugin: ZonzonsProjectManagement, projectName?: string) {
		super(plugin.app);
		this.plugin = plugin;
		this.form = new CreateUserStoryForm(plugin);
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
		titleEl.setText(translate("modals.user_story.create.title"));

		contentEl.empty();

		this.createProjectInput(contentEl);
		this.createUserStoryFileNameInput(contentEl);
		this.createUserStoryTitleInput(contentEl);
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
			.setValue(this.form.getProject())
			.onChange(async (value: string): Promise<void> => {
				this.form.setProject(value);
			});
		input.inputEl.id = "project-input";
		input.inputEl.setAttribute("aria-describedby", "project-input-description");
		input.setDisabled(this.isProjectInputDisabled);
		new ProjectSuggest(this.plugin, input.inputEl);
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

	createUserStoryTitleInput(contentEl: HTMLElement): void {
		const container: HTMLDivElement = contentEl.createDiv({ cls: "input-container" });

		const label: HTMLLabelElement = container.createEl("label", { text: translate("modals.user_story.create.user_story_title.label") });
		label.setAttribute("for", "title-input");

		const description: HTMLParagraphElement = container.createEl("p", {
			text: translate("modals.user_story.create.user_story_title.description"),
		});
		description.classList.add("input-description");
		description.id = "title-input-description";

		const input: TextComponent = new TextComponent(container)
			.setPlaceholder(translate("modals.user_story.create.user_story_title.placeholder"))
			.onChange((value: string): void => {
				this.form.title = value;
			});
		input.inputEl.id = "title-input";
		input.inputEl.setAttribute("aria-describedby", "title-input-description");
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
