import { ButtonComponent } from "./components/btn.js"
import { ClockComponent } from "./components/clock.js"
import { ImageComponent } from "./components/image.js"
import { InputComponent } from "./components/input.js"
import { NewsComponent } from "./components/news.js"
import { RenderComponent } from "./components/render.js"

const clock = new ClockComponent()
clock

const addBtn= new ButtonComponent('추가')
addBtn.setClickListener(inputRender)

const appDiv = document.querySelector('.app')! as HTMLElement ;
addBtn.attachTo(appDiv,'beforeend')

const inputBox=new InputComponent(ButtonComponent,'완료',RenderComponent)


function inputRender():void{
    inputBox.attachTo()
}

const randomImage=new ImageComponent(ButtonComponent)
randomImage.random()
const randomImages=document.querySelector('.randomImages')! as HTMLElement
randomImage.attachTo(randomImages,'beforebegin')

const newsSection = new NewsComponent()
newsSection.attachTo(appDiv,'beforebegin')