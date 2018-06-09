import { IArticle } from "../model/ArticleRepository";

export class ArticleList {
  constructor(public element: HTMLElement, public articles: IArticle[]) {
    this.buildList();
  }

  public bindDelete(handler: (event, id) => void) {
    $(this.element).bind('click', (event) => {
      if (event.target.localName === 'button' || event.target.localName === 'i') {
        handler(event, parseInt(event.target.dataset['articleId']));
      }
    })
  }

  private buildList() {
    $(this.element)
      .append(`<ul class="list-group"></ul>`)
      .append(...this.articles.map(article => this.buildListItem(article)));
  }

  private buildListItem(article: IArticle) {
    return $(`<li class="list-group-item" data-article-id="${article.ID}">${article.NAME}
    <button data-article-id="${article.ID}" type="button" class="btn btn-outline-danger float-right">
      <i class="fas fa-trash-alt"></i>
    </button>
  </li>`)[0];
  }

  public add(article: IArticle) {
    if (!$(this.element).find(`li[data-article-id=${article.ID}]`)[0]) {
      $(this.element).find('ul').append(this.buildListItem(article));
      this.articles.push(article);
    }
  }

  public remove(id: number) {
    let article: IArticle = null;
    if ($(this.element).find(`li[data-article-id=${id}]`)[0]) {
      $(this.element).find(`[data-article-id=${id}]`).remove();
      article = this.articles.find(article => article.ID === id);
      this.articles = this.articles.filter(article => article.ID !== id);
    }
    return article;
  }
}