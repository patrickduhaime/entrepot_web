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

export interface IArticle {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
  SERIAL_NUMBER: string;
}

export class DataRepository {
  public static articles = ARTICLES;
  public static entities = ['ARTICLE']
}