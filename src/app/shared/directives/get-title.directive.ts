import {Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {SelectCellService} from "../select-cell/select-cell.service";
import {Store} from "@ngrx/store";
import {titleState} from "../../store/actions/excel.actions";
import {titleSelector} from "../../store/selectors/excel.selectors";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appGetTitle]'
})
export class GetTitleDirective implements OnInit, OnDestroy {


  title = ''
  titleSelector$ = this.store.select(titleSelector)
  subTitle!: Subscription

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private selectCellService: SelectCellService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.subTitle = this.titleSelector$.subscribe(title => {
      this.renderer.selectRootElement('title', true).textContent = title
      this.elRef.nativeElement.textContent = title
    })
  }

  ngOnDestroy() {
    if (this.subTitle) {
      this.subTitle.unsubscribe()
    }
  }

  @HostListener('keyup', ['$event'])
  OnKeyup(event: KeyboardEvent) {

    this.title = this.elRef.nativeElement.textContent

    const subBlur = this.renderer.listen(this.elRef.nativeElement, 'blur', (event: MouseEvent) => {
      this.store.dispatch(titleState({text: this.title}))
      subBlur()
    })


    const subKeydown = this.renderer.listen(this.elRef.nativeElement, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault()
        this.selectCellService.currentCell.nativeElement.focus()
        subKeydown()
      }
    })


  }

}
