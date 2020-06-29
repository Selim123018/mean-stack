import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Output("onAction") emitter = new EventEmitter();
  @Input("data") dataSource = [];
  @Input("cols") tableCols = [];

  constructor() { }

  ngOnInit(): void {
  }

  get keys() { 
    return this.tableCols.map(({ key }) => key);
  }
 
  showBooleanValue(elt, column) {
    return column.config.values[`${elt[column.key]}`];
  }
}
