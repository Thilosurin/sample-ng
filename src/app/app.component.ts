import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableRoutingService } from './table-routing.service';
import { MD5 } from 'crypto-js';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputForm: FormControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private _table: TableRoutingService
  ) {}

  ngOnInit(): void {}

  testGenId(): void {
    const start = +new Date();
    console.log('Generate  id => ', this.genId('apple'));
    console.log('result => ', +new Date() - start);
  }

  genId(companyName: string) {
    const hash = MD5(String(+new Date())).toString();
    return (
      companyName[0] +
      companyName[1] +
      '-' +
      hash[0] +
      hash[1] +
      hash[2] +
      hash[3] +
      hash[4] +
      hash[5]
    );
  }

  checkKeyboardTyping(): void {
    const start = +new Date();
    const { value } = this.inputForm;
    const key = {
      _: '`',
      '%': '~',
      ๅ: '1',
      '+': '!',
      '/': '2',
      '๑': '@',
      '-': '3',
      '๒': '#',
      ภ: '4',
      '๓': '$',
      ถ: '5',
      '๔': '%',
      'ุ': '6',
      'ู': '^',
      'ึ': '7',
      '฿': '&',
      ค: '8',
      '๕': '*',
      ต: '9',
      '๖': '(',
      จ: '0',
      '๗': ')',
      ข: '-',
      '๘': '_',
      ช: '=',
      '๙': '+',
      ๆ: 'q',
      '๐': 'Q',
      ไ: 'w',
      '"': 'W',
      ำ: 'e',
      ฎ: 'E',
      พ: 'r',
      ฑ: 'R',
      ะ: 't',
      ธ: 'T',
      'ั': 'y',
      'ํ': 'Y',
      'ี': 'u',
      '๊': 'U',
      ร: 'i',
      ณ: 'I',
      น: 'o',
      ฯ: 'O',
      ย: 'p',
      ญ: 'P',
      บ: '[',
      ฐ: '{',
      ล: ']',
      ',': '}',
      ฃ: '\\',
      ฅ: '|',
      ฟ: 'a',
      ฤ: 'A',
      ห: 's',
      ฆ: 'S',
      ก: 'd',
      ฏ: 'D',
      ด: 'f',
      โ: 'F',
      เ: 'g',
      ฌ: 'G',
      '้': 'h',
      '็': 'H',
      '่': 'j',
      '๋': 'J',
      า: 'k',
      ษ: 'K',
      ส: 'l',
      ศ: 'L',
      ว: ';',
      ซ: ':',
      ง: "'",
      '.': '"',
      ผ: 'z',
      '(': 'Z',
      ป: 'x',
      ')': 'X',
      แ: 'c',
      ฉ: 'C',
      อ: 'v',
      ฮ: 'V',
      'ิ': 'b',
      'ฺ': 'B',
      'ื': 'n',
      '์': 'N',
      ท: 'm',
      '?': 'M',
      ม: ',',
      ฒ: '<',
      ใ: '.',
      ฬ: '>',
      ฝ: '/',
      ฦ: '?',
    };
    const x = value
      .split('')
      .map((c) => key[c])
      .join('');
    this.inputForm.reset();
    console.log("value => ", x)
    console.log('result => ', +new Date() - start);
  }

  goto(): void {
    const path = this.route.children.length ? '..' : 'table';
    this._table.gotoPath(path);
  }
}
