import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InformationModel } from '../../Model/Information/information.model';
import { InformationServices } from '../../Services/Information/information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-information',
  imports: [FormsModule,CommonModule],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information implements OnInit {

  constructor( public InformationServices : InformationServices) {}

  ngOnInit(): void {

  }

}
