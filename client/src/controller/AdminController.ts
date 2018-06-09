import * as JQuery from 'jquery';
import { AdminView } from '../view/AdminView';
import { Modal } from '../components/Modal';
import { IRepository, IEntity } from '../model/Repository';

export class AdminController {
  private addModal: Modal;
  private editModal: Modal;

  private currentRepository: IRepository;

  constructor(
    public element: HTMLElement,
    public view: AdminView) {
    this.addModal = new Modal($('#admin-add-modal')[0]);
    this.editModal = new Modal($('#admin-edit-modal')[0]);
    this.bindEvents();
  }

  private bindEvents() {
    $(this.element).find('.add-btn').click(event => { this.handleAddClick(event) });
    $('#admin-add-modal .add-btn').click(event => { this.handleModalAdd(event) });
    $('#admin-edit-modal .edit-btn').click(event => { this.handleModalEdit(event) });
    this.bindTableEvents();
  }

  private bindTableEvents(element?: HTMLElement) {
    let target = element ? $(element) : $(this.element).find('tbody tr');
    $(target).click(event => { this.handleEditClick(event) });
    $(target).find('.delete-btn').click(event => { this.handleDeleteClick(event) });
  }

  private handleModalAdd(event: JQuery.Event) {
    const modal = this.addModal;
    var newEntity;
    try {
      newEntity = this.currentRepository.create(modal.fields.reduce((acc, field) => {
        acc[field.label] = field.value;
        return acc;
      }, { ID: null }));
    } catch(e) {
      $(modal).find('.alert.alert_msg').html(e);
      return;
    }

    this.bindTableEvents(this.view.add(modal.data.type, newEntity));
    modal.hide();
  }

  private handleModalEdit(event: JQuery.Event) {
    const modal = this.editModal;
    const newEntity = this.currentRepository.update(modal.fields.reduce((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, { ID: parseInt((modal.data as { type: string, id: string }).id) }));
    this.bindTableEvents(this.view.update(modal.data.type, newEntity));
    modal.hide();
  }

  private handleAddClick(event: JQuery.Event) {
    const target = event.target as HTMLElement;
    const data = target.dataset as { type: string, id: string };
    const modal = this.addModal;

    modal.title = `Ajouter ${data.type.toLowerCase()}`;
    modal.fields = this.view.options.datasources
      .filter(datasource => datasource.title === data.type)
      .reduce((acc, datasource) => {
        this.currentRepository = datasource.repository
        const entity = this.currentRepository.read({ ID: parseInt(data.id, 10) })[0];
        return [...Object.getOwnPropertyNames(entity).filter(property => property !== 'ID').map(property => {
          return { label: property, value: '' };
        })];
      }, []);
    modal.show(data);
  }

  private handleDeleteClick(event: JQuery.Event) {
    const target = event.target as HTMLElement;
    const data = target.dataset as { type: string, id: string };
    this.view.options.datasources.forEach(source => {
      if (source.title === data.type) {
        source.repository.delete({ ID: parseInt(data.id, 10) });
      }
    });
    this.view.delete(data.type, data.id);
  }

  private handleEditClick(event: JQuery.Event) {
    let target = event.target as HTMLElement;

    if (target.nodeName !== 'BUTTON') {
      let data = target.dataset as { type: string, id: string };
      let i = 0
      while (i <= 10 && (!data.id || !data.type)) {
        target = target.parentElement;
        data = target.dataset as { type: string, id: string };
        i++;
      }
      if (i === 10) throw new Error('DATASET NOT FIND');
      const modal = this.editModal;
      modal.title = `Modifier ${data.type.toLowerCase()}`;
      modal.fields = this.view.options.datasources
        .filter(datasource => datasource.title === data.type)
        .reduce((acc, datasource) => {
          this.currentRepository = datasource.repository
          const entity = this.currentRepository.read({ ID: parseInt(data.id, 10) })[0];
          return [...Object.getOwnPropertyNames(entity).filter(property => property !== 'ID').map(property => {
            return { label: property, value: entity[property] };
          })];
        }, []);
      modal.show(data);
    }
  }
}