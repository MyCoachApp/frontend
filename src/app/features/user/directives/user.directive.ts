import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appUser]',
  standalone: true
})
export class UserDirective {
  @Input() appUserMode: 'view' | 'edit' = 'view';
  
  get isEditMode(): boolean {
    return this.appUserMode === 'edit';
  }
  
  get isViewMode(): boolean {
    return this.appUserMode === 'view';
  }
}
