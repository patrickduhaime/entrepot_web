import * as $ from 'jquery';
import { ArticleSelector } from '../components/ArticleSelector';
import { IRepository } from '../model/Repository';
import { MovementController } from '../controller/MovementController';
import { ArticleRepository, IArticle } from '../model/ArticleRepository';
import { ArticleList } from '../components/ArticleList';

export interface IMovementViewOption {
  datasources: {
    [title: string]: IRepository;
  };
}

export class MovementView {
  public selector: ArticleSelector;
  public selectedArticleList: ArticleList;
  public outArticleList: ArticleList;
  public movementController: MovementController;

  constructor(public element: HTMLElement, public option: IMovementViewOption) {
    this.buildPage();
    this.movementController = new MovementController(element, this);
  }

  private buildTitle() {
    return $(`<div class="row mb-4">
      <div class="col col-lg-6 offset-lg-3">
        <h4>Mouvement de stock</h4>
      </div>
    </div>`);
  }

  private buildArticleSelector() {
    let el = $(`<div class="row mb-4">
    <div class="col col-lg-6 offset-lg-3">
    </div>
  </div>`);
    this.selector = new ArticleSelector(el.children()[0], this.option.datasources['ARTICLE'].read() as IArticle[]);
    return el;
  }

  private buildOutArticleList() {
    let el = $(`<div id="nonOptiList" class="row  mb-4">
    <div class="col-lg-6 offset-lg-3">
    </div>
  </div>`)[0];
    this.outArticleList = new ArticleList($(el).children()[0], []);
    return el;
  }

  private buildSelectedArticleList() {
    let el = $(`<div id="nonOptiList" class="row  mb-4">
    <div class="col-lg-6 offset-lg-3">
    </div>
  </div>`)[0];
    this.selectedArticleList = new ArticleList($(el).children()[0], []);
    return el;
  }

  private buildActionSection() {
    return $(`<div class="row">
    <div class="col col-lg-6 offset-lg-3">
      <button type="button" class="btn btn-success btn-block mb-2">
        <i class="fas fa-sign-out-alt"></i>&nbsp;Sortir les articles
      </button>
    </div>
  </div>`);
  }

  private buildPage() {
    const div = $(`<div></div>`);
    div
      .append(this.buildTitle())
      .append(this.buildArticleSelector())
      .append(this.buildSelectedArticleList())
      .append(this.buildSelectedArticleList())
      .append(this.buildActionSection());
    $(this.element).append(div.children());
  }
}