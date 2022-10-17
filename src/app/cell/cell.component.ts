import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Cell } from '../models/cell';
import { Row } from '../models/row';
import { RowComponent } from '../row/row.component';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() cell!: Cell;
  @Input() index!: number;
  @Input() parent!: RowComponent;
  cells!: Cell[];
  private clientRect!: DOMRect;
  resizing: boolean = false;
  @Output() added = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() draggingStart = new EventEmitter();
  @Output() draggingEnd = new EventEmitter();
  @Output() draggingOver = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.cells = this.parent.row.cells;
  }

  onMouseDown(e: MouseEvent, direction: number)
    {
        this.resizing = true;
        this.draggingStartEmit(true);
        let startX = e.clientX;
        let cell_content = this.cell.content;
        let initial_grow = this.cell.grow || 1;
        document.onmousemove = (e: MouseEvent)=>{
          var delta = direction *(e.clientX - startX);
          this.cell.grow = Math.max(1, Math.min(initial_grow + (delta/150.0), 3));
        }
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
            this.cell.content = cell_content;
            this.draggingEnd.emit();
            this.resizing = false;
        }
    }
  
    isHighlightable(): boolean{
      return this.parent.parent.draggingRowIndex=== undefined || (this.parent.parent.draggingRowIndex === this.parent.index && this.parent.parent.draggingCellIndex === this.index);
    }

    draggingStartEmit(isResizing:boolean){
      this.draggingStart.emit({cellIndex: this.index, rowIndex: this.parent.index, isResizing: isResizing});
    }

    draggingEndEmit(){
      this.draggingEnd.emit();
    }

    onDragStart(){
      this.draggingStartEmit(false);
    }

    onDragEnd(){
      this.draggingEndEmit();
    }

    onDragLeave(){
    }

    onDragEnter(e: DragEvent){
      this.clientRect = (e.target as HTMLDivElement).getBoundingClientRect();
    }

    onDragOver(e: DragEvent){
      let delta = e.clientX-this.clientRect.x
      this.draggingOver.emit({dropCellIndex: (delta) < (this.clientRect.width/2) ? this.index : this.index+1, dropRowIndex: this.parent.index}); 
    }
}
