import * as JQuery from 'jquery';
import { AdminView } from '../view/AdminView';
import { ModalView } from '../view/ModalView';
import { IRepository, IEntity } from '../model/Repository';

export class AdminController {
  private addModal: ModalView;
  private editModal: ModalView;

  private currentRepository: IRepository;

  constructor(
    public element: HTMLElement,
    public view: AdminView) {
    this.addModal = new ModalView($('#admin-add-modal')[0]);
    this.editModal = new ModalView($('#admin-edit-modal')[0]);
    this.bindEvents();
  }

  private bindEvents() {
    $(this.element).find('.add-btn').click(event => { this.handleAddClick(event) });
    $('#admin-add-modal .add-btn').click(event => { this.handleModalAdd(event) })
    this.bindTableEvents();
  }

  private bindTableEvents(element?: HTMLElement) {
    let target = element ? $(element) : $(this.element).find('tbody tr');
    $(target).click(event => { this.handleEditClick(event) });
    $(target).find('.delete-btn').click(event => { this.handleDeleteClick(event) });
  }

  private handleModalAdd(event: JQuery.Event) {
    const newEntity = this.currentRepository.create(this.addModal.fields.reduce((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, { ID: null }));
    this.bindTableEvents(this.view.add(this.addModal.type, newEntity));
    this.addModal.hide();
  }

  private handleAddClick(event: JQuery.Event) {
    const target = event.target as HTMLElement;
    const data = target.dataset as { type: string, id: string };
    const modal = this.addModal;
    this.addModal.type = data.type;

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
    this.addModal.show(data);
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
    const target = event.target as HTMLElement;
    const data = target.dataset;

    if (target.nodeName !== 'BUTTON') {
      alert('Pop an edit modal');

    } else {
      throw new Error('That\'s a delete action !');
    }
  }
}