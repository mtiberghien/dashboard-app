import { Component, Input, OnInit } from '@angular/core';
import { Cell } from '../models/cell';

@Component({
  selector: 'app-cell-edit',
  templateUrl: './cell-edit.component.html',
  styleUrls: ['./cell-edit.component.css']
})
export class CellEditComponent implements OnInit {
  @Input() cell!: Cell
  constructor() { }

  ngOnInit(): void {
  }

}
