const ARTICLES = [{ ID: 1, NAME: "Banane", DESCRIPTION: "Il s'agit d'un fruit jaune", SERIAL_NUMBER: "101" }, { ID: 2, NAME: "Datte", DESCRIPTION: "Il s'agit d'un fruit.", SERIAL_NUMBER: "102" }, { ID: 3, NAME: "Chat", DESCRIPTION: "Ça ne se mange pas", SERIAL_NUMBER: "103" }];
const LOCATIONS = [{ ID: 1, SERIAL_NUMBER: 'R01S14', NODE_ID: 22 }, { ID: 1, SERIAL_NUMBER: 'R01S15', NODE_ID: 23 }, { ID: 1, SERIAL_NUMBER: 'R01S16', NODE_ID: 24 }];
const SETTING = {
  dataSources: [
    {
      title: 'ARTICLE',
      repository: new ArticleRepository()
    },
    {
      title: 'LOCATION',
      repository: new LocationRepository()
    }
  ]
};

import { ArticleRepository } from './model/ArticleRepository';
import { LocationRepository } from './model/LocationRepository';
import { ManagementView } from './view/ManagementView';



document.addEventListener("DOMContentLoaded", (event) => {
  window['ArticleRepository'] = SETTING.dataSources[0].repository;
  window['LocationRepository'] = SETTING.dataSources[0].repository;

  new ManagementView(document.getElementById('app'), SETTING);
});