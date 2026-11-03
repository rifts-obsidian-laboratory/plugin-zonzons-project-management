import {I_HasIdentifier} from "../interfaces/I_HasIdentifier";
import {TextComponent} from "obsidian";
import {translate} from "../i18n";
import {HasIdentifierServiceOptions} from "../types/HasIdentifierServiceOptions";

export class HasIdentifierService {
	container: HTMLDivElement | undefined;
	inputContainer: HTMLDivElement | undefined;
	form: I_HasIdentifier;
	options: Partial<HasIdentifierServiceOptions>;

	constructor(form: I_HasIdentifier, options: Partial<HasIdentifierServiceOptions> = {}) {
		this.form = form;
		this.options = options;
	}

	public initialize(container: HTMLElement): void {
		this.container = container.createDiv({ cls: "zpm-has-identifier-container" });

		this.generateInputContainer();
	}

	generateInputContainer(): void {
		if (!this.container) {
			console.error("HasIdentifierService's container is not initialized. Call initialize() before generating the input container.");
			return;
		}

		this.inputContainer = this.container.createDiv({ cls: "zpm-input-container" });

		this.inputContainer.createEl("label", {
			text: this.options.translations?.input.label ?? translate("interfaces.has_identifier.input.label"),
			attr: {
				for: "has-identifier-input",
				id: "has-identifier-label"
			}
		});

		this.inputContainer.createEl("p", {
			text: this.options.translations?.input.description ?? translate("interfaces.has_identifier.input.description"),
			attr: {
				class: "zpm-input-description",
				id: "has-identifier-input-description"
			}
		});

		const input: TextComponent = new TextComponent(this.inputContainer)
			.setPlaceholder(this.options.translations?.input.placeholder ?? translate("interfaces.has_identifier.input.placeholder"))
			.onChange((value: string): void => {
				this.form.identifier = value;
			});
		input.inputEl.id = "has-identifier-input";
		input.inputEl.setAttribute("aria-describedby", "has-identifier-input-description");
	}
}
