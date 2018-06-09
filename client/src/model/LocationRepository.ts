import * as _ from 'lodash';
import { IRepository, IEntity } from './Repository';
import { GraphService } from '../service/GraphService';

enum Op {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

interface ILocationOperation {
  operation: Op;
  location: ILocation;
}

export interface ILocation extends IEntity {
  SERIAL_NUMBER: string;
  NODE_ID: string;
}

export class LocationRepository implements IRepository {
  private locations: ILocation[];
  private operations: ILocationOperation[]

  constructor(locations?: ILocation[]) {
    this.locations = locations ? locations : new Array<ILocation>();
    this.operations = new Array<ILocationOperation>();
  }

  private validate(location: ILocation) {
    if (!GraphService.getInstance().nodeExist(location.NODE_ID)) {
      throw new Error(`La node ${location.NODE_ID} n'existe pas.`);
    }
    if (!/^R[0-9]+C[0-9]+$/.test(location.SERIAL_NUMBER)) {
      throw new Error(`Le numéro de série ${location.SERIAL_NUMBER} ne correspond pas au format R66C66.`);
    }
  }

  /**
   * Créé une location dans le repository.
   * @param serial_number Le numéro de série de la location.
   * @param node_id L'identifiant de la node du graphe.
   */
  public create(entity: ILocation): ILocation {
    if (this.locations.find(x => x.NODE_ID === entity.NODE_ID)) {
      throw new Error(`La node ${entity.NODE_ID} est déjà associé à une autre location.`);
    }
    if (this.locations.find(x => x.SERIAL_NUMBER === entity.SERIAL_NUMBER)) {
      throw new Error(`Le numéro de série ${entity.SERIAL_NUMBER} est déjà associé à une autre location.`);
    }

    this.validate(entity);
    const serial_number = entity.SERIAL_NUMBER;
    const node_id = entity.NODE_ID;

    const top_index = _.max(_.map(this.locations, location => location.ID));
    const location = {
      ID: top_index + 1,
      SERIAL_NUMBER: serial_number,
      NODE_ID: node_id
    }

    this.operations.push({ operation: Op.CREATE, location: location });
    this.locations = _.union(this.locations, [location]);

    return location;
  }

  /**
   * Renvoi tous les locations qui correspond aux filtres.
   * Renvoi tout si aucun filtre n'est donnés.
   * @param id L'identifiant local d'une location.
   * @param serial_number Le numéro de série de la location.
   * @param node_id L'identifiant de la node du graphe.
   */
  public read(entity?: ILocation): ILocation[] {
    const id = entity ? entity.ID : null;
    const serial_number = entity ? entity.SERIAL_NUMBER : null;
    const node_id = entity ? entity.NODE_ID : null;

    if (!id && !serial_number && !node_id) {
      return new Array(...this.locations);
    }

    return _.filter(this.locations, location => {
      return (id && location.ID === id)
        || (serial_number && location.SERIAL_NUMBER === serial_number)
        || (node_id && location.NODE_ID === node_id);
    });
  }

  /**
   * Met à jour la location correspondant aux filtres.
   * @param id L'identifiant local d'une location.
   * @param serial_number Le numéro de série de la location.
   * @param node_id L'identifiant de la node du graphe.
   */
  public update(entity: ILocation): ILocation {
    if (this.locations.find(x => x.ID !== entity.ID && x.NODE_ID === entity.NODE_ID)) {
      throw new Error(`La node ${entity.NODE_ID} est déjà associé à une autre location.`);
    }
    if (this.locations.find(x => x.ID !== entity.ID && x.SERIAL_NUMBER === entity.SERIAL_NUMBER)) {
      throw new Error(`Le numéro de série ${entity.SERIAL_NUMBER} est déjà associé à une autre location.`);
    }
    this.validate(entity);
    const id = entity.ID;
    const serial_number = entity.SERIAL_NUMBER;
    const node_id = entity.NODE_ID;

    let updated_location: ILocation;

    this.locations = _.map(this.locations, location => {
      if (location.ID === id) {
        updated_location = {
          ID: id,
          SERIAL_NUMBER: serial_number ? serial_number : location.SERIAL_NUMBER,
          NODE_ID: node_id ? node_id : location.NODE_ID
        };
        return updated_location;
      }
      return location;
    });

    if (updated_location) {
      this.operations.push({ operation: Op.UPDATE, location: updated_location });
      return updated_location;
    } else {
      throw new Error('L\'location n\'est pas défini.');
    }
  }

  /**
   * Détruit une location correspondant aux filtres.
   * @param id L'identifiant local d'une location.
   * @param serial_number Le numéro de série de la location.
   * @param node_id L'identifiant de la node du graphe.
   */
  public delete(entity: ILocation): ILocation {
    const id = entity.ID;
    const serial_number = entity.SERIAL_NUMBER;
    const node_id = entity.NODE_ID;

    let deleted_location: ILocation;
    this.locations = _.filter(this.locations, location => {
      if ((id && location.ID === id)
        || (serial_number && location.SERIAL_NUMBER === serial_number)
        || (node_id && location.NODE_ID === node_id)) {
        deleted_location = location;
        return false;
      }
      return true;
    });

    if (deleted_location) {
      this.operations.push({ operation: Op.DELETE, location: deleted_location });
      return deleted_location;
    } else {
      throw new Error('L\'location n\'est pas défini.');
    }
  }

  /**
   * Load les locations du serveur si **locations** est `undefined`.
   */
  public load(): void {
    // Fait un appel au serveur pour obtenir les locations.
  }

  /**
   * Sauvegarde l'état du repository.
   */
  public save(): void {
    // Fait un appel au serveur pour envoyer ses modifications.
  }
}