import * as JQuery from 'jquery';
import { AdminView } from '../view/AdminView';
import { ModalView } from '../view/ModalView';

export class AdminController {
  private addModal: ModalView;
  private editModal: ModalView;

  constructor(
    public element: HTMLElement,
    public view: AdminView) {
    this.addModal = new ModalView($('#admin-add-modal')[0]);
    this.editModal = new ModalView($('#admin-edit-modal')[0]);
    this.bindEvents();
  }

  private bindEvents() {
    $(this.element).find('.add-btn').click(event => { this.handleAddClick(event) });
    $('#admin-add-modal add-btn').click(event => {
      this.handleModalAdd(event);
    })
    this.bindTableEvents();
  }

  private handleModalAdd(event: JQuery.Event) {

  }

  private bindTableEvents() {
    $(this.element).find('tbody tr').click(event => { this.handleEditClick(event) });
    $(this.element).find('tbody .delete-btn').click(event => { this.handleDeleteClick(event) });
  }

  private handleAddClick(event: JQuery.Event) {
    const target = event.target as HTMLElement;
    const data = target.dataset as { type: string, id: string };
    const modal = this.addModal;
    modal.title = `Ajouter ${data.type.toLowerCase()}`;
    modal.fields = this.view.options.datasources
      .filter(datasource => datasource.title === data.type)
      .reduce((acc, datasource) => {
        let entity = datasource.repository.read({ ID: parseInt(data.id, 10) })[0];
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
    console.log('DELETE :: ' + data.type + data.id);
    this.view.delete(data.type, data.id);
  }

  private handleEditClick(event: JQuery.Event) {
    const target = event.target as HTMLElement;
    const data = target.dataset;

    if (target.nodeName !== 'BUTTON') {
      alert('Pop an edit modal');

    } else {
      console.log('That\'s a delete action !');
    }
  }
}