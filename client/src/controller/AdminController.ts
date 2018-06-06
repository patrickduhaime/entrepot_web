import * as $ from 'jquery';

export class AdminController {
  constructor(public element: HTMLElement) {
    this.bindEvents();
  }

  private bindEvents() {
    $(this.element).find('.nav-article .search-btn').click(this.handleArticleSearchButtonClick);
    $(this.element).find('.nav-article .add-btn').click(this.handleArticleAddButtonClick);
    $(this.element).find('.nav-warehouse .search-btn').click(this.handleWarehouseSearchButtonClick);
    $(this.element).find('.nav-warehouse .add-btn').click(this.handleWarehouseAddButtonClick);
    $(this.element).find('.nav-location .search-btn').click(this.handleLocationSearchButtonClick);
    $(this.element).find('.nav-location .add-btn').click(this.handleLocationAddButtonClick);
    $(this.element).find('.nav-category .search-btn').click(this.handleCategorySearchButtonClick);
    $(this.element).find('.nav-category .add-btn').click(this.handleCategoryAddButtonClick);
  }

  private handleArticleSearchButtonClick(event) {

  }

  private handleArticleAddButtonClick(event) {

  }

  private handleWarehouseSearchButtonClick(event) {

  }

  private handleWarehouseAddButtonClick(event) {

  }

  private handleLocationSearchButtonClick(event) {

  }

  private handleLocationAddButtonClick(event) {

  }

  private handleCategorySearchButtonClick(event) {

  }

  private handleCategoryAddButtonClick(event) {

  }
}