export class CreateProjectForm {
	public name: string = "";
	public type: string = "traditional";

	public create(): void {
		console.log(this.name, this.type);
	}
}
