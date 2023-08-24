import { BaseComponent } from "../baseComponet.js";

interface NewsItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}

export class NewsComponent extends BaseComponent<HTMLElement> {
    private data: NewsItem[] = [];
    private copyHtml:HTMLElement|null=null;
    constructor() {
        super(
            `
            <div class="new__container">
                <input type="text" class="search__bar">
                <button type="submit" class="news__btn">검색</button>
                <section class="new__contents"></section>
            </div>
            `
        );

        const { element } = this;
        const news_btn = element.querySelector('.news__btn')! as HTMLElement;
        const search_bar = element.querySelector('.search__bar')! as HTMLInputElement;

        news_btn.addEventListener('click', async () => {
                try {
                    const searchValue: string = search_bar.value;

                    const response = await fetch('http://localhost:3000/search/news', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ query: searchValue })
                    });

                    this.data = await response.json();
                    this.renderNews();
                } catch (error) {
                    console.error('Error:', error);
                }
        });
       
        const new__container = element! as HTMLElement;
        new__container.addEventListener('click',(event:MouseEvent)=>{
           const clickedElement= event.target! as HTMLElement;
           if (clickedElement.tagName==='LI') {
                const innerHTMLString=clickedElement.innerHTML;
                const parser = new DOMParser();
                const parsedHTML = parser.parseFromString(innerHTMLString, 'text/html');
                this.copyHtml=parsedHTML.body.firstChild! as HTMLElement
                this.copyHtml.className='pickedNews'
                const text = this.copyHtml.innerText;
                const textWidth=this.getTextWidth(text)
                this.copyHtml.style.width=`${textWidth.toString()}px`
                document.querySelector('.news__collection')?.appendChild(this.copyHtml)
        } 
        })
    }


    private getTextWidth(text:string):number {
        if (!this.copyHtml) return 0;
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d') ! as CanvasRenderingContext2D;
        context.font = getComputedStyle(this.copyHtml).font;
        return context.measureText(text).width;
      }


    private renderNews() {
        const news_lists: HTMLElement = document.createElement('ul');
        const news__container = this.element.querySelector('.new__contents')! as HTMLElement;

        while (news__container.firstChild) {
            news__container.removeChild(news__container.firstChild);
        }

        if (this.data) {
            for (const item of this.data) {
                const news_list = document.createElement('li');
                const news = document.createElement('div');
                news.innerText = item.title;
                news_list.appendChild(news);
                news_lists.appendChild(news_list);
            }
            news__container.appendChild(news_lists);
        }
    }
}
