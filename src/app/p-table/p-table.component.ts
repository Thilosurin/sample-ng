import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { TableRoutingService } from '../table-routing.service';
import { Customer } from './customer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-p-table',
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.scss'],
})
export class PTableComponent implements OnInit {
  customers: Customer[];
  frozenValue: Customer[];
  dialogVisible: boolean;
  scrollableCols: any[];
  frozenCols: any[];

  constructor(
    private _table: TableRoutingService,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: HTMLDocument
  ) {}

  ngOnInit(): void {
    this._table
      .getCustomer()
      .pipe(
        map((res) =>
          res.map((r) => ({
            ...r,
            packs: [{ a: 'A', b: 'B', c: 'C', d: 'D' }],
          }))
        )
      )
      .subscribe((res) => {
        this.customers = res;
        this.makeRowsSameHeight();
      });

    this.frozenCols = [{ field: 'name', header: 'Name' }];

    this.scrollableCols = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' },
    ];
  }

  addNewPack(rowIdex: number): void {
    this.customers[rowIdex]['packs'].push({ a: 1, b: 2, c: 3, d: 4 });
    this.makeRowsSameHeight(rowIdex);
  }

  removePack(rowIndex: number, packIndex): void {
    this.customers[rowIndex]['packs'].splice(packIndex, 1);
    this.makeRowsSameHeight(rowIndex);
  }

  makeRowsSameHeight(rowIndex: number = -1) {
    setTimeout(() => {
      const wrapper = this._document.getElementsByClassName(
        'p-datatable-scrollable-wrapper'
      );
      if (!wrapper.length) return;
      Array.from(wrapper).forEach((w: HTMLElement) => {
        const [frozenRows, unFrozenRows] = [
          w.querySelectorAll(
            '.p-datatable-scrollable-view.p-datatable-frozen-view tr'
          ),
          w.querySelectorAll(
            '.p-datatable-scrollable-view.p-datatable-unfrozen-view tr'
          ),
        ];

        if (!!~rowIndex) {
          let [i, len, totalUnFrozenRowsHeight] = [
            rowIndex + 1,
            this.customers[rowIndex]['packs'].length + 1,
            0,
          ];
          for (let j = i; j < i + len; j++)
            totalUnFrozenRowsHeight += unFrozenRows
              .item(j)
              .getBoundingClientRect().height;
          this._renderer.setStyle(
            frozenRows.item(i),
            'height',
            `${totalUnFrozenRowsHeight}px`
          );
        } else {
          // For Init Height Table
          let countUnfrozenTR: number = 0;
          for (let i = 1; i < frozenRows.length; i++) {
            const length = this.customers[i]
              ? this.customers[i]['packs'].length + 1
              : 1;
            const heightUnFRow = (idx: number = i): number =>
              unFrozenRows.item(idx).getBoundingClientRect().height;

            const initFrozenHeight: number = Array.from(
              { length },
              (_, i) => i + 1
            ).reduce((a, b) => {
              a += heightUnFRow(countUnfrozenTR + b);
              return a;
            }, 0);

            this._renderer.setStyle(
              frozenRows.item(i),
              'height',
              `${initFrozenHeight}px`
            );
            countUnfrozenTR += length;
          }
        }
      });
    });
  }
}
