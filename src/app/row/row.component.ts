import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { DragStartEventsArgs } from '../models/events';
import { Row } from '../models/row';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input() row!: Row;
  @Input() index!: number;
  @Input() parent!: LayoutComponent;
  @Output() added = new EventEmitter;
  @Output() deleted = new EventEmitter;
  @Output() draggingStart = new EventEmitter;
  @Output() draggingEnd = new EventEmitter;
  @Output() draggingOver = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  onAdded(index: number): void {
    this.row.cells.splice(index+1, 0, {content:`Cell ${this.row.cells.length + 1}`});
  }

  onDeleted(index: number): void {
    this.row.cells.splice(index,1);
  }

  onDraggingStart(e: DragStartEventsArgs)
  {
    this.draggingStart.emit(e);
  }

  onDraggingEnd()
  {
    this.draggingEnd.emit();
  }

  onMouseDown(e: MouseEvent, direction: number)
  {
      this.draggingStart.emit({rowIndex: this.index, cellIndex: undefined, isResizing: true});
      let startY = e.clientY;
      let initial_grow = this.row.grow || 1;
      document.onmousemove = (e: MouseEvent)=>{
        var delta = direction *(e.clientY - startY);
        this.row.grow = Math.max(1, Math.min(initial_grow + (delta/150.0), 3));
      }
      document.onmouseup = () => {
          document.onmousemove = document.onmouseup = null;
          this.draggingEnd.emit();
      }
  }

  isShowDropIndex(isLeft: boolean, isLast: boolean, cindex: number): boolean{
    if(!isLeft){
      return isLast && this.parent.dropRowIndex === this.index && this.parent.dropCellIndex === this.row.cells.length;
    }
    else{
      return (this.parent.dropRowIndex === this.index) &&
       (this.parent.dropCellIndex === cindex) && this.parent.isDroppable();
    }

  }
}
