import * as _ from 'lodash';

export enum Op {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export interface IArticle {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
  SERIAL_NUMBER: string;
}

export interface IOperation {
  operation: Op;
  article: IArticle;
}

export class ArticleRepository {
  private articles: IArticle[];
  private operations: IOperation[]

  constructor(articles?: IArticle[]) {
    this.articles = articles;
    this.operations = new Array<IOperation>();
  }

  public create(name: string, description: string, serial_number: string): IArticle {
    const top_index = _.max(_.map(this.articles, article => article.ID));
    const article = {
      ID: top_index + 1,
      NAME: name,
      DESCRIPTION: description,
      SERIAL_NUMBER: serial_number
    }

    this.operations.push({ operation: Op.CREATE, article: article });
    this.articles = _.union(this.articles, [article]);

    return article;
  }

  public read(id?: number, name?: string, description?: string, serial_number?: string): IArticle[] {
    return _.filter(this.articles, article => {
      return (id && article.ID === id)
        || (name && article.NAME === name)
        || (description && article.DESCRIPTION === description)
        || (serial_number && article.SERIAL_NUMBER === serial_number);
    });
  }

  public update(id: number, name: string, description: string, serial_number: string): IArticle {
    let updated_article: IArticle;

    this.articles = _.map(this.articles, article => {
      if (article.ID === id) {
        updated_article = {
          ID: id,
          NAME: name ? name : article.NAME,
          DESCRIPTION: description ? description : article.DESCRIPTION,
          SERIAL_NUMBER: serial_number ? serial_number : article.SERIAL_NUMBER
        };
        return updated_article;
      }
      return article;
    });

    if (updated_article) {
      this.operations.push({ operation: Op.UPDATE, article: updated_article });
      return updated_article;
    } else {
      throw new Error('L\'article n\'est pas défini.');
    }
  }

  public delete(id?: number, name?: string, description?: string, serial_number?: string): IArticle {
    let deleted_article: IArticle;
    this.articles = _.filter(this.articles, article => {
      if ((id && article.ID === id)
        || (name && article.NAME === name)
        || (description && article.DESCRIPTION === description)
        || (serial_number && article.SERIAL_NUMBER === serial_number)) {
        deleted_article = article;
        return false;
      }
    });

    if (deleted_article) {
      this.operations.push({ operation: Op.DELETE, article: deleted_article });
      return deleted_article;
    } else {
      throw new Error('L\'article n\'est pas défini.');
    }
  }

  /**
   * Load les articles du serveur si **articles** est `undefined`.
   */
  public load(): void {
    // Fait un appel au serveur pour obtenir les articles.
  }

  /**
   * Sauvegarde l'état du repository.
   */
  public save(): void {
    // Fait un appel au serveur pour envoyer ses modifications.
  }
}