import { Component, OnInit } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { Product } from './product';
import { ProductsService } from '../services/products.service';
// import * as socketIo from 'socket.io-client';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  products;

  constructor(private productsService: ProductsService) {
    console.log('Products Service Connected!');
  }

  deleteItem(id) {
    this.productsService.deleteProduct(id).subscribe(res => {
      console.log('Deleted');
      this.products = this.products.filter((item) => {
        return item.id !== id;
    });
    });
  }

  ngOnInit() {
    // const socket = socketIo('http://localhost:4000');

    // socket.on('hello', (data) => console.log(data));

    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }
}
