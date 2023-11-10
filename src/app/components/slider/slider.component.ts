import { Component, Input } from '@angular/core';
import { AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() minValue!: number;
  @Input() maxValue!: number;
  @Input() step!: number;
  @Input() control: AbstractControl | null = null;
}
