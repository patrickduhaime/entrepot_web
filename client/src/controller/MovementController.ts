import * as $ from 'jquery';
import { MovementView } from '../view/MovementView';
import { GraphService } from '../service/GraphService';

export class MovementController {
  constructor(public element: HTMLElement, public view: MovementView) {
    this.bindEvents();
  }

  private bindEvents() {
    this.view.selector.bindAdd((event, id) => {
      let article = this.view.selector.remove(id);
      if (article) {
        this.view.selectedArticleList.add(article);
      }
    });
    this.view.selectedArticleList.bindDelete((event, id) => {
      let article = this.view.selectedArticleList.remove(id);
      if (article) {
        this.view.selector.add(article);
      }
    });
    $(this.element).find('.out-btn').bind('click', (event) => {
      this.view.outArticleList.articles.forEach(article => {
        this.view.outArticleList.remove(article.ID);
      })
      GraphService.getInstance().sortArticle(this.view.selectedArticleList.articles).forEach(article => {
        this.view.outArticleList.add(article);
      });
    })
  }
}