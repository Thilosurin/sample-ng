import {
  Directive,
  HostBinding,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[DragFilesUpload]',
})
export class UploadDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() onFileDropped: EventEmitter<any> = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
    const files = e.dataTransfer.files;
    if (files.length) this.onFileDropped.emit(files);
  }
}
