import {I_HasCode} from "../interfaces/I_HasCode";
import {TextComponent} from "obsidian";
import {translate} from "../i18n";
import {HasCodeServiceOptions} from "../types/HasCodeServiceOptions";

export class HasCodeService {
	container: HTMLDivElement | undefined;
	inputContainer: HTMLDivElement | undefined;
	form: I_HasCode;
	options: Partial<HasCodeServiceOptions>;

	constructor(form: I_HasCode, options: Partial<HasCodeServiceOptions> = {}) {
		this.form = form;
		this.options = options;
	}

	public initialize(container: HTMLElement): void {
		this.container = container.createDiv({ cls: "zpm-has-code-container" });

		this.generateInputContainer();
	}

	generateInputContainer(): void {
		if (!this.container) {
			console.error("HasCodeService's container is not initialized. Call initialize() before generating the input container.");
			return;
		}

		this.inputContainer = this.container.createDiv({ cls: "zpm-input-container" });

		this.inputContainer.createEl("label", {
			text: this.options.translations?.input.label ?? translate("interfaces.has_code.input.label"),
			attr: {
				for: "has-code-input",
				id: "has-code-label"
			}
		});

		this.inputContainer.createEl("p", {
			text: this.options.translations?.input.description ?? translate("interfaces.has_code.input.description"),
			attr: {
				class: "zpm-input-description",
				id: "has-code-input-description"
			}
		});

		const input: TextComponent = new TextComponent(this.inputContainer)
			.setPlaceholder(this.options.translations?.input.placeholder ?? translate("interfaces.has_code.input.placeholder"))
			.onChange((value: string): void => {
				this.form.code = value;
			});
		input.inputEl.id = "has-code-input";
		input.inputEl.setAttribute("aria-describedby", "has-code-input-description");
	}
}
