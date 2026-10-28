import { moment } from "obsidian";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const dictionaries: Record<string, any> = {
	en,
	fr
};

export function getObsidianLanguage(): string {
	const language: string = moment.locale();
	return dictionaries[language] ? language : "fr";
}

export function translate(key: string, params: Record<string, string | number> = {}): string {
	const language: string = getObsidianLanguage();

	const value = key
		.split(".")
		.reduce<any>((object, key) => object?.[key], dictionaries[language])
		?? key
			.split(".")
			.reduce<any>((object, key) => object?.[key], dictionaries["fr"])
		?? key;

	return Object
		.entries(params)
		.reduce(
			(text, [name, replacement]) => text.replaceAll(`{{${name}}`, String(replacement)),
			value
		);
}
