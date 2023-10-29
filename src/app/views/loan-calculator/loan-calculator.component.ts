import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
})
export class LoanCalculatorComponent {
  emprestimoForm!: FormGroup;
  loanTypes = [
    { id: 1, description: 'Casa' },
    { id: 2, description: 'Carro' },
    { id: 3, description: 'Pessoal' },
  ];

  constructor(private form: FormBuilder) {
    this.emprestimoForm = this.form.group({
      loanType: [null, Validators.required],
      valorEmprestimo: [1000, [Validators.min(1000), Validators.max(50000)]],
      taxaEmprestimo: [0, [Validators.min(0), Validators.max(25)]],
      prazoEmprestimo: [1, [Validators.min(1), Validators.max(60)]],
      tipoPrazo: ['year', [Validators.min(1), Validators.max(60)]]
    });
  }

  onSubmit() {
    const formData = this.emprestimoForm.value;
    console.log(formData);
  }
}
