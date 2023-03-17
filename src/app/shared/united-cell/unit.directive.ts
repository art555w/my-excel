import {Directive, HostListener, Renderer2} from '@angular/core';
import {SelectCellService} from "../select-cell/select-cell.service";
import {UnitService} from "./unit.service";

@Directive({
  selector: '[appUnit]'
})
export class UnitDirective {

  id = ''
  borderSide = ['right', 'bottom']

  constructor(
    private selectCellService: SelectCellService,
    private renderer: Renderer2,
    private unitService: UnitService
  ) {
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    const group = this.selectCellService.groupCells
    const border: { [key: string]: any } = this.selectCellService.selectBorder()
    const start = group.at(0)
    const finish = group.at(-1)

    if (start && finish) {
      this.id = `${start.nativeElement.id}-${finish.nativeElement.id}`
      this.unitService.handleUnit(start.nativeElement.id, finish.nativeElement.id)
    }

    group.forEach(el => {
      this.renderer.setAttribute(el.nativeElement, 'data-unit', this.id)
      Object.keys(border).forEach(key => {
        this.borderSide.forEach((side) => {
          if (key.includes(side) && border[key].includes(el.nativeElement.id)) {
            this.renderer.addClass(el.nativeElement, `${side}`)
          }
          if (!border[key].includes(el.nativeElement.id)) {
            this.renderer.addClass(el.nativeElement, 'b-none')
          }
        })
      })
    })


  }

}
