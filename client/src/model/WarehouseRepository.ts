import * as _ from 'lodash';
import {IEntity, IRepository} from './Repository';

enum Op {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

interface IWarehouseOperation {
    operation: Op;
    warehouse: IWarehouse;
}

export interface IWarehouse extends IEntity {
    IDENTIFIER: string,
    STREETNUMBER: string,
    STREET: string,
    CITY: string,
    POSTALCODE: string
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
    public create(entity: IWarehouse): IWarehouse {
        this.validate(entity);

        const identifier = entity.IDENTIFIER;
        const streetNumber = entity.STREETNUMBER;
        const street = entity.STREET;
        const city = entity.CITY;
        const postalCode = entity.POSTALCODE;

        const top_index = _.max(_.map(this.warehouses, warehouse => warehouse.ID));
        const warehouse = {
            ID: top_index + 1,
            IDENTIFIER: identifier,
            STREETNUMBER: streetNumber,
            STREET: street,
            CITY: city,
            POSTALCODE: postalCode
        }

        this.operations.push({operation: Op.CREATE, warehouse: warehouse});
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
    public read(entity?: IWarehouse): IWarehouse[] {
        const id = entity ? entity.ID : null;
        const identifier = entity ? entity.IDENTIFIER : null;
        const streetNumber = entity ? entity.STREETNUMBER : null;
        const street = entity ? entity.STREET : null;
        const city = entity ? entity.CITY : null;
        const postalCode = entity ? entity.POSTALCODE : null;

        if (!entity || (!id && !identifier && !streetNumber && !street && !city && !postalCode)) {
            return new Array(...this.warehouses);
        }

        return (_.filter(this.warehouses, warehouse => {
            return (id && warehouse.ID === id)
                || (identifier && warehouse.IDENTIFIER === identifier)
                || (streetNumber && warehouse.STREETNUMBER === streetNumber)
                || (street && warehouse.STREET === street)
                || (city && warehouse.CITY === city)
                || (postalCode && warehouse.POSTALCODE === postalCode);
        }));
    }

    /**
     * Met à jour la warehouse correspondant aux filtres.
     * @param id L'identifiant local d'une warehouse.
     * @param identifier L'identifier de la warehouse.
     * @param address L'addresse de la warehouse.
     */
    public update(entity: IWarehouse): IWarehouse {
        this.validate(entity);

        const id = entity.ID;
        const identifier = entity.IDENTIFIER;
        const streetNumber = entity.STREETNUMBER;
        const street = entity.STREET;
        const city = entity.CITY;
        const postalCode = entity.POSTALCODE;

        let updated_warehouse: IWarehouse;

        this.warehouses = _.map(this.warehouses, warehouse => {
            if (warehouse.ID === id) {
                updated_warehouse = {
                    ID: id,
                    IDENTIFIER: identifier ? identifier : warehouse.IDENTIFIER,
                    STREETNUMBER: streetNumber ? streetNumber : warehouse.STREETNUMBER,
                    STREET: street ? street : warehouse.STREET,
                    CITY: city ? city : warehouse.CITY,
                    POSTALCODE: postalCode ? postalCode : warehouse.POSTALCODE
                };
                return updated_warehouse;
            }
            return warehouse;
        });

        if (updated_warehouse) {
            this.operations.push({operation: Op.UPDATE, warehouse: updated_warehouse});
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
    public delete(entity: IWarehouse): IWarehouse {
        const id = entity.ID;
        const identifier = entity.IDENTIFIER;
        const streetNumber = entity.STREETNUMBER;
        const street = entity.STREET;
        const city = entity.CITY;
        const postalCode = entity.POSTALCODE;

        let deleted_warehouse: IWarehouse;
        this.warehouses = _.filter(this.warehouses, warehouse => {
            if ((id && warehouse.ID === id)
                || (identifier && warehouse.IDENTIFIER === identifier)
                || (streetNumber && warehouse.STREETNUMBER === streetNumber)
                || (street && warehouse.STREET === street)
                || (city && warehouse.CITY === city)
                || (postalCode && warehouse.POSTALCODE === postalCode)) {
                deleted_warehouse = warehouse;
                return false;
            }
            return true;
        });

        if (deleted_warehouse) {
            this.operations.push({operation: Op.DELETE, warehouse: deleted_warehouse});
            return deleted_warehouse;
        } else {
            throw new Error('L\'warehouse n\'est pas défini.');
        }
    }

    /**
     * Permet de valider les valeurs de l'entrepot si non thrower une erreur
     * @param {IWarehouse} entity
     */
    private validate(entity: IWarehouse): void {
        let strError = '';
        if (entity.IDENTIFIER == '') strError = "l'identifiant ne peut pas etre vide! <br>";
        else if (!/^E[0-9]+$/.test(entity.IDENTIFIER))
            strError += "l'identifiant de l'entrepot doit etre du format EXXXX (les XXXX sont numérique)! <br>";
        if (entity.STREETNUMBER == '') strError += "Le numéro de rue ne peut pas etre vide! <br>";
        else if(!/^[0-9]+$/.test(entity.STREETNUMBER)) strError += "Le numéro de rue doit etre numérique! <br>";
        if (entity.STREET == '') strError += "La rue ne peut pas etre vide! <br>";
        if (entity.CITY == '') strError += "La ville ne peut pas etre vide! <br>";
        if (entity.POSTALCODE == '') strError += "Le code postal ne peut pas etre vide! <br>";
        if (strError != '') throw strError;
        else {
            this.warehouses.forEach(function (warhouse) {
                if (warhouse.IDENTIFIER == entity.IDENTIFIER) throw "L'entrepot existe déja! <br>";
            })
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