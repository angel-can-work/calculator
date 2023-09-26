import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';

export interface Tile {
  color?: string;
  cols: number;
  rows: number;
  text: string;
  action?: string;
  class?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatGridListModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'calculator';
  buttons: Tile[];
  inputArray: any[];
  current: string;
  history: string = '';
  currentoperation: string = '';

  constructor() {
    this.buttons = [
      { cols: 1, rows: 1, text: '7' },
      { cols: 1, rows: 1, text: '8' },
      { cols: 1, rows: 1, text: '9' },
      { cols: 1, rows: 1, text: '/' },
      { cols: 1, rows: 1, text: '4' },
      { cols: 1, rows: 1, text: '5' },
      { cols: 1, rows: 1, text: '6' },
      { cols: 1, rows: 1, text: 'x' },
      { cols: 1, rows: 1, text: '1' },
      { cols: 1, rows: 1, text: '2' },
      { cols: 1, rows: 1, text: '3' },
      { cols: 1, rows: 1, text: '-' },
      { cols: 1, rows: 1, text: '0' },
      { cols: 1, rows: 1, text: '.' },
      { cols: 1, rows: 1, text: 'AC' },
      { cols: 1, rows: 1, text: '+' },
      { cols: 4, rows: 1, text: '=' }
    ];
    this.current = '';
    this.inputArray = [];
   }

  ngOnInit(): void {
  }

  update(event: string) {
    switch (event) {
      case '/':
      case 'x':
      case '-':
      case '+': {
        this.inputArray.push(this.current, event);
        this.current = '';
        this.history += ' ' + event + ' ';
        break;
      }
      case '=': {
        this.inputArray.push(this.current);
        this.solve();
        break;
      }
      case 'AC': {
        this.clear();
        this.history = '';
        break;
      }
      default: {
        if (this.current === '0') {
          this.clear();
        }
        this.current += event;
        this.history += event;
        break;
      }
    }

  }

  isOperation(item: string) {
    return item === '/' || item === 'x' || item === '-' || item === '+';
  }

  clear() {
    this.current = '';
    this.inputArray = [];
  }

  solve() {
    this.current = this.inputArray.reduce((previousValue, currentValue) => {
      if (this.isOperation(currentValue)) {
        this.currentoperation = currentValue;
        return previousValue;
      } else {
        return this.operate(parseFloat(previousValue), this.currentoperation, parseFloat(currentValue));
      }
    });
    this.inputArray = [];
  }

  operate(num1: number, operation: string, num2: number) {
    let result = '';
    switch (operation) {
      case '/': {
        result = (num1 / num2).toString();
        break;
      }
      case 'x': {
        result = (num1 * num2).toString();
        break;
      }

      case '-': {
        result = (num1 - num2).toString();
        break;
      }
      
      default: {
        result = (num1 + num2).toString();
        break;
      }
    }
    return result;
  }

}
