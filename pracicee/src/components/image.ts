import { BaseComponent } from "../baseComponet.js";
import { ComponentConstructor } from "./input.js";
export class ImageComponent extends BaseComponent<HTMLElement> {
    private num: string = ''; // 멤버 변수로 선언
    private imageBox: HTMLImageElement; // 이미지 엘리먼트 변수

    constructor(private btn: ComponentConstructor) {
        super(`
            <div class="imageBox">
                <img class="randomImageBox">
            </div>
        `);
        const recycleBtn = new this.btn('새로고침');
        this.imageBox = this.element.querySelector('.randomImageBox') as HTMLImageElement; // 이미지 엘리먼트 선택
        this.random(); // 초기 이미지 생성
        this.updateImageSrc(); // 이미지 엘리먼트의 src 업데이트

        recycleBtn.setClickListener(() => {
            this.random(); // 새로운 이미지 랜덤 생성
            this.updateImageSrc(); // 이미지 엘리먼트의 src 업데이트
        });

        recycleBtn.attachTo(document.querySelector('.randomImages')! as HTMLElement, "beforebegin");
    }

    random() {
        this.num = String(Math.floor(Math.random() * 1000) + 1);
    }

    private updateImageSrc() {
        this.imageBox.src = `https://picsum.photos/id/${this.num}/200/300`;

        this.imageBox.onerror = () => {
            this.random();
            this.updateImageSrc();
        };
        }

         
    }
    
    





