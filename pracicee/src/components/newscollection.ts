import { ToolBox } from "./toolBox.js";
export class NewsCollecntion{
  constructor(){
      let isDragging: boolean = false;
      let initialX: number;
      let initialY: number;
      let initialLeft:number;
      let initialTop: number;
      let clickedElement: HTMLElement | null = null; // 초기값 null로 설정

      const news__collection = document.querySelector('.news__collection')! as HTMLElement
     

      news__collection.addEventListener('contextmenu',(event: MouseEvent)=>{
        clickedElement = event.target as HTMLElement;
          if (clickedElement.tagName === 'DIV') {
            event.preventDefault();
            console.log(clickedElement)
            const toolBox=new ToolBox(clickedElement)
            toolBox
          }
      })

      news__collection.addEventListener('mouseleave', (event): void => {
          event.stopPropagation();
          console.log('mouseleave')
          if (isDragging) {
              handleMouseUp();
          }
      });

      news__collection.addEventListener('mousedown', (event: MouseEvent): void => {
          clickedElement = event.target as HTMLElement;
          const toolBox=news__collection.querySelector('.toolBox')
          if(toolBox){
              let pickedNews=toolBox.parentNode;
              const targetElement: HTMLElement = event.target as HTMLElement;
                if(targetElement.tagName!=='LI'){
                    pickedNews?.removeChild(toolBox)
                    pickedNews=null
                }
           }
           if (clickedElement.classList.contains('pickedNews')) {
              isDragging = true;
              initialX = event.pageX;
              initialY = event.pageY;
              initialLeft = parseFloat(getComputedStyle(clickedElement).left);
              initialTop = parseFloat(getComputedStyle(clickedElement).top);
              clickedElement.style.cursor = 'grabbing';
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
           }


      });

      function handleMouseMove(e: MouseEvent): void {
          if (!isDragging || !clickedElement) return;
          const offsetX = e.pageX - initialX;
          const offsetY = e.pageY - initialY;
          const boundingRect = clickedElement.getBoundingClientRect();
          const picked_Y = boundingRect.top + window.scrollY; // 스크롤한 만큼 보정
          const picked_X = boundingRect.left;
          const section_Rect = news__collection.getBoundingClientRect();
          const section_X=section_Rect.left;
          const section_Y =section_Rect.top + window.scrollY; // 스크롤한 만큼 보정
          clickedElement.style.left = `${initialLeft + offsetX}px`;
          clickedElement.style.top = `${initialTop + offsetY}px`;
          if(Math.floor(picked_Y)- Math.floor(section_Y)<20){
            alert('위쪽으로는 갈 수 없습니다.')
            clickedElement.style.left = `${initialLeft}px`;
            clickedElement.style.top = `${initialTop}px`;
          }
          if(Math.floor(picked_X)-Math.floor(section_X)<20){
            alert('더이상 왼쪽으로 갈 수 없습니다.')
            clickedElement.style.left = `${initialLeft}px`;
            clickedElement.style.top = `${initialTop}px`;
          }
      }

      function handleMouseUp(): void {
          isDragging = false;
          if (clickedElement) {
              clickedElement.style.cursor = 'grab';
          }
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      }
  }
}
