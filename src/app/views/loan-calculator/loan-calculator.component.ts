import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { LoanTypeArray } from 'src/app/enums/loan-type.enum';
import { Graph } from 'src/app/model/graph';
import { LoanCalculatorService } from 'src/app/services/loan-calculator.service';
import { SimulatedData } from 'src/app/services/loan-calculator.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
})
export class LoanCalculatorComponent {
  loanForm!: FormGroup;
  loanTypes = LoanTypeArray;
  graphData: Array<Graph> = [
    {
      value: 0,
      color: 'var(--secondary-color)',
      size: '',
      legend: 'Principal',
    },
    { value: 0, color: 'var(--primary-color)', size: '', legend: 'Interest' },
  ];

  calculatorResponse$ = new BehaviorSubject<SimulatedData | null>(null);
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private calculatorService: LoanCalculatorService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loanForm = this.formBuilder.group({
      loanType: [null, Validators.required],
      loanAmount: [
        1000,
        [Validators.required, Validators.min(1000), Validators.max(200000)],
      ],
      interestAmount: [
        10,
        [Validators.required, Validators.min(0.1), Validators.max(25)],
      ],
      loanTerm: [
        1,
        [Validators.required, Validators.min(1), Validators.max(60)],
      ],
      termType: ['year', Validators.required],
    });
  }

  onSubmit() {
    if (this.loanForm.valid) {
      const formData = this.loanForm.value;
      this.calculatorService
        .simulateLoan(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result: any) => {
            this.calculatorResponse$.next(result);
            this.updateGraphData(result);
          },
          error: (error) => {
            console.error('Error calculating loan', error);
          },
        });
    } else {
      this.loanForm.markAllAsTouched();
    }
  }

  private updateGraphData(result: SimulatedData): void {
    this.graphData = this.graphData.map((item, index) => {
      if (index === 0) {
        item.value = result.principal;
      } else if (index === 1) {
        item.value = result.interestPayable;
      }
      return item;
    });
  }
}
