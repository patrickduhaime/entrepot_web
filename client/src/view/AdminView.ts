import { IRepository } from '../model/Repository';
import { translate } from '../StringTranslator';
import { AdminController } from '../controller/AdminController';

export interface IAdminViewOptions {
  datasources: {
    title: string;
    repository: IRepository;
  }[]
}

export class AdminView {
  public controller: AdminController;

  constructor(public element: HTMLElement, public options: IAdminViewOptions) {
    //<div class="tab-content mt-3" id = "nav-tabContent" >
    this.element.innerHTML = (`
    <h4>Administration</h4>

    <!-- *** TAB SELECTOR BEGIN *** -->
    <nav class="mt-3">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        ${this.options.datasources.map(datasource => datasource.title).reduce((acc, title) => {
        return (acc + `<a class="nav-item nav-link ${
          acc === '' ? 'active' : ''
          }" id="nav-${title.toLowerCase()}-tab" data-toggle="tab" href="#nav-${title.toLowerCase()}" role="tab">${translate(title)}</a>`);
      }, '')}
      </div>
    </nav>
    <!-- *** TAB SELECTOR END *** -->

    <div class="tab-content mt-3" id="nav-tabContent">
    ${
      this.options.datasources
        .map((datasource, index) => this.buildTabBody(datasource.title, datasource.repository, index === 0))
        .reduce((acc, elem) => acc + elem)
      }
    </div>`);

    this.controller = new AdminController(this.element);
  }

  private buildTabBody(type: string, repository: IRepository, show?: boolean) {
    return (`
      <div id="nav-${type.toLowerCase()}" class="tab-pane fade show ${show ? 'active' : ''}" role="tabpanel">
        <div class="row">
          <div class="col-md-5">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary search-btn" type="button">Rechercher</button>
              </div>
              <input type="search" class="form-control" placeholder="${translate('FIND_A_' + type)}">
            </div>
          </div>
          <div class="col-md-5 mb-3">
            <button type="button" class="btn btn-primary add-btn">
              <i class="fas fa-plus"></i>&nbsp;Ajouter
            </button>
          </div>
        </div>
        ${ this.buildTable(type, repository)}
      </div>`);
  }

  private buildTable(type: string, repository: IRepository): string {
    const entities = repository.read();
    return (`<table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
        ${Object.getOwnPropertyNames(entities[0]).reduce((acc, title) => {
        return acc + `<th scope="col">${translate(title)}</th>`;
      }, '')}
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${entities.reduce((acc, entity) => {
        return acc + `<tr id="${type}-${entity.ID}">${Object.getOwnPropertyNames(entity).reduce((acc, property) => {
          return acc + `<td>${entity[property]}</td>`;
        }, '')}
          <td><button type="button" class="btn btn-danger">${ translate('DELETE')}</button></td>
        </tr>`;
      }, '')}
      </tbody>
    </table>`);
  }

  public updateTable() {
    this.options.datasources.forEach(datasource => {
      $(`.nav-${datasource.title.toLowerCase()} table`)
        .replaceWith(this.buildTable(datasource.title, datasource.repository));
    });
  }
}