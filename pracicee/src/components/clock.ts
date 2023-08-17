import { BaseComponent } from "../baseComponet.js";

export class ClockComponent extends BaseComponent<HTMLElement> {
    private section = document.querySelector('.main__section')! as HTMLElement;
    private timeElement: HTMLElement;

    constructor() {
        super(
        `
        <div class="clock__box">
            <h3 class="my__clock"></h3>
        </div>
        `)
        this.section.appendChild(this.element);
        this.timeElement = this.element.querySelector('.my__clock')! as HTMLElement;

        this.updateClock();
        setInterval(this.updateClock.bind(this), 1000);
    }

    private updateClock(): void {
        const now: Date = new Date();
        const hours: string = String(now.getHours()).padStart(2, '0');
        const minutes: string = String(now.getMinutes()).padStart(2, '0');
        const seconds: string = String(now.getSeconds()).padStart(2, '0');

        const timeString = `${hours}:${minutes}:${seconds}`;

        this.timeElement.textContent = timeString;
    }
}
