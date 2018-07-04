import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }
  getProducts() {
    return this.http.get(`${this.url}/products`);
  }

  getProductsById(id) {
    return this.http.get(`${this.url}/products/${id}`);
  }

  addProduct(name, category, code, price, key, value) {
    const product = {
      name: name,
      category: category,
      code: code,
      price: price,
      details : [{ key: key , value : value }]
    };
    return this.http.post(`${this.url}/products/add`, product);
  }

  updateProduct(id, name, category, code, price, key, value) {
    const product = {
      name: name,
      category: category,
      code: code,
      price: price,
      details : [{ key: key , value : value }]
    };
    return this.http.post(`${this.url}/products/update/${id}`, product);
  }

  deleteProduct(id) {
    return this.http.get(`${this.url}/products/delete/${id}`);
  }
}
