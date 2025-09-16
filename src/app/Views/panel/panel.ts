import { Component, OnInit } from '@angular/core';
import { Information } from '../information/information';
import { Test } from '../test/test';
import { CommonModule } from '@angular/common';
import { Home } from "../home/home";
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { InformationServices } from '../../Services/Information/information';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [Information, Test, CommonModule, Home, LucideAngularModule],
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
  providers: [] // remove Information unless it's really a service
})
export class Panel implements OnInit {

  readonly back = ChevronLeft;
  step: number = 1;

  constructor(private informationServices: InformationServices) {}

  ngOnInit(): void {
    const savedStep = sessionStorage.getItem('step');
    this.step = savedStep ? parseInt(savedStep, 10) : 1;
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
      sessionStorage.setItem('step', this.step.toString());
    }
  }

  submitInfo() {
    this.informationServices.SubmitInformation();
    this.step++;
    sessionStorage.setItem('step', this.step.toString());
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      sessionStorage.setItem('step', this.step.toString());
    }
  }
}
