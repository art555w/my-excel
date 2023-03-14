import {Injectable} from '@angular/core';
import {IDefaultStyle, IIcons} from "../interface";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  id = ''
  icons$: Subject<IIcons[]> = new Subject<IIcons[]>()
  defaultStyle: IDefaultStyle = {
    "text-align": 'left',
    "font-style": 'italic',
    "text-decoration": 'none',
    "font-weight": 'normal',
    color: '#000',
    'background-color': '#fff'
  }

  constructor() {
  }

  setIcons(style: IDefaultStyle | void): void {
    if (!style) {
      style = this.defaultStyle
    }

    this.icons$.next([
      {
        name: 'format_bold',
        active: style['font-weight'] === 'bold',
        style: {'font-weight': style["font-weight"] === 'bold' ? 'normal' : 'bold'}
      },
      {
        name: 'format_italic',
        active: style['font-style'] === 'italic',
        style: {'font-style': style["font-style"] === 'italic' ? 'normal' : 'italic'}
      },
      {
        name: 'strikethrough_s',
        active: style['text-decoration'] === 'line-through',
        style: {'text-decoration': style["text-decoration"] === 'line-through' ? 'none' : 'line-through'}
      },
      {
        name: 'format_color_text',
        active: false,
        style: {'color': style.color},
        type: 'color',
      },
      {
        name: 'format_align_left',
        active: style['text-align'] === 'left',
        style: {'text-align': 'left'}
      },
      {
        name: 'format_align_center',
        active: style['text-align'] === 'center',
        style: {'text-align': 'center'}
      },
      {
        name: 'format_align_right',
        active: style['text-align'] === 'right',
        style: {'text-align': 'right'}
      },
      {
        name: 'format_color_fill',
        active: false,
        type: 'background-color',
        style: {'background-color': style['background-color']},
      },
    ])
  }
}
