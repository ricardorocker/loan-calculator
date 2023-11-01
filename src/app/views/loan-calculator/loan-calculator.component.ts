import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Graph } from 'src/app/model/graph';
import { LoanCalculatorService } from 'src/app/services/loan-calculator.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
})
export class LoanCalculatorComponent {
  loanForm!: FormGroup;
  loanTypes = [
    { id: 1, description: 'Home' },
    { id: 2, description: 'Car' },
    { id: 3, description: 'Personal' },
  ];
  graphData: Array<Graph> = [
    {value: 1000, color:'#ff6b92', size:'', legend:'Principal'},
    {value: 100, color:'#e4002b', size:'', legend:'Interest'},
  ];

  constructor(
    private form: FormBuilder,
    private calculatorService: LoanCalculatorService
  ) {
    this.loanForm = this.form.group({
      loanType: [null, Validators.required],
      loanAmount: [1000, [Validators.min(1000), Validators.max(50000)]],
      interestAmount: [0, [Validators.min(0), Validators.max(25)]],
      loanTerm: [1, [Validators.min(1), Validators.max(60)]],
      termType: ['year', [Validators.min(1), Validators.max(60)]],      
      
      loanTypeResponse: [''],
      principal: [1000],
      interestPayable: [100],
      totalAmountPayable: [1100],
    });
  }

  onSubmit() {
    const formData = this.loanForm.value;
    this.calculatorService.simulateLoan(formData).subscribe(
      (result) => {
        this.loanForm.get('loanTypeResponse')?.setValue(result.loanTypeResponse);
        this.loanForm.get('principal')?.setValue(result.principal);
        this.loanForm.get('interestPayable')?.setValue(result.interestPayable);
        this.loanForm.get('totalAmountPayable')?.setValue(result.totalAmountPayable);

        const newGraphData = this.graphData.map((item, index) => {
          if (index === 0) {
            item.value = result.principal;
          } else if (index === 1) {
            item.value = result.interestPayable;
          }
          return item;
        });
        this.graphData = newGraphData;
      },
      (error) => {
        console.error('Error to calculate', error);
      }
    );
  }
}
