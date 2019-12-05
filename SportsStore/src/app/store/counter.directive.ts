import { Directive, ViewContainerRef, TemplateRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[counterOf]'
})
export class CounterDirective {
  @Input("counterOf") counter: number;

  constructor(private container: ViewContainerRef, private template: TemplateRef<CounterDirectiveContext>) { }

  ngOnChanges(changes: SimpleChanges) {
    this.container.clear();
    for (let i = 0; i < this.counter; i++) {
      this.container.createEmbeddedView(this.template,
        new CounterDirectiveContext(i + 1));
    }
  }
}

class CounterDirectiveContext {
  // $implicit receives the implied variable in the microexpression "let <$implicit> of <variable>"
  public $implicit: number;
  constructor(imp: number) { 
    this.$implicit = imp;
  }
}