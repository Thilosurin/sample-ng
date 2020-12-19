import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  IProductCatalog,
  ProductCatalogService,
} from './product-catalog.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-generate-html',
  templateUrl: './generate-html.component.html',
  styleUrls: ['./generate-html.component.scss'],
  providers: [ProductCatalogService],
})
export class GenerateHtmlComponent implements OnInit {
  images: IProductCatalog[] = [];

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private productCatalog: ProductCatalogService
  ) {
    this.productCatalog
      .getProducts()
      .pipe(tap((res) => console.log('product catalog => ', res)))
      .subscribe((data) => (this.images = data));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.getHtmlToStr(this.elRef.nativeElement));
  }

  getHtmlToStr = (html: HTMLElement): string => {
    const [link, { currentSrc }, tag, className, value] = [
      (html as HTMLLinkElement).href,
      (html as HTMLImageElement),
      html.localName,
      html.className,
      html.textContent,
    ];

    console.log("res => ", currentSrc)

    let htmlStr: string = '<' + tag;
    currentSrc && (htmlStr += ' src="' + currentSrc + '"');
    link && (htmlStr += ' href="' + 'link' + '"');
    className && (htmlStr += ' class="' + className + '"');

    if (tag == 'img') {
      htmlStr += '/>';
    } else {
      htmlStr += '>';
      value && (htmlStr += value);
      htmlStr += Array.from(html.children)
        .map((c: HTMLElement) => this.getHtmlToStr(c))
        .join('');
      htmlStr += '</' + tag + '>';
    }

    if (!html.children.length) return htmlStr || '';
    return htmlStr;
  };
}
