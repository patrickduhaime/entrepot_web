const ARTICLES: IArticle[] = [
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

const LOCATIONS: ILocation[] = [
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
  }];

const WAREHOUSES: IWarehouse[] = [
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
  }];

const CATEGORIES: ICategory[] = [
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
  }];

export interface IArticle {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
  SERIAL_NUMBER: string;
}

export interface ILocation {
  ID: number;
  SERIAL_NUMBER: string;
  NODE_ID: number;
}

export interface IWarehouse {
  ID: number;
  IDENTIFIER: string;
  ADDRESS: string;
}

export interface ICategory {
  ID: number;
  CODE: string;
  NAME: string;
  DESCRIPTION: string;
}

export class DataRepository {
  private static _articles;
  private static _locations;
  private static _entities;
  private static _warehouses;
  private static _categories;

  public static get articles(): IArticle[] {
    if (!this._articles) {
      // call service lorsque ce sera implémenter.
      this._articles = ARTICLES;
    }
    return this._articles;
  }

  public static get locations(): ILocation[] {
    if (!this._locations) {
      // call service lorsque ce sera implémenter.
      this._locations = LOCATIONS;
    }
    return this._locations;
  }

  public static get entities(): String[] {
    if (!this._entities) {
      // call service lorsque ce sera implémenter.
      this._entities = ['ARTICLE', 'LOCATION'];
    }
    return this._entities;
  }

  public static get warehouses(): IWarehouse[] {
    if (!this._warehouses) {
      // call service lorsque ce sera implémenter.
      this._warehouses = WAREHOUSES;
    }
    return this._warehouses;
  }

  public static get categories(): ICategory[] {
    if (!this._categories) {
      // call service lorsque ce sera implémenter.
      this._categories = CATEGORIES;
    }
    return this._categories;
  }
}