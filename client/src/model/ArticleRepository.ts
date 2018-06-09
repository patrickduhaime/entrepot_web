import * as _ from 'lodash';
import { IRepository, IEntity } from './Repository';

enum Op {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

interface IArticleOperation {
  operation: Op;
  article: IArticle;
}

export interface IArticle extends IEntity {
  NAME: string;
  DESCRIPTION: string;
  SERIAL_NUMBER: string;
  LOCATION: string;
}

export class ArticleRepository implements IRepository {
  private articles: IArticle[];
  private operations: IArticleOperation[]

  constructor(articles?: IArticle[]) {
    this.articles = articles ? articles : new Array<IArticle>();
    this.operations = new Array<IArticleOperation>();
  }

  /**
   * Créé un article dans le repository.
   * @param name Le nom de l'article.
   * @param description La description de l'article.
   * @param serial_number Le numéro de série de l'article.
   */
  public create(entity: IArticle): IArticle {
    const name = entity.NAME;
    const description = entity.DESCRIPTION;
    const serial_number = entity.SERIAL_NUMBER;
    const location = entity.LOCATION;

    const top_index = _.max(_.map(this.articles, article => article.ID));
    const article = {
      ID: top_index + 1,
      NAME: name,
      DESCRIPTION: description,
      SERIAL_NUMBER: serial_number,
      LOCATION: location
    }

    this.operations.push({ operation: Op.CREATE, article: article });
    this.articles = _.union(this.articles, [article]);

    return article;
  }

  /**
   * Renvoi tous les articles qui correspond aux filtres.
   * Renvoi tout si aucun filtre n'est donnés.
   * @param id L'identifiant local d'un article.
   * @param name Le nom de l'article.
   * @param description La description de l'article.
   * @param serial_number Le numéro de série de l'article.
   */
  public read(entity?: IArticle): IArticle[] {
    const id = entity ? entity.ID : null;
    const name = entity ? entity.NAME : null;
    const description = entity ? entity.DESCRIPTION : null;
    const serial_number = entity ? entity.SERIAL_NUMBER : null;
    const location = entity ? entity.LOCATION : null;

    if (!id && !name && !description && !serial_number) {
      return new Array(...this.articles);
    }

    return _.filter(this.articles, article => {
      return (id && article.ID === id)
        || (name && article.NAME === name)
        || (description && article.DESCRIPTION === description)
        || (serial_number && article.SERIAL_NUMBER === serial_number)
        || (location && article.LOCATION === location);
    });
  }

  /**
   * Met à jour un article correspondant aux filtres.
   * @param id L'identifiant local d'un article.
   * @param name Le nom de l'article.
   * @param description La description de l'article.
   * @param serial_number Le numéro de série de l'article.
   */
  public update(entity: IArticle): IArticle {
    const id = entity.ID;
    const name = entity.NAME;
    const description = entity.DESCRIPTION;
    const serial_number = entity.SERIAL_NUMBER;
    const location = entity.LOCATION;

    let updated_article: IArticle;

    this.articles = _.map(this.articles, article => {
      if (article.ID === id) {
        updated_article = {
          ID: id,
          NAME: name ? name : article.NAME,
          DESCRIPTION: description ? description : article.DESCRIPTION,
          SERIAL_NUMBER: serial_number ? serial_number : article.SERIAL_NUMBER,
          LOCATION: location ? location : article.LOCATION
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

  /**
   * Détruit un article correspondant aux filtres.
   * @param id L'identifiant local d'un article.
   * @param name Le nom de l'article.
   * @param description La description de l'article.
   * @param serial_number Le numéro de série de l'article.
   */
  public delete(entity: IArticle): IArticle {
    const id = entity.ID;
    const name = entity.NAME;
    const description = entity.DESCRIPTION;
    const serial_number = entity.SERIAL_NUMBER;
    const location = entity.LOCATION;

    let deleted_article: IArticle;

    this.articles = _.filter(this.articles, article => {
      if ((id && article.ID === id)
        || (name && article.NAME === name)
        || (description && article.DESCRIPTION === description)
        || (serial_number && article.SERIAL_NUMBER === serial_number)
        || (location && article.LOCATION === location)) {
        deleted_article = article;
        return false;
      }
      return true;
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