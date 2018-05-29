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

const LOCATIONS = [{
  ID: 1,
  SERIAL_NUMBER: 'R01S14',
  NODE_ID: 22
}, {
  ID: 1,
  SERIAL_NUMBER: 'R01S15',
  NODE_ID: 23
}, {
  ID: 1,
  SERIAL_NUMBER: 'R01S16',
  NODE_ID: 24
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

export class DataRepository {
  private static _articles;
  private static _locations;
  private static _entities;

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
}