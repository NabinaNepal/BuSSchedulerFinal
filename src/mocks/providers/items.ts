import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Sajha Bus",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Arrival Time: 10 a.m"
  };


  constructor() {
    let items = [
      {
        "name": "Sajha Bus",
        "profilePic": "assets/img/Busses/SajhaBus.jpg",
        "about": "Arrival Time: 10 a.m"
      },
      {
        "name": "City Bus",
        "profilePic": "assets/img/Busses/MetroBus.jpg",
        "about": "Arrival Time: 10:15 a.m."
      },
      {
        "name": "Orange Bus",
        "profilePic": "assets/img/Busses/other.jpg",
        "about": "Arrival Time: 10:15 a.m."
      },
      {
        "name": "Metro Bus",
        "profilePic": "assets/img/Busses/MetroBus.jpg",
        "about": "Arrival Time: 9:45 a.m."
      },
      {
        "name": "Test Bus",
        "profilePic": "assets/img/Busses/other.jpg",
        "about": "Arrival Time: 9:45 a.m."
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
