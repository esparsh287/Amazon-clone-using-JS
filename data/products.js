import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId){
  let matchingProduct;

  // Find the matching product
  products.forEach((product) => {
      if (product.id === productId) {
          matchingProduct = product;
      }
  });
  return matchingProduct;
}

class Product{
  id;
  name;
  image;
  rating;
  priceCents;

  constructor(productDetails){
    this.id=productDetails.id;
    this.image=productDetails.image;
    this.name=productDetails.name;
    this.rating=productDetails.rating;
    this.priceCents=productDetails.priceCents;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`;

  };
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`
  }
  extraInfoHtml(){
    return '';
  }
}



class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink=productDetails.sizeChartLink;
  }
  extraInfoHtml(){
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}

export let products=[];

export function loadProducts(fun){
  const xhr=new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
    products=JSON.parse(xhr.response).map((productDetails)=>{
      if(productDetails.type==='clothing'){
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    fun();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
};
