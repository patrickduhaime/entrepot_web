import { DynamicTable } from './DynamicTable';
import { DynamicSelector } from './DynamicSelector';
import { translate } from './StringTranslator';
import { DataRepository } from './DataRepository';

window["translate"] = translate;

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("table-article")['obj'] = new DynamicTable(document.getElementById("table-article"), () => DataRepository.articles);
  document.getElementById("object-selector")['obj'] = new DynamicSelector(document.getElementById("object-selector"), () => DataRepository.entities);
});