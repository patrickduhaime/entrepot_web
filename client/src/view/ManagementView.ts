import * as _ from 'lodash';
import { IRepository } from '../model/Repository';
import { ArticleRepository } from '../model/ArticleRepository';
import { LocationRepository } from '../model/LocationRepository';
import { translate } from '../StringTranslator';

const MANAGEMENT_VIEW_TEMPLATE = `
<div class="management-panel">
  <div class="input-group mb-3">
    <div class="input-group-prepend"></div>
    <input type="search" class="form-control">
  </div>
</div>
`;



export interface IDataSource {
  title: string;
  repository: IRepository;
}

export interface IManagementViewOptions {
  dataSources: IDataSource[];
}

export class ManagementView {
  private parser: DOMParser;

  constructor(protected element: HTMLElement, protected options: IManagementViewOptions) {
    this.parser = new DOMParser();
  }

  public render() {
    let elem = document.createElement('div')
    elem.outerHTML = MANAGEMENT_VIEW_TEMPLATE;
    let prepend = elem.querySelector('.input-group-prepend');
    prepend.appendChild(this.buildSourceSelect());
    this.element.outerHTML = elem.outerHTML;
  }

  private buildSourceSelect(): HTMLElement {
    const dropDownMenu = document.createElement('select');
    dropDownMenu.className = 'custom-select';
    dropDownMenu.innerHTML = this.options.dataSources
      .map(datasource => `<option>${translate(datasource.title)}</option>`)
      .reduce((acc, menuitem) => acc + menuitem);

    return dropDownMenu;
  }
}