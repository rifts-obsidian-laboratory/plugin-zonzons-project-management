import {translate} from "../i18n";
import {TextComponent} from "obsidian";
import {I_HasInlineTitle} from "../interfaces/I_HasInlineTitle";
import {HasTitleServiceOptions} from "../types/HasTitleServiceOptions";

export class HasInlineTitleService {
	container: HTMLDivElement | undefined;
	checkboxContainer: HTMLDivElement | undefined;
	inputContainer: HTMLDivElement | undefined;
	form: I_HasInlineTitle;
	options: Partial<HasTitleServiceOptions>;


	constructor(form: I_HasInlineTitle, options: Partial<HasTitleServiceOptions> = {}) {
		this.form = form
		this.container = undefined;
		this.checkboxContainer = undefined;
		this.inputContainer = undefined;
		this.options = options;
	}

	public initialize(container: HTMLElement): void {
		this.container = container.createDiv({ cls: "zpm-has-inline-title-container" });

		this.generateCheckbox();
		this.generateInputContainer();
	}

	generateCheckbox(): void {
		if (!this.container) {
			console.error("HasInlineTitleService's container is not initialized. Call initialize() before generating the checkbox.");
			return;
		}

		this.checkboxContainer = this.container.createDiv({ cls: "zpm-checkbox-container" });

		const label: HTMLLabelElement = this.checkboxContainer.createEl("label", {
			attr: {
				for: "has-inline-title-checkbox",
			}
		});
		this.appendInlineCode(label, this.options.translations?.checkbox.label ?? translate("interfaces.has_title.checkbox.label"));

		const input: HTMLInputElement = this.checkboxContainer.createEl("input", {
			type: "checkbox",
			attr: {
				id: "has-inline-title-checkbox"
			}
		});

		input.addEventListener("change", (event: Event): void => {
			this.toggleHasTitle(event);
		});
	}

	generateInputContainer(): void {
		if (!this.container) {
			console.error("HasInlineTitleService's container is not initialized. Call initialize() before generating the input container.");
			return;
		}

		this.inputContainer = this.container.createDiv({ cls: "zpm-input-container" });
		this.inputContainer.classList.toggle("zpm-is-hidden", !this.form.hasInlineTitle);

		const label: HTMLLabelElement = this.inputContainer.createEl("label", {
			attr: {
				for: "title-input",
				id: "has-inline-title-input-label",
			}
		});
		this.appendInlineCode(label, this.options.translations?.input.label ?? translate("interfaces.has_title.input.label"));

		const description: HTMLParagraphElement = this.inputContainer.createEl("p", {
			attr: {
				class: "zpm-input-description",
				id: "has-inline-title-input-description",
			}
		});
		this.appendInlineCode(description, this.options.translations?.input.description ?? translate("interfaces.has_title.input.description"));

		const input: TextComponent = new TextComponent(this.inputContainer)
			.setPlaceholder(this.options.translations?.input.placeholder ?? translate("interfaces.has_title.input.placeholder"))
			.onChange((value: string): void => {
				this.form.inlineTitle = value;
			});
		input.inputEl.id = "title-input";
		input.inputEl.setAttribute("aria-describedby", "title-input-description");
	}

	toggleHasTitle(event: Event): void {
		this.form.hasInlineTitle = (event.target as HTMLInputElement).checked;
		this.checkboxContainer?.classList.toggle("zpm-is-hidden", this.form.hasInlineTitle);
		this.inputContainer?.classList.toggle("zpm-is-hidden", !this.form.hasInlineTitle);
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
