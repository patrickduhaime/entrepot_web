import * as JQuery from 'jquery';
import * as Bootstrap from "bootstrap";
import { translate } from '../StringTranslator';

export class Modal {
  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    $(this.element).find('.modal-title')[0].innerHTML = `<h4>${value}</h4>`
    this._title = value;
  }

  public set error_msg(msg: string){
    $(this.element).find('.alert > span').text(msg);
  }

  public show_alert(){
    $(this.element).find('.alert').show();
  }

  public hide_alert(){
    $(this.element).find('.alert').hide();
  }

  private _fields: { label: string, value: any }[];
  public get fields(): { label: string, value: any }[] {
    return this._fields;
  }
  public set fields(value: { label: string, value: any }[]) {
    $(this.element).find('.modal-body > .form-group').remove();
    value.forEach(field => {
      $(this.element).find('.modal-body').append(`<div class="form-group">
        <label>${translate(field.label)}</label>
        <input class="form-control" type="text" value="${field.value}" data-field="${field.label}">
      </div>
      `);
    });
    $(this.element).find('.modal-body input').get().forEach((element) => {
      $(element).bind('change', event => {
        this.updateField(event.target.dataset.field, (event.target as HTMLInputElement).value)
      });
    })
    this._fields = value;
  }

  public data: { [key: string]: string };

  constructor(private element) {

  }

  private updateField(label, value) {
    this._fields.forEach(field => {
      if (field.label === label) {
        field.value = value;
      }
    })
    return this;
  }

  public show(data?: { [key: string]: string }) {
    this.data = data;
    $(this.element).modal('show');
    return this;
  }

  public hide() {
    $(this.element).modal('hide');
    return this;
  }
}