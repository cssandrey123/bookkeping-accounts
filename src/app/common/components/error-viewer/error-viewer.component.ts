import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {ERROR_MESSAGES} from '../../constants';

@Component({
  selector: 'app-error-viewer',
  templateUrl: './error-viewer.component.html',
  styleUrls: ['./error-viewer.component.scss']
})
export class ErrorViewerComponent implements OnInit, OnChanges {

  @Input() errors: ValidationErrors | null;
  errorMessage = '';

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors?.currentValue) {
      this.updateErrorMessage(changes.errors.currentValue);
    }
  }

  private updateErrorMessage(validationErrors: ValidationErrors): void {
    for (const errorKey of Object.keys(ERROR_MESSAGES)) {
      if (errorKey in validationErrors) {
        this.errorMessage = ERROR_MESSAGES[errorKey];
        break;
      }
    }
  }

}
