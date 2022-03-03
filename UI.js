export default class UI {
    constructor(querySelector,loadingQS) {
       this.list = document.querySelector(querySelector)
       this.loadingBlock=document.querySelector(loadingQS)      
      
    }
    /**
     * 
     * @param {Array<Post>} posts 
     */
    renderList(posts){
        this.clearTasks()
        posts.forEach(post => {
           this.list.appendChild(this.createPostCard(post))
        });

    }
      /**
     * 
     * @param {Post} post 
     */
    addPostToList(post){
        
    const newPost = this.createPostCard(post)
    /**
         * @type {HTMLDivElement}
         */
    this.list.insertAdjacentElement("afterbegin",newPost)
    }
    createPostCard(post) {
        const card = document.createElement("div")
        card.className = "card my-2"
        card.innerHTML = `
        <div class="card-header  d-flex justify-content-between">
            <h3 class="card-title">${post.title}</h3>
            <div>  
                <button id="${post.id}" class="btn text-white btn-info btn-sm">edit</button>
                <button id="${post.id}" class="btn btn-danger btn-sm">delete</button>
            </div>
        </div>
            <div class="card-body">
                ${post.body}
            </div>
        `

        return card
        
    }
    
    get loading (){
        return this.loadingBlock.classList.contains("d-none")
    }
    set loading(val){
        if(val){
            this.loadingBlock.classList.remove("d-none")
        }
        else {
            this.loadingBlock.classList.add("d-none")
        }
    }
    clearTasks(){
      while (this.list.firstElementChild) {
        this.list.firstElementChild.remove()
      }
    }
    changed(changingQS){
        const changedbtn = document.querySelector()
        changedbtn.parentElement.parentElement.parentElement.classList.add("changed")
    }
}