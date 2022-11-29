import { Directive, ElementRef, Input, AfterViewInit, Renderer2, ViewContainerRef, ComponentFactoryResolver, Component, EmbeddedViewRef } from '@angular/core';

@Component({
    selector: 'app-iconc',
    template: `&nbsp;<mat-icon style="cursor: pointer;pointer-events:auto; margin-top: 1px; color: #b3b3b3; font-size: inherit;" [matTooltip]="toolTipText">help</mat-icon>`
})
export class ColumnPinningComponent{
    toolTipText: string = '';
}

@Directive({
    selector: '[uiHelp]'
})
export class HelpDir implements AfterViewInit {
    @Input('uiHelp') tooltip: string='';
    constructor(
        private el: ElementRef,
        public viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private renderer: Renderer2,
    ) {

    }
    ngAfterViewInit(): void {
        if (this.tooltip && this.tooltip !== '') {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnPinningComponent);
            const viewContainerRef = this.viewContainerRef;
            const componentRef = viewContainerRef.createComponent<ColumnPinningComponent>(componentFactory);
            componentRef.instance.toolTipText = this.tooltip;
            componentRef.changeDetectorRef.detectChanges();
            let htmlElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            this.renderer.appendChild(this.renderer.parentNode(this.el.nativeElement), htmlElement);
        }
    }
}