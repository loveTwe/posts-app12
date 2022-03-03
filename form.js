export default class Form{
    /**
     * 
     * @param {String} formQS
     * 
     */
    constructor(formQS){
            /**
             * @type {HTMLFormElement} 
             * @public
             */
            this.formEl = document.querySelector(formQS)
            this.FormModal = new bootstrap.Modal(this.formEl)
            this.overlayEl= document.querySelector(`${formQS} .overlay`)
        }
        getFormValues(postObj){          
                for (const key in postObj) {
                    if (this.formEl.elements[key]) {
                        postObj[key] = this.formEl.elements[key].value
                    }
                  } 
              return postObj
        }
        initFormValues(post){
            for (const key in post) {
                if (this.formEl.elements[key]) {
                    this.formEl.elements[key].value = post[key]
                }
                    
                }
            return post
            
        }
        get overlay(){
            return this.overlayEl.classList.contains("d-none")
        }
        set overlay(val){
            if(val){
                this.overlayEl.classList.remove("d-none")
            }
            else {
                this.overlayEl.classList.add("d-none")
            }
        }
}
