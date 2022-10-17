import { Component, Input, OnInit } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { DragStartEventsArgs } from '../models/events';
import { Layout } from '../models/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input() layout!: Layout;
  @Input() dashboard!: Dashboard;
  draggingRowIndex?: number;
  draggingCellIndex?: number;
  dropCellIndex?: number;
  ghost!: HTMLImageElement;
  dropRowIndex?: number;
  isResizing?: boolean = false;
  isHorizontal?: boolean;
  constructor() { }

  ngOnInit(): void {
    this.ghost = document.createElement('img');
    this.ghost.src = 'assets/ghost.png';
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

  onMouseDown(e: MouseEvent, direction: number)
    {
        let startX = e.clientX;
        this.onDraggingStart({cellIndex:-1, rowIndex:-1, isResizing:true})
        let ref_size = (window.screen.width/2)||500;
        console.log(ref_size);
        let initial_grow = this.dashboard.grow || 1;
        document.onmousemove = (e: MouseEvent)=>{
          var delta = direction *(e.clientX - startX);
          this.dashboard.grow = Math.max(0.5, Math.min(initial_grow + (delta/ref_size), 1));
        }
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
            this.onDraggingEnd();
        }
    }

}
