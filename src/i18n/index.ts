import { moment } from "obsidian";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

// Ce fichier a été développé par l'I.A.. Bien qu'il ait été vérifié et qu'il fonctionne, il faudra sûrement le retravailler un jour.
// This file has been developed by A.I.. Although it has been verified and it works, it will surely have to be reworked one day.

interface TranslationDictionary {
	[key: string]: string | TranslationDictionary;
}

const dictionaries: Record<string, TranslationDictionary> = {
	en,
	fr
};

function findTranslation(
	dictionary: TranslationDictionary | undefined,
	key: string
): string | undefined {
	let current: string | TranslationDictionary | undefined = dictionary;

	for (const segment of key.split(".")) {
		if (typeof current !== "object" || current === null) {
			return undefined;
		}

		current = current[segment];
	}

	return typeof current === "string" ? current : undefined;
}

export function getObsidianLanguage(): string {
	const language: string = moment.locale();
	return dictionaries[language] ? language : "fr";
}

export function translate(key: string, params: Record<string, string | number> = {}): string {
	const language: string = getObsidianLanguage();
	const value: string =
		findTranslation(dictionaries[language], key)
		?? findTranslation(dictionaries.fr, key)
		?? key;

	return Object
		.entries(params)
		.reduce(
			(text: string, [name, replacement]) =>
				text.replaceAll(`{{${name}}}`, String(replacement)),
			value
		);
}
