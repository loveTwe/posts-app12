
export default class scrollDown{
    constructor(QS){
        this.down = document.querySelector(QS)

    }
    getObserver(cbfunction,threshold){
        const observer = new IntersectionObserver(cbfunction, {
            threshold: threshold
          })
          observer.observe(this.down)  
    }
   
}