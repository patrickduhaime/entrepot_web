import * as _ from 'lodash';
import { translate } from './StringTranslator';
import { DataRepository } from './DataRepository';
import { DynamicElement } from './DynamicElement';

window['translate'] = translate;

const TABLE_TEMPLATE = `<table class="table table-striped table-hover">
<thead class="thead-dark">
  <tr>
    <% _.forEach(Object.getOwnPropertyNames(data[0]), (property) => {%>
      <th scope="col">
        <%= window.translate(property) %>
      </th>
      <%});%>
  </tr>
</thead>
<tbody>
  <% _.forEach(data, (data_element) => {%>
    <tr>
      <% _.forEach(Object.getOwnPropertyNames(data_element), (property) => {%>
        <td>
          <%= data_element[property] %>
        </td>
        <%});%>
    </tr>
    <%});%>
</tbody>
</table>`;

export class DynamicTable extends DynamicElement {
  constructor(element: HTMLElement, updater: () => { [key: string]: any }[]) {
    super(element, updater, _.template(TABLE_TEMPLATE));
  }
}