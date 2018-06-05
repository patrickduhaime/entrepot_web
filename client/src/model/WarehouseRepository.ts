import * as _ from 'lodash';
import { IRepository } from './Repository';

enum Op {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

interface IWarehouseOperation {
  operation: Op;
  warehouse: IWarehouse;
}

export interface IWarehouse {
  ID: number;
  IDENTIFIER: string,
  ADDRESS: string
}

export class WarehouseRepository implements IRepository {
  private warehouses: IWarehouse[];
  private operations: IWarehouseOperation[]

  constructor(warehouses?: IWarehouse[]) {
    this.warehouses = warehouses ? warehouses : new Array<IWarehouse>();
    this.operations = new Array<IWarehouseOperation>();
  }

  /**
   * Créé une warehouse dans le repository.
   * @param identifier L'identifier de la warehouse.
   * @param address L'addresse de la warehouse.
   */
  public create(identifier: string, address: string): IWarehouse {
    const top_index = _.max(_.map(this.warehouses, warehouse => warehouse.ID));
    const warehouse = {
      ID: top_index + 1,
      IDENTIFIER: identifier,
      ADDRESS: address
    }

    this.operations.push({ operation: Op.CREATE, warehouse: warehouse });
    this.warehouses = _.union(this.warehouses, [warehouse]);

    return warehouse;
  }

  /**
   * Renvoi tous les warehouses qui correspond aux filtres.
   * Renvoi tout si aucun filtre n'est donnés.
   * @param id L'identifiant local d'une warehouse.
   * @param identifier L'identifier de la warehouse.
   * @param address L'addresse de la warehouse.
   */
  public read(id?: number, identifier?: string, address?: string): IWarehouse[] {
    if (!id && !identifier && !address) {
      return new Array(...this.warehouses);
    }

    return _.filter(this.warehouses, warehouse => {
      return (id && warehouse.ID === id)
        || (identifier && warehouse.IDENTIFIER === identifier)
        || (address && warehouse.ADDRESS === address);
    });
  }

  /**
   * Met à jour la warehouse correspondant aux filtres.
   * @param id L'identifiant local d'une warehouse.
   * @param identifier L'identifier de la warehouse.
   * @param address L'addresse de la warehouse.
   */
  public update(id?: number, identifier?: string, address?: string): IWarehouse {
    let updated_warehouse: IWarehouse;

    this.warehouses = _.map(this.warehouses, warehouse => {
      if (warehouse.ID === id) {
        updated_warehouse = {
          ID: id,
          IDENTIFIER: identifier ? identifier : warehouse.IDENTIFIER,
          ADDRESS: address ? address : warehouse.ADDRESS
        };
        return updated_warehouse;
      }
      return warehouse;
    });

    if (updated_warehouse) {
      this.operations.push({ operation: Op.UPDATE, warehouse: updated_warehouse });
      return updated_warehouse;
    } else {
      throw new Error('L\'warehouse n\'est pas défini.');
    }
  }

  /**
   * Détruit une warehouse correspondant aux filtres.
   * @param id L'identifiant local d'une warehouse.
   * @param identifier L'identifier de la warehouse.
   * @param address L'addresse de la warehouse.
   */
  public delete(id?: number, identifier?: string, address?: string): IWarehouse {
    let deleted_warehouse: IWarehouse;
    this.warehouses = _.filter(this.warehouses, warehouse => {
      if ((id && warehouse.ID === id)
        || (identifier && warehouse.IDENTIFIER === identifier)
        || (address && warehouse.ADDRESS === address)) {
        deleted_warehouse = warehouse;
        return false;
      }
    });

    if (deleted_warehouse) {
      this.operations.push({ operation: Op.DELETE, warehouse: deleted_warehouse });
      return deleted_warehouse;
    } else {
      throw new Error('L\'warehouse n\'est pas défini.');
    }
  }

  /**
   * Load les warehouses du serveur si **warehouses** est `undefined`.
   */
  public load(): void {
    // Fait un appel au serveur pour obtenir les warehouses.
  }

  /**
   * Sauvegarde l'état du repository.
   */
  public save(): void {
    // Fait un appel au serveur pour envoyer ses modifications.
  }
}