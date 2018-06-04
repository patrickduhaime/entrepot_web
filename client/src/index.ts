const ARTICLES = [
  {
    "ID": 1,
    "NAME": "Banane",
    "DESCRIPTION": "Il s'agit d'un fruit jaune",
    "SERIAL_NUMBER": "101"
  },
  {
    "ID": 2,
    "NAME": "Datte",
    "DESCRIPTION": "Il s'agit d'un fruit.",
    "SERIAL_NUMBER": "102"
  },
  {
    "ID": 3,
    "NAME": "Chat",
    "DESCRIPTION": "Ça ne se mange pas",
    "SERIAL_NUMBER": "103"
  }
];
const LOCATIONS = [
  {
    "ID": 1,
    "SERIAL_NUMBER": 'R01S14',
    "NODE_ID": 22
  }, {
    "ID": 1,
    "SERIAL_NUMBER": 'R01S15',
    "NODE_ID": 23
  }, {
    "ID": 1,
    "SERIAL_NUMBER": 'R01S16',
    "NODE_ID": 24
  }
];
const WAREHOUSES = [
  {
    "ID": 1,
    "IDENTIFIER": 'E1',
    "ADDRESS": '220 Rue Bonheur Montréal H3G8B2'
  }, {
    "ID": 2,
    "IDENTIFIER": 'E2',
    "ADDRESS": '4 Rue Souffrance Montréal H3G8B2'
  }, {
    "ID": 3,
    "IDENTIFIER": 'E3',
    "ADDRESS": '17 Av. Rien  Montréal H3G8B2'
  }
];
const CATEGORIES = [
  {
    "ID": 1,
    "CODE": 'MP',
    "NAME": 'Matières premières',
    "DESCRIPTION": 'Matières premières et plus'
  }, {
    "ID": 1,
    "CODE": 'L',
    "NAME": 'Liquides',
    "DESCRIPTION": 'Articles liquides'
  }, {
    "ID": 1,
    "CODE": 'V',
    "NAME": 'Vrac',
    "DESCRIPTION": 'Articles stockés en vrac'
  }
];
const SETTING = {
  dataSources: [
    {
      title: 'ARTICLE',
      repository: new ArticleRepository(ARTICLES)
    },
    {
      title: 'LOCATION',
      repository: new LocationRepository(LOCATIONS)
    },
    {
      title: 'WAREHOUSE',
      repository: new WarehouseRepository(WAREHOUSES)
    },
    {
      title: 'CATEGORIE',
      repository: new CategoryRepository(CATEGORIES)
    }
  ]
};

import { ArticleRepository } from './model/ArticleRepository';
import { LocationRepository } from './model/LocationRepository';
import { WarehouseRepository } from './model/WarehouseRepository';
import { CategoryRepository } from './model/CategoryRepository';
import { ManagementView } from './view/ManagementView';
import { DynamicTable } from './DynamicTable';
import { DynamicSelector } from './DynamicSelector';


document.addEventListener("DOMContentLoaded", (event) => {

  //new ManagementView(document.getElementById('app'), SETTING);
  document.getElementById("table-article")['obj'] = new DynamicTable(document.getElementById("table-article"), (SETTING.dataSources[0].repository as ArticleRepository).read);
  document.getElementById("table-location")['obj'] = new DynamicTable(document.getElementById("table-location"), (SETTING.dataSources[1].repository as LocationRepository).read);
  document.getElementById("table-warehouse")['obj'] = new DynamicTable(document.getElementById("table-warehouse"), (SETTING.dataSources[2].repository as WarehouseRepository).read);
  document.getElementById("table-category")['obj'] = new DynamicTable(document.getElementById("table-category"), (SETTING.dataSources[3].repository as CategoryRepository).read);
});