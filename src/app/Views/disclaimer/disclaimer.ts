import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { emit } from 'process';

@Component({
  selector: 'app-disclaimer',
  imports: [ ],
  templateUrl: './disclaimer.html',
  styleUrl: './disclaimer.scss'
})
export class Disclaimer {
  @Input() isVisible: boolean= true
  @Output() confirmDisclaimer = new EventEmitter<void>();
  disclaimerConfirmation: boolean = false;
  constructor(private route : Router){}

  confirm()
  {
    sessionStorage.setItem('Agreement', 'false');
    this.confirmDisclaimer.emit();
  }

  checked(){
    if (this.disclaimerConfirmation) {
      this.disclaimerConfirmation = false;
    }
    else {
      this.disclaimerConfirmation = true;
    }
    
  }
}
