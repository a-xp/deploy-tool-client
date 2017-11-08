import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: 'new.component.html',
  styles: ['.form-group {max-width: 500px}', `.ng-valid[required], .ng-valid.required  { border-left: 5px solid #42A948; }`,
          `.ng-invalid:not(form) { border-left: 5px solid #a94442;}`]
})
export class ProjectNewComponent implements OnInit {

  model = {
    name: '',
    description: '',
    code: '',
    type: '',
    memory: 75,
    archetype: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
