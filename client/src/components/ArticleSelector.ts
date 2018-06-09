import * as JQuery from 'jquery';
import { IArticle, ArticleRepository } from '../model/ArticleRepository';

export interface ISelectorOption {
  labelField: string;
  repository: ArticleRepository;
}

export class ArticleSelector {
  constructor(public element: HTMLElement, public articles: IArticle[]) {
    this.buildSelector()
  }

  public bindAdd(handler: (event, id) => void) {
    $(this.element).find('.add-btn').bind('click', () => {
      handler(event, parseInt($(this.element).find('option:selected').val() as string));
    });
  }

  public add(article: IArticle) {
    if (!$(this.element).find(`option[value=${article.ID}]`).get(0)) {
      $(`<option value="${article.ID}">${article.NAME}</option>`).appendTo($(this.element).find('select'));
      this.articles.push(article);
    }
  }

  public remove(id: number) {
    let article: IArticle = null;
    if ($(this.element).find(`option[value=${id}]`).get(0)) {
      $(this.element).find(`option[value=${id}]`).remove();
      article = this.articles.find(el => el.ID === id);
      this.articles = this.articles.filter(el => el.ID !== id);
    }
    return article;
  }

  private buildSelector() {
    $(`<div class="input-group">
      <div class="input-group-prepend">
        <button class="btn btn-outline-primary add-btn" type="button">Ajouter</button>
      </div>
      <select class="custom-select form-control">
        <option id="default-option" selected>Sélectionner</option>
        ${this.buildOptions()}
      </select>
    </div>`).appendTo(this.element);
  }

  private buildOptions() {
    return this.articles
      .map(article => `<option value="${article.ID}">${article.NAME}</option>`)
      .reduce((acc, option) => acc + option, '');
  }
}