import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Remito, StockService } from 'src/app/stock.service';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css']
})
export class StockViewComponent implements OnInit {

  remitos$:Observable<Remito[]>;
  constructor(private stockService: StockService) {
    this.remitos$ = this.stockService.remitos$;
  }

  ngOnInit() {
  }

}
