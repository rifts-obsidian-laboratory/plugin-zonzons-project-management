import {translate} from "../i18n";
import {TextComponent} from "obsidian";
import {I_HasTitle} from "../interfaces/I_HasTitle";

export class HasTitleService {
	container: HTMLDivElement | undefined;
	checkboxContainer: HTMLDivElement | undefined;
	inputContainer: HTMLDivElement | undefined;
	form: I_HasTitle;


	constructor(form: I_HasTitle) {
		this.form = form
		this.container = undefined;
		this.checkboxContainer = undefined;
		this.inputContainer = undefined;
	}

	public initialize(container: HTMLElement): void {
		this.container = container.createDiv({ cls: "zpm-has-title-container" });

		this.generateCheckbox();
		this.generateInputContainer();
	}

	generateCheckbox(): void {
		if (!this.container) {
			console.error("HasTitleService's container is not initialized. Call initialize() before generating the checkbox.");
			return;
		}

		this.checkboxContainer = this.container.createDiv({ cls: "zpm-checkbox-container" });

		const label: HTMLLabelElement = this.checkboxContainer.createEl("label", {
			attr: {
				for: "has-title-checkbox",
			}
		});
		this.appendInlineCode(label, translate("interfaces.has_title.checkbox.label"));

		const input: HTMLInputElement = this.checkboxContainer.createEl("input", {
			type: "checkbox",
			attr: {
				id: "has-title-checkbox"
			}
		});

		input.addEventListener("change", (event: Event): void => {
			this.toggleHasTitle(event);
		});
	}

	generateInputContainer(): void {
		if (!this.container) {
			console.error("HasTitleService's container is not initialized. Call initialize() before generating the input container.");
			return;
		}

		this.inputContainer = this.container.createDiv({ cls: "zpm-input-container" });
		this.inputContainer.classList.toggle("zpm-is-hidden", !this.form.hasTitle);

		const label: HTMLLabelElement = this.inputContainer.createEl("label", {
			attr: {
				for: "title-input",
				id: "has-title-input-label",
			}
		});
		this.appendInlineCode(label, translate("interfaces.has_title.input.label"));

		const description: HTMLParagraphElement = this.inputContainer.createEl("p", {
			attr: {
				class: "zpm-input-description",
				id: "has-title-input-description",
			}
		});
		this.appendInlineCode(description, translate("interfaces.has_title.input.description"));

		const input: TextComponent = new TextComponent(this.inputContainer)
			.setPlaceholder(translate("interfaces.has_title.input.placeholder"))
			.onChange((value: string): void => {
				this.form.title = value;
			});
		input.inputEl.id = "title-input";
		input.inputEl.setAttribute("aria-describedby", "title-input-description");
	}

	toggleHasTitle(event: Event): void {
		this.form.hasTitle = (event.target as HTMLInputElement).checked;
		this.checkboxContainer?.classList.toggle("zpm-is-hidden", this.form.hasTitle);
		this.inputContainer?.classList.toggle("zpm-is-hidden", !this.form.hasTitle);
	}

	appendInlineCode(parent: HTMLElement, text: string): void {
		const parts: string[] = text.split(/<\/?code>/g);

		parts.forEach((part: string, index: number): void => {
			if (index % 2 === 1) {
				parent.createEl("code", { text: part });
			} else {
				parent.appendText(part);
			}
		});
	}
}
