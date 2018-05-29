import { TemplateExecutor } from "lodash";

export abstract class DynamicElement {
  protected template: TemplateExecutor;
  public element;
  public updater;

  constructor(element: HTMLElement, updater: () => any[], template: TemplateExecutor) {
    this.element = element;
    this.updater = updater;
    this.template = template;
    this.update();
  }

  public update(): void {
    this.element.innerHTML = this.template({ data: this.updater() });
  }
}