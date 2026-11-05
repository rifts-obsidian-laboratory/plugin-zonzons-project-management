export class PathHelper {
	static join(...args: string[]): string {
		return args.join("/");
	}

	static addMarkdownFileExtension(path: string): string {
		return path.endsWith(".md")
			? path
			: path += ".md";
	}

	static addBaseFileExtension(path: string): string {
		return path.endsWith(".base")
			? path
			: path += ".base";
	}

	static buildMarkdownFilePath(...args: string[]): string {
		let path: string = this.join(...args);
		return this.addMarkdownFileExtension(path);
	}

	static buildBaseFilePath(...args: string[]): string {
		let path: string = this.join(...args);
		return this.addBaseFileExtension(path);
	}
}
