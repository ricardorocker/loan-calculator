import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanCalculatorService } from 'src/app/services/loan-calculator.service';

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

  constructor(
    private form: FormBuilder,
    private calculatorService: LoanCalculatorService
  ) {
    this.emprestimoForm = this.form.group({
      loanType: [null, Validators.required],
      valorEmprestimo: [1000, [Validators.min(1000), Validators.max(50000)]],
      taxaEmprestimo: [0, [Validators.min(0), Validators.max(25)]],
      prazoEmprestimo: [1, [Validators.min(1), Validators.max(60)]],
      tipoPrazo: ['year', [Validators.min(1), Validators.max(60)]],
      
      
      tipoEmprestimo: [''],
      valorSimulado: [1000],
      jurosPagar: [100],
      valorTotalPagar: [1100],
    });
  }

  calculaJuros(): number {
    const valorEmprestimo = this.emprestimoForm.value.valorEmprestimo;
    const taxaEmprestimo = this.emprestimoForm.value.taxaEmprestimo / 100;
    const prazo = this.emprestimoForm.value.tipoPrazo === 'year' ? 12 : 1;
    const prazoEmprestimo = this.emprestimoForm.value.prazoEmprestimo * prazo;
    return valorEmprestimo * taxaEmprestimo * prazoEmprestimo;
  }

  calculaTotal(): number {
    const valorEmprestimo = this.emprestimoForm.value.valorEmprestimo;
    return valorEmprestimo + this.calculaJuros();
  }

  onSubmit() {
    const formData = this.emprestimoForm.value;
    this.calculatorService.simulateLoan(formData).subscribe(
      (result) => {
        console.log(result)
        this.emprestimoForm.get('tipoEmprestimo')?.setValue(result.tipoEmprestimo);
        this.emprestimoForm.get('valorSimulado')?.setValue(result.valorSimulado);
        this.emprestimoForm.get('jurosPagar')?.setValue(result.jurosPagar);
        this.emprestimoForm.get('valorTotalPagar')?.setValue(result.valorTotalPagar);
      },
      (error) => {
        console.error('Erro ao simular empréstimo', error);
      }
    );
  }
}
