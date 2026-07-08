import {Directive, HostListener, Input, HostBinding} from "@angular/core";
 
@Directive({
    selector: "[bold]",
})
export class BoldDirective{
      
    @Input() selectedSize = "24px";
    @Input() defaultSize = "16px";
    @Input() selectedColor = "green";
      
    private fontSize : string;
    private fontWeight = "normal";
    private color: string;
    constructor(){
        this.fontSize = this.defaultSize;
        this.color = "purple";
    }
     
    @HostBinding("style.fontSize") get getFontSize(){
         
        return this.fontSize;
    }
     
    @HostBinding("style.fontWeight") get getFontWeight(){
         
        return this.fontWeight;
    }

    @HostBinding("style.color") get getColor(){
        return this.color;
    }
     
    @HostBinding("style.cursor") get getCursor(){
        return "pointer";
    }
     
    @HostListener("mouseenter") onMouseEnter() {
        this.fontWeight ="bold";
        this.fontSize = this.selectedSize;
        this.color = this.selectedColor;
    }
 
    @HostListener("mouseleave") onMouseLeave() {
        this.fontWeight = "normal";
        this.fontSize = this.defaultSize;
        this.color = "purple";
    }
}