import * as JQuery from 'jquery';
import * as Bootstrap from "bootstrap";
import { translate } from '../StringTranslator';

export class ModalView {
  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    $(this.element).find('.modal-title')[0].innerHTML = `<h4>${value}</h4>`
    this._title = value;
  }

  private _fields: { label: string, value: any }[];
  public get fields(): { label: string, value: any }[] {
    return this._fields;
  }
  public set fields(value: { label: string, value: any }[]) {
    $(this.element).find('.modal-body').children().remove();
    value.forEach(field => {
      console.log(field);
      $(this.element).find('.modal-body').append(`<div class="form-group">
        <label>${translate(field.label)}</label>
        <input class="form-control" type="text" placeholder="${field.value}" data-field="${field.label}">
      </div>
      `);
    });
    this._fields = value;
  }

  private data: { [key: string]: string };

  constructor(private element) {

  }

  public show(data?: { [key: string]: string }) {
    this.data = data;
    $(this.element).modal('show');
  }

  public hide() {
    $(this.element).modal('hide');
  }
}