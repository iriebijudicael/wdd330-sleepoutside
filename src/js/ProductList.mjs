import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      this.productCardTemplate, 
      this.listElement, 
      list
    );
  }

  productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}">
          <h3>${product.Name}</h3>
          <p>$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }
}