import { BaseComponent } from "../baseComponet.js";
import { ButtonComponent } from "./btn.js";
import { ComponentConstructor3, RenderComponent } from "./render.js";
type SubmitClickListener = () => void;

export type ComponentConstructor = {
    new(arg: string): ButtonComponent
}

export type ComponentConstructor2 = {
    new(arg: string, arg2: ComponentConstructor, arg3: string, arg4: string, arg5:ComponentConstructor3): RenderComponent
}

export class InputComponent extends BaseComponent<HTMLElement> {
    SubmitClickListener?: SubmitClickListener;

    private inputElement: HTMLInputElement;

    constructor(private btn: ComponentConstructor, private btnName: string, private renderCreator?: ComponentConstructor2) {
        super(
            `
        <div class="memo__container">
            <label for="title">Memo</label>
            <input type="text" id="memo">
        </div>
        `);

        const button = new this.btn(this.btnName);
        
        button.append(this.element);
        if(button.text!=='수정'){
            button.setClickListener(() => this.removeFrom());
        }
        if(button.text=='수정'){
                button.setClickListener(()=>this.edit())
        }
        this.inputElement = this.element.querySelector('#memo')! as HTMLInputElement;
    }

    get text(): string {
        return this.inputElement.value;
    }

    removeFrom() {
        if(this.inputElement.value){
            document.body.removeChild(this.element);
            if(this.renderCreator){
                const render = new this.renderCreator(this.text, ButtonComponent, '삭제', '수정',InputComponent);
                const section = document.querySelector('.main__section')! as HTMLElement;
                render.attachTo(section, 'beforeend');
                this.inputElement.value = '';
            }
    }
    }

    edit(){
        if(this.inputElement.value){
            const currentTarget = event?.currentTarget as Element;
            const textContainer = currentTarget.closest('.text__container')! as HTMLElement
            const textPargraph = currentTarget.closest('.text__container')?.querySelector('.text__content')! as HTMLParagraphElement
            textContainer.removeChild(this.element);
            textPargraph.textContent=this.inputElement.value
        }
    }

    
}
