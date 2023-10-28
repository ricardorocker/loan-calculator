import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent {
  emprestimoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emprestimoForm = this.fb.group({
      tipoEmprestimo: this.fb.group({
        casa: [false],
        pessoal: [false],
        carro: [false],
      }),
      valorEmprestimo: [1000, [Validators.min(1000), Validators.max(50000)]],
      taxaEmprestimo: [0, [Validators.min(0), Validators.max(25)]],
      prazoEmprestimo: this.fb.group({
        quantidade: [1, [Validators.min(1), Validators.max(60)]],
        tipo: ['year'],
      }),
    });
  }

  onSubmit() {
    const formData = this.emprestimoForm.value;
    console.log(formData);
  }
}
