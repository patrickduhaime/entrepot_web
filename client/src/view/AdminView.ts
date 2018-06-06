import { IRepository } from '../model/Repository';
import { translate } from '../StringTranslator';

export interface IAdminViewOptions {
  datasources: {
    title: string;
    repository: IRepository;
  }[]
}

export class AdminView {
  constructor(public element: HTMLElement, public options: IAdminViewOptions) {
    //<div class="tab-content mt-3" id = "nav-tabContent" >
    this.element.innerHTML = `
    <h4>Administration</h4>

    <!-- *** TAB SELECTOR BEGIN *** -->
    <nav class="mt-3">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        ${this.options.datasources.map(datasource => datasource.title).reduce((acc, title, i) => {
        if (i === 0) {
          return (`<a class="nav-item nav-link" id="nav-${title.toLowerCase()}-tab" data-toggle="tab" href="#nav-${title.toLowerCase()}" role="tab">${translate(title)}</a>`);
        } else {
          return (acc + `<a class="nav-item nav-link" id="nav-${title.toLowerCase()}-tab" data-toggle="tab" href="#nav-${title.toLowerCase()}" role="tab">${translate(title)}</a>`);
        }
      })}
      </div>
    </nav>
    <!-- *** TAB SELECTOR END *** -->

    <div class="tab-content mt-3" id="nav-tabContent">
    ${
      this.options.datasources
        .map(datasource => this.buildTabBody(datasource.title, datasource.repository))
        .reduce((acc, elem) => acc + elem)
      }
    </div>
`;
  }

  private buildTabBody(type: string, repository: IRepository) {
    return (`
      <div id="nav-${type.toLowerCase()}" class="tab-pane fade show" role="tabpanel">
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
        ${ this.buildTable(repository)}
      </div>`);
  }

  private buildTable(repository: IRepository): string {
    // TODO
    return '';
  }
}