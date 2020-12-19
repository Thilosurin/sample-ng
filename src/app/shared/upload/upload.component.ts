import { Component, Input, OnDestroy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  BehaviorSubject,
  Observable,
  of,
  Subject,
  timer,
  combineLatest,
  interval,
  from,
} from 'rxjs';
import {
  takeUntil,
  map,
  tap,
  filter,
  concatMap,
  mergeMap,
  switchMap,
  toArray,
} from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnDestroy {
  images: FormArray = new FormArray([]);
  private filesSubject = new BehaviorSubject<any[]>([]);
  files$: Observable<any[]> = this.filesSubject.asObservable();
  private _onDestroy: Subject<void> = new Subject<void>();
  onFileDroppedSubject: Subject<any> = new Subject<any>();

  deleteFile(index: number) {
    this.filesSubject.next(this.filesSubject.value.splice(index, 1));
  }

  calLoadingTime$ = interval(50).pipe(
    filter((t) => 101 > t),
    takeUntil(this._onDestroy)
  );

  vm$ = combineLatest([this.onFileDroppedSubject.asObservable()])
    .pipe(
      map(([files]) => Object.values(files)),
      map((values) =>
        values.reduce((a: any, c: any) => {
          c.progress = true;
          const reader = new FileReader();
          reader.onload = ({ target }): void => {
            c.image = target.result;
          };
          reader.readAsDataURL(c);
          a.push(c);
          return a;
        }, [])
      ),
      tap((res: any[]) =>
        this.filesSubject.next([...this.filesSubject.value, ...res])
      ),
      tap((res) => console.log('Debug => ', res)),
      takeUntil(this._onDestroy)
    )
    .subscribe();


  formatBytes(bytes, decimals) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('Event => ', event);
    const files = this.filesSubject.value;
    moveItemInArray(files, event.previousIndex, event.currentIndex);
    this.filesSubject.next(files);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
