import { BaseComponent } from "../baseComponet.js";

type OnClickListener = ()=> void;
type OnSumbitListener = () => void;

export class ButtonComponent extends BaseComponent<HTMLElement> {
    clickListener?: OnClickListener | OnSumbitListener;
    private my__btn:HTMLButtonElement
    constructor(name:string){
        super(
        `
        <div class="btn__box">
            <button class="my__btn"></button>
        </div>
        ` )
        this.my__btn=this.element.querySelector('.my__btn')! as HTMLButtonElement
        this.my__btn.textContent=name;
        this.my__btn.onclick = () =>{
            this.clickListener&&this.clickListener();
        }
    }
    
    setClickListener(listener: OnClickListener| OnSumbitListener){
        this.clickListener=listener
    }
    
    append(parent:HTMLElement){
        parent.appendChild(this.element)
    }

    get text():string | null{
        return this.my__btn!.textContent;
    }

}