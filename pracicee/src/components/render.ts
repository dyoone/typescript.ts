import { BaseComponent } from "../baseComponet.js";
import { ComponentConstructor, InputComponent, ComponentConstructor2 } from "./input.js";
import { ButtonComponent } from "./btn.js";

export type ComponentConstructor3 = {
    new( btn: ComponentConstructor,  btnName: string,  renderCreator?: ComponentConstructor2): InputComponent
}

export class RenderComponent extends BaseComponent<HTMLElement> {
    private textElement: HTMLParagraphElement;
    private editButton: ButtonComponent;
    constructor(text: string, private btn: ComponentConstructor, private btnName: string, private btnName2: string, private input : ComponentConstructor3) {
        super(
        `
        <div class="text__container">
            <p class="text__content"></p>
        </div>
        `
        );
        this.textElement = this.element.querySelector('.text__content')! as HTMLParagraphElement;
        this.textElement.textContent = text;

        const removeButton = new this.btn(this.btnName);
        removeButton.append(this.element);
        removeButton.setClickListener(() => this.removeFrom());


        this.editButton = new this.btn(this.btnName2);
        this.editButton.append(this.element)
        this.editButton.setClickListener(inputRender);
        const element=this.element
        const inputBox=new this.input(ButtonComponent,'수정', RenderComponent) // 의존성 주입
        function inputRender():void{
            inputBox.attachTo(element,"beforeend")
        }
        }

    removeFrom() {
        const main = document.querySelector('main')! as HTMLElement;
        main.removeChild(this.element);
        this.textElement.textContent = '';
    }

 

}
