import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Graph } from 'src/app/model/graph';

@Component({
  selector: 'app-graph-bar',
  templateUrl: './graph-bar.component.html',
  styleUrls: ['./graph-bar.component.scss'],
})
export class GraphBarComponent {
  @Input() list!: Array<Graph>;

  public Total = 0;
  public MaxHeight = 160;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.MontarGrafico();
  }

  ngOnChanges() {
    this.MontarGrafico();
  }

  MontarGrafico() {
    this.list.forEach((element) => {
      this.Total += element.value;
    });

    this.list.forEach((element) => {
      element.size =
        Math.round((element.value * this.MaxHeight) / this.Total) + '%';
    });

    this.changeDetectorRef.detectChanges();
  }
}
