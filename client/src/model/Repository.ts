export interface IRepository {
  create(entity: IEntity): IEntity;
  read(entity?: IEntity): IEntity[];
  update(entity: IEntity): IEntity;
  delete(entity: IEntity): IEntity;
}

export interface IEntity {
  ID: number;
}