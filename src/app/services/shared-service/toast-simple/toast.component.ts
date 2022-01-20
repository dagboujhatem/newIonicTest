import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild
} from '@angular/core';

import { ToastComponent, ToasterService, ToastModule } from '@coreui/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [{provide: ToastComponent, useExisting: forwardRef(() => AppToastComponent)}],
})

export class AppToastComponent extends ToastComponent {

  @Input() autohide = true;
  @Input() color;
  @Input() delay = 1000;
  @Input() show;
  @Input() fade = true;
  @Input() closeButton = true;
  @Input() title = '';
  @Input() description;

  index: number;

  constructor(
    public hostElement: ElementRef,
    public renderer: Renderer2,
    public ref: ChangeDetectorRef,
    public toasterService: ToasterService
  ) {
    super(hostElement, renderer, ref, toasterService);
  }

  doShow(title: string, description: string): void {
    this.show = true;
    this.title = title;
    this.description = description;
    // this.element.show();
  }
  doHide(): void {
    this.show = false;
  }
}
