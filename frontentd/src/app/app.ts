import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
