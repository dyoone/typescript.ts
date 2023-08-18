import { BaseComponent } from "../baseComponet.js";
import { sharedObject } from "../cnt.js";
export class ProgressComponent extends BaseComponent<HTMLElement> {
    private gauge: HTMLProgressElement;

    constructor() {
        super(
            `
            <div class='progressBar'>
                <progress class='gauge'></progress>
            </div>
            `
        );

        this.gauge = this.element.querySelector('.gauge')! as HTMLProgressElement;
    }

    fill_bar() {
        if(sharedObject.cnt===0)this.gauge.removeAttribute('max')
        if(sharedObject.cnt!==0)this.gauge.max = sharedObject.cnt
    }
}

