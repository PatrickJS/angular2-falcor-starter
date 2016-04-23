import {Component, Directive, ElementRef, Renderer} from 'angular2/core';
import {global} from 'angular2/src/facade/lang';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {Model} from './angular2-falcor';
import {Observable} from 'rxjs/Observable';

@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // we must interact with the dom through Renderer for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}



@Component({
  selector: 'home',
  template: `
  Home
  `
})
export class Home {
}

@Component({
  selector: 'about',
  template: `
  About
  `
})
export class About {
}


@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  styles: [`
    .router-link-active {
      background-color: lightgray;
    }
  `],
  template: `
  <div>
    <nav>
      <a [routerLink]=" ['./Home'] ">Home</a>
      <a [routerLink]=" ['./About'] ">About</a>
    </nav>
    <div>
      <span x-large>Hello, {{ name }}!</span>
    </div>

    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
    <pre>{{ data | json }}</pre>

    <main>
      <router-outlet></router-outlet>
    </main>
    <h1>{{ server }}</h1>

  </div>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home', useAsDefault: true },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App {
  name: string = 'Angular 2';
  data = {};
  server;
  constructor(public http: Http, public model: Model) {


  }
  ngOnInit() {
    // var modelSync = model.withoutDataSource();

    // retrieve the "greeting" key from the root of the Virtual JSON resource
    this.model
      .get('greeting')
      .subscribe(response => {
        console.log(response.json.greeting);
      });
    setTimeout(() => {
      this.server = 'Rendered on the Server';
    }, 10);
    // we need to use full urls for the server to work
    this.http.get('http://localhost:3000/data.json')
      .subscribe(res => {
        this.data = res.json();
      });
  }

}
