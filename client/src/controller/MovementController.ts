import * as $ from 'jquery';
import { MovementView } from '../view/MovementView';

export class MovementController {
  constructor(public element: HTMLElement, public view: MovementView) {
    this.bindEvents();
  }

  private bindEvents() {
    this.view.selector.bindAdd((event, id) => {
      this.view.list.add(this.view.selector.remove(id));
    });
    this.view.list.bindDelete((event, id) => {
      this.view.selector.add(this.view.list.remove(id));
    })
  }
}