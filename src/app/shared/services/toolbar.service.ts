import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

import {IDefaultStyle, IIcons} from "../interface";

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
    'background-color': '#fff',
  }

  setIcons(data: IDefaultStyle | void): void {
    if (!data) {
      data = this.defaultStyle
    }

    this.icons$.next([
      {
        name: 'format_bold',
        active: data['font-weight'] === 'bold',
        style: {'font-weight': data["font-weight"] === 'bold' ? 'normal' : 'bold'}
      },
      {
        name: 'format_italic',
        active: data['font-style'] === 'italic',
        style: {'font-style': data["font-style"] === 'italic' ? 'normal' : 'italic'}
      },
      {
        name: 'strikethrough_s',
        active: data['text-decoration'] === 'line-through',
        style: {'text-decoration': data["text-decoration"] === 'line-through' ? 'none' : 'line-through'}
      },
      {
        name: 'format_color_text',
        active: false,
        style: {'color': data.color},
        type: 'color',
      },
      {
        name: 'format_align_left',
        active: data['text-align'] === 'left',
        style: {'text-align': 'left'}
      },
      {
        name: 'format_align_center',
        active: data['text-align'] === 'center',
        style: {'text-align': 'center'}
      },
      {
        name: 'format_align_right',
        active: data['text-align'] === 'right',
        style: {'text-align': 'right'}
      },
      {
        name: 'format_color_fill',
        active: false,
        type: 'background-color',
        style: {'background-color': data['background-color']},
      },
    ])
  }
}
