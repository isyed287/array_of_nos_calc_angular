import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  numbers = signal<number[]>([0, 0]);
  operation = signal<string>('');
  result = signal<number | string>('');

  addNumber() {
    this.numbers.update(nums => [...nums, 0]);
  }

  removeNumber(index: number) {
    this.numbers.update(nums => nums.filter((_, i) => i !== index));
  }

  updateNumber(value: any, index: number) {
    const parsed = parseFloat(value);
    this.numbers.update(nums => {
      const newNums = [...nums];
      newNums[index] = isNaN(parsed) ? 0 : parsed;
      return newNums;
    });
  }

  calculate() {
    const nums = this.numbers();
    let res: number;

    switch (this.operation()) {
      case 'sum':
        res = nums.reduce((a, b) => a + b, 0);
        break;
      case 'avg':
        res = nums.reduce((a, b) => a + b, 0) / nums.length;
        break;
      case 'min':
        res = Math.min(...nums);
        break;
      case 'max':
        res = Math.max(...nums);
        break;
      case 'mul':
        res = nums.reduce((a, b) => a * b, 1);
        break;
      default:
        this.result.set('Please select an operation.');
        return;
    }

    this.result.set(res);
  }
}
