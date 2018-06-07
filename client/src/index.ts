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
    "ID": 2,
    "SERIAL_NUMBER": 'R01S15',
    "NODE_ID": 23
  }, {
    "ID": 3,
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
    "ID": 2,
    "CODE": 'L',
    "NAME": 'Liquides',
    "DESCRIPTION": 'Articles liquides'
  }, {
    "ID": 3,
    "CODE": 'V',
    "NAME": 'Vrac',
    "DESCRIPTION": 'Articles stockés en vrac'
  }
];
const SETTING = {
  datasources: [
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
import { AdminView } from './view/AdminView'
import { AdminController } from './controller/AdminController';
import { MovementController } from './controller/MovementController';
import { MenuController } from './controller/MenuController';


document.addEventListener("DOMContentLoaded", (event) => {

  // Admin page init
  document.getElementById('admin-page')['obj'] = new AdminView(document.getElementById('admin-page'), SETTING);

  // Controller bootstrap
  let menu_element = document.getElementById('navbar');
  menu_element['obj'] = new MenuController(menu_element);
  let admin_element = document.getElementById('admin-page');
  admin_element['obj'] = new AdminController(admin_element);
  let movement_element = document.getElementById('movement-page');
  movement_element['obj'] = new MovementController(movement_element);
});