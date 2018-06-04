import * as _ from 'lodash';
import { translate } from './StringTranslator';
import { DynamicElement } from './DynamicElement';

const SELECT_TEMPLATE = `
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Type d'objet</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01">
    <% _.forEach(data, (data_element) => {%>
      <option value="<%= data_element %>"><%= translate(data_element) %></option>    
    <%});%>
  </select>
</div>`;

export class DynamicSelector extends DynamicElement {
  constructor(element: HTMLElement, updater: () => any[]) {
    super(element, updater, _.template(SELECT_TEMPLATE));
  }
}