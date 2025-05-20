
// ProductDetails.mjs
import { getParam, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      
      if (!this.product) {
        throw new Error('Product not found');
      }
      
      this.renderProductDetails();
      this.setupAddToCart();
    } catch (error) {
      console.error('Error initializing product:', error);
      this.showError();
    }
  }

  renderProductDetails() {
    const { Name, FinalPrice, Image, Description } = this.product;
    
    // Update page title
    document.title = `${Name} | Sleep Outside`;
    
    // Update product details
    document.querySelector('.product-detail__name').textContent = Name;
    document.querySelector('.product-detail__price').textContent = `$${FinalPrice}`;
    
    const imgElement = document.querySelector('.product-detail__image');
    imgElement.src = Image;
    imgElement.alt = Name;
    
    document.querySelector('.product-detail__description').textContent = Description;
  }

  setupAddToCart() {
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    let cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
    
    // Optional: Show confirmation message
    alert(`${this.product.Name} added to cart!`);
  }

  showError() {
    const container = document.querySelector('.product-detail');
    container.innerHTML = `
      <h2>Product Not Found</h2>
      <p>Sorry, we couldn't find the product you're looking for.</p>
      <a href="../index.html">Return to Homepage</a>
    `;
  }
}