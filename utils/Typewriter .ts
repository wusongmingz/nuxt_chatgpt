export class Typewriter {
        content: string
        target: HTMLElement | null
        index: number
        end: number
        step: number // 步进速度
        interval: any
    
        constructor(content: string, target: HTMLElement | null, step: number) {
          this.content = content;
          this.target = target;
          this.step = step;
          this.interval = null;
          this.index = 0;
          this.end = this.content.length;
        }
    
        start() {
          if (this.interval) {
            console.log("runing");
            return;
          }
    
          if (this.target == null) {
            console.log("target is null!");
            return;
          }
    
          this.interval = this.push();
        }
        
        push() {
          if (this.target == null) return null;
          return setTimeout(() => {
            (this.target as HTMLElement ).innerHTML += this.content.charAt(this.index++)
      
            if (this.index < this.end) {
              this.push();
            }
          }, this.step)
        }
      }
    
      // example
    //   const content: string = "abcdefd";
    //   const targetEl: HTMLElement | null = document.getElementById("target");
    //   const typewriter: Typewriter = new Typewriter(content, targetEl, 150);
    //   typewriter.start();