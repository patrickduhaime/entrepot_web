import { DynamicTable } from './DynamicTable';
import { DynamicSelector } from './DynamicSelector';
import { translate } from './StringTranslator';
import { DataRepository } from './DataRepository';

window["translate"] = translate;

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("table-article")['obj'] = new DynamicTable(document.getElementById("table-article"), () => DataRepository.articles);
  document.getElementById("object-selector")['obj'] = new DynamicSelector(document.getElementById("object-selector"), () => DataRepository.entities);
  document.getElementById("table-warehouse")['obj'] = new DynamicTable(document.getElementById("table-warehouse"), () => DataRepository.warehouses);
  document.getElementById("table-location")['obj'] = new DynamicTable(document.getElementById("table-location"), () => DataRepository.locations);
  document.getElementById("table-category")['obj'] = new DynamicTable(document.getElementById("table-category"), () => DataRepository.categories);
});