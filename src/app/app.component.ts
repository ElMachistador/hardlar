import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hardlar';

  superMode = false;


  switcheroo() {
    this.superMode = !this.superMode;
  }
}
