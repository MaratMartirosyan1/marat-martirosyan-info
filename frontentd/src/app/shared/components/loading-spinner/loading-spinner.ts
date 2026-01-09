import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-spinner.html',
  styleUrls: ['./loading-spinner.scss'],
})
export class LoadingSpinner {}
