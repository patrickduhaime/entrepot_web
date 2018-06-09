import * as _ from 'lodash';
import {IEntity, IRepository} from './Repository';

enum Op {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

interface IUserOperation {
    operation: Op;
    user: IUser;
}

export interface IUser extends IEntity {
    USERNAME: string,
    PASSWORD: string
}

export class UserRepository implements IRepository {
    private users: IUser[];
    private operations: IUserOperation[];

    constructor(users?: IUser[]) {
        this.users = users ? users : [];
        this.operations = [];
    }

    /**
     * Créé une user dans le repository.
     * @param entity
     */
    public create(entity: IUser): IUser {
        const password = entity.PASSWORD;
        const username = entity.USERNAME;

        const top_index = _.max(_.map(this.users, user => user.ID));
        const user = {
            ID: top_index + 1,
            PASSWORD: password,
            USERNAME: username
        };

        this.operations.push({operation: Op.CREATE, user: user});
        this.users = _.union(this.users, [user]);

        return user;
    }

    /**
     * Renvoi tous les users qui correspond aux filtres.
     * Renvoi tout si aucun filtre n'est donnés.
     * @param entity
     */
    public read(entity?: IUser): IUser[] {
        const id = entity ? entity.ID : null;
        const userName = entity ? entity.USERNAME : null;
        const passWord = entity ? entity.PASSWORD : null;

        if (!entity || (!id && !userName && !passWord)) {
            return new Array(...this.users);
        }

        return (_.filter(this.users, user => {
            return (id && user.ID === id)
                || (userName && user.USERNAME === userName)
                || (passWord && user.PASSWORD === passWord);
        }));
    }

    /**
     * Met à jour la user correspondant aux filtres.
     * @param entity
     */
    public update(entity: IUser): IUser {
        const id = entity.ID;
        const userName = entity.USERNAME;
        const passWord = entity.PASSWORD;

        let updated_user: IUser;

        this.users = _.map(this.users, user => {
            if (user.ID === id) {
                updated_user = {
                    ID: id,
                    USERNAME: userName ? userName : user.USERNAME,
                    PASSWORD: passWord ? passWord : user.PASSWORD
                };
                return updated_user;
            }
            return user;
        });

        if (updated_user) {
            this.operations.push({operation: Op.UPDATE, user: updated_user});
            return updated_user;
        } else {
            throw new Error('L\'user n\'est pas défini.');
        }
    }

    /**
     * Détruit une user correspondant aux filtres.
     * @param entity
     */
    public delete(entity: IUser): IUser {
        const id = entity.ID;
        const userName = entity.USERNAME;
        const passWord = entity.PASSWORD;

        let deleted_user: IUser;
        this.users = _.filter(this.users, user => {
            if ((id && user.ID === id)
                || (userName && user.USERNAME === userName)
                || (passWord && user.PASSWORD === passWord)) {
                deleted_user = user;
                return false;
            }
            return true;
        });

        if (deleted_user) {
            this.operations.push({operation: Op.DELETE, user: deleted_user});
            return deleted_user;
        } else {
            throw new Error('L\'user n\'est pas défini.');
        }
    }

    /**
     * Permet de vérifier si l'usager existe dans la base de donnée
     * @param {String} userName
     * @param {String} passWord
     */
    public checkExists(userName: String, passWord: String): void{
        let exists= false;
        this.users.forEach(function (user) {
            if (user.USERNAME == userName && user.PASSWORD == passWord) exists = true;
        });
        if(!exists) throw ("Tentative de connection échoué!");
    }

    /**
     * Load les users du serveur si **users** est `undefined`.
     */
    public load(): void {
        // Fait un appel au serveur pour obtenir les users.
    }

    /**
     * Sauvegarde l'état du repository.
     */
    public save(): void {
        // Fait un appel au serveur pour envoyer ses modifications.
    }
}