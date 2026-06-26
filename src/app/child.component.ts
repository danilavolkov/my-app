import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
      
@Component({
    selector: 'child-comp',
    imports: [FormsModule],
    templateUrl: './child.component.html'
})
export class ChildComponent {
    name: string = "Lily";
}