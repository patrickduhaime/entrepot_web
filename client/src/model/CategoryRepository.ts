import * as _ from 'lodash';
import { IRepository } from './Repository';

enum Op {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

interface ICategoryOperation {
  operation: Op;
  category: ICategory;
}

export interface ICategory {
  ID: number;
  CODE: string;
  NAME: string;
  DESCRIPTION: string;
}

export class CategoryRepository implements IRepository {
  private categorys: ICategory[];
  private operations: ICategoryOperation[]

  constructor(categorys?: ICategory[]) {
    this.categorys = categorys ? categorys : new Array<ICategory>();
    this.operations = new Array<ICategoryOperation>();
  }

  /**
   * Créé une category dans le repository.
   * @param code Le code de la catégorie.
   * @param name Le nom de la catégorie.
   * @param description Description de la catégorie.
   */
  public create(code: string, name: string, description: string): ICategory {
    const top_index = _.max(_.map(this.categorys, category => category.ID));
    const category = {
      ID: top_index + 1,
      CODE: code,
      NAME: name,
      DESCRIPTION: description
    }

    this.operations.push({ operation: Op.CREATE, category: category });
    this.categorys = _.union(this.categorys, [category]);

    return category;
  }

  /**
   * Renvoi tous les categorys qui correspond aux filtres.
   * Renvoi tout si aucun filtre n'est donnés.
   * @param id L'identifiant local d'une category.
   * @param code Le code de la catégorie.
   * @param name Le nom de la catégorie.
   * @param description Description de la catégorie.
   */
  public read(id?: number, code?: string, name?: string, description?: string): ICategory[] {
    if (!id && !code && !name) {
      return new Array(...this.categorys);
    }

    return _.filter(this.categorys, category => {
      return (id && category.ID === id)
        || (code && category.CODE === code)
        || (name && category.NAME === name)
        || (description && category.DESCRIPTION === description);
    });
  }

  /**
   * Met à jour la category correspondant aux filtres.
   * @param id L'identifiant local d'une category.
   * @param code Le code de la catégorie.
   * @param name Le nom de la catégorie.
   * @param description Description de la catégorie.
   */
  public update(id?: number, code?: string, name?: string, description?: string): ICategory {
    let updated_category: ICategory;

    this.categorys = _.map(this.categorys, category => {
      if (category.ID === id) {
        updated_category = {
          ID: id,
          CODE: code ? code : category.CODE,
          NAME: name ? name : category.NAME,
          DESCRIPTION: description ? description : category.DESCRIPTION
        };
        return updated_category;
      }
      return category;
    });

    if (updated_category) {
      this.operations.push({ operation: Op.UPDATE, category: updated_category });
      return updated_category;
    } else {
      throw new Error('L\'category n\'est pas défini.');
    }
  }

  /**
   * Détruit une category correspondant aux filtres.
   * @param id L'identifiant local d'une category.
   * @param code Le code de la catégorie.
   * @param name Le nom de la catégorie.
   * @param description Description de la catégorie.
   */
  public delete(id?: number, code?: string, name?: string, description?: string): ICategory {
    let deleted_category: ICategory;
    this.categorys = _.filter(this.categorys, category => {
      if ((id && category.ID === id)
        || (code && category.CODE === code)
        || (name && category.NAME === name)
        || (description && category.DESCRIPTION === description)) {
        deleted_category = category;
        return false;
      }
    });

    if (deleted_category) {
      this.operations.push({ operation: Op.DELETE, category: deleted_category });
      return deleted_category;
    } else {
      throw new Error('L\'category n\'est pas défini.');
    }
  }

  /**
   * Load les categorys du serveur si **categorys** est `undefined`.
   */
  public load(): void {
    // Fait un appel au serveur pour obtenir les categorys.
  }

  /**
   * Sauvegarde l'état du repository.
   */
  public save(): void {
    // Fait un appel au serveur pour envoyer ses modifications.
  }
}