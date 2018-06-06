import * as $ from 'jquery';

export class MenuController {
  constructor(public element: HTMLElement) {
    this.bindEvents();
  }

  private bindEvents() {
    $(this.element).find('#administration').click(this.handleAdministrationClick);
    $(this.element).find('#movement-stock').click(this.handleMovementStockClick);
  }

  private handleAdministrationClick() {
    $('#admin-page').show();
    $('#movement-page').hide();
  }

  private handleMovementStockClick() {
    $('#admin-page').hide();
    $('#movement-page').show();
  }
}