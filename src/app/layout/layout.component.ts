import { Component, Input, OnInit } from '@angular/core';
import { DragStartEventsArgs } from '../models/events';
import { Layout } from '../models/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input() layout!: Layout;
  draggingRowIndex?: number;
  draggingCellIndex?: number;
  dropCellIndex?: number;
  dropRowIndex?: number;
  isResizing?: boolean = false;
  isHorizontal?: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  onAdded(index: number): void {
    this.layout.rows.splice(index+1, 0, {cells:[{content:`Cell 1`}]});
  }

  onDeleted(index: number): void {
    this.layout.rows.splice(index,1);
  }

  onDraggingStart(e: DragStartEventsArgs){
    this.draggingCellIndex = e.cellIndex;
    this.draggingRowIndex = e.rowIndex;
    this.isResizing = e.isResizing;
    this.isHorizontal = e.cellIndex !== undefined;
  }

  onDraggingOver(dropRowIndex: number, dropCellIndex: number){
    this.dropRowIndex = dropRowIndex;
    this.dropCellIndex = dropCellIndex;
  }

  onDraggingEnd(){
    if(!this.isResizing && this.isDroppable())
    {
      let dropCIndex = this.dropCellIndex!;
      let dragCIndex = this.draggingCellIndex!;
      let dropRIndex = this.dropRowIndex!;
      if (this.dropRowIndex === this.draggingRowIndex && this.dropCellIndex! > dragCIndex)
      {
        dropCIndex -=1;
      }
      let element = this.layout.rows[this.draggingRowIndex!].cells.splice(dragCIndex, 1)[0];
      this.layout.rows[dropRIndex].cells.splice(dropCIndex, 0, element);
      console.log(`dragged ${element.content} from (${this.draggingRowIndex},${this.draggingCellIndex}) to (${this.dropRowIndex},${dropCIndex})`);
    }
    this.draggingCellIndex = undefined;
    this.draggingRowIndex = undefined;
    this.dropRowIndex = undefined;
    this.dropCellIndex = undefined;
    this.isResizing = undefined;
    this.isHorizontal = undefined;
  }

  isDroppable(): boolean{
    return (this.dropRowIndex !== this.draggingRowIndex ||(this.dropCellIndex !== this.draggingCellIndex && this.dropCellIndex !== this.draggingCellIndex!+1));
  }

}
