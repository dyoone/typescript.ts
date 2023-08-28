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
      const newsSection = document.querySelector('.newsSection')! as HTMLElement
      const post = news__collection.querySelector('.postit')! as HTMLElement
      post.addEventListener('mousedown',copyPost);
       news__collection.addEventListener('wheel',(event)=>{
         if(event.ctrlKey){
           event.preventDefault();
            const scaleFactor = event.deltaY > 0 ? 0.8 : 1.2;  //확대/축소 비율 조절
            const currentWidth = news__collection.offsetWidth;
            const currentHeight = news__collection.offsetHeight;
  
            const newWidth = currentWidth * scaleFactor;
            const newHeight = currentHeight * scaleFactor;
  
           news__collection.style.width = `${newWidth}px`;
           news__collection.style.height = `${newHeight}px`;
         }
       })


      news__collection.addEventListener('contextmenu',(event: MouseEvent)=>{
        clickedElement = event.target as HTMLElement;
          if (clickedElement.tagName === 'SPAN') {
            event.preventDefault();
            let div=clickedElement.parentNode! as HTMLElement
            const toolBox=new ToolBox(div)
            toolBox
          }
      })

      news__collection.addEventListener('mouseleave', (event): void => {
          event.stopPropagation();
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
           if (clickedElement.classList.contains('newsTitle')) {
              isDragging = true;
              initialX = event.pageX;
              initialY = event.pageY;
              clickedElement=clickedElement.parentNode! as HTMLElement
              initialLeft = parseFloat(getComputedStyle(clickedElement).left);
              initialTop = parseFloat(getComputedStyle(clickedElement).top);
              clickedElement.style.cursor = 'grabbing';
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
           }


      });

      const closeUpBtn=document.querySelector('.close_up')
      
      closeUpBtn?.addEventListener('click',()=>{
        console.log('hi')
        if(closeUpBtn.textContent==='크게보기'){
          news__collection.classList.add('closeUp')
          closeUpBtn.textContent='작게보기'
        }
        else if(closeUpBtn.textContent==='작게보기'){
          news__collection.classList.remove('closeUp')
          closeUpBtn.textContent='크게보기'
        }
      })

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
            clickedElement.style.left = `${initialLeft+5}px`;
            clickedElement.style.top = `${initialTop+5}px`;
          }
          if(Math.floor(picked_X)-Math.floor(section_X)<20){
            alert('더이상 왼쪽으로 갈 수 없습니다.')
            clickedElement.style.left = `${initialLeft+5}px`;
            clickedElement.style.top = `${initialTop+5}px`;
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

      function copyPost(event: MouseEvent){
        let clickedPost = event.target! as HTMLElement;
    
        // 클릭한 요소의 복제본 생성
        if(clickedPost.classList.contains('postit')||clickedPost.classList.contains('copy_post')){
        const newPost = clickedPost.cloneNode(true) as HTMLElement;
        newPost.className = 'postit';
        const $textarea=document.createElement('textarea');
        const $btn = document.createElement('button');
        $btn.textContent='X'
        clickedPost.appendChild($btn);
        clickedPost.appendChild($textarea);
        $btn.addEventListener('click',(event:MouseEvent)=>{
          const target=event.target! as HTMLElement;
          const post=target.parentNode! as HTMLElement;
          news__collection.removeChild(post)
        })
        
        // 복제본을 새로운 위치에 추가
        newsSection.appendChild(newPost);
    
        // 기존 요소의 위치를 변경
        const currentTop = clickedPost.offsetTop;
        const currentLeft = clickedPost.offsetLeft;
        clickedPost.style.top = `${currentTop+5}px`;
        clickedPost.style.left = `${currentLeft+15}px`;
        }
          isDragging = true;
          initialX = event.pageX;
          initialY = event.pageY;
          clickedElement=clickedPost
          initialLeft = parseFloat(getComputedStyle(clickedElement).left);
          initialTop = parseFloat(getComputedStyle(clickedElement).top);
          clickedElement.style.cursor = 'grabbing';
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
          if(clickedElement.tagName !=='BUTTON'&&clickedElement.tagName !=='TEXTAREA'){
            clickedPost.classList.remove('postit');
            clickedPost.classList.add('posted');
          } 

          const post = news__collection.querySelector('.postit')! as HTMLElement
          post.addEventListener('mousedown',copyPost);

      }



  }
}
