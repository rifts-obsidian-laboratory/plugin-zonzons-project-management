import { ButtonComponent, Modal } from "obsidian";
import { DeleteProjectForm } from "../../forms/project/DeleteProjectForm";
import ZonzonsProjectManagement from "../../main";
import { translate } from "../../i18n";

export class DeleteProjectModal extends Modal {
	form: DeleteProjectForm;

	constructor(plugin: ZonzonsProjectManagement) {
		super(plugin.app);
		this.form = new DeleteProjectForm(plugin);
	}

	override onOpen(): void {
		const { modalEl, titleEl, contentEl } = this;
		modalEl.addClass("zonzons-project-management");

		const headerEl: HTMLElement = modalEl.querySelector<HTMLElement>(".modal-header")!;
		headerEl.append(this.modalEl.querySelector<HTMLElement>(".modal-header-button")!);

		titleEl.empty();
		titleEl.setText(translate("modals.project.delete.title"));

		contentEl.empty();

		this.contentEl.createEl("p", {
			text: translate("modals.project.delete.warning")
		});

		new ButtonComponent(contentEl)
			.setButtonText(translate("modals.project.delete.submit"))
			.onClick(async (): Promise<void> => {
				await this.form.delete();
				this.close();
			})
			.setWarning()
			.setClass("submit-form-button");
	}
}
