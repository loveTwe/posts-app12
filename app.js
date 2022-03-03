import Post from "./post.js";
import UI from "./UI.js"
import Form from "./form.js";
import scrollDown from "./scrollEnd.js"
main()
async function main() {
  const ui = new UI("#posts", "#loading")
  const form = new Form("#formModal")
  let formPost = new Post()
  let posts = []
  const observer = new scrollDown(".down") 
  function downIntersected(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchPosts()
      }
    });
  }

  observer.getObserver(downIntersected,1.0)

  async function fetchPosts() {
    try {
      ui.loading = true
      const nextPosts = await Post.getPosts()
      posts.push(...nextPosts)
      ui.renderList(posts)
    } catch (error) {
      console.log(error.response);
    }
    finally {
      ui.loading = false
    }
  }
  document.querySelector("#add-button").addEventListener("click", e => {
    form.FormModal.show()
    form.initFormValues(formPost)

  })
  form.formEl.onsubmit = async function (e) {
    e.preventDefault()
    form.overlay = true
    form.getFormValues(formPost)
    if (!formPost.id) {
      console.log(formPost.id);
      const newPost = await formPost.create()
      ui.addPostToList(newPost)
      posts.unshift()

    }
    else {
      const updating = await formPost.update()
      const postIndex = posts.findIndex(p => p.id == updating.id)
      posts.splice(postIndex, 1, updating)
      ui.renderList(posts)
    }

    form.overlay = false
    formPost = new Post()
    form.FormModal.hide()
  }

  document.body.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-info")) {

      const post = posts.find(p => p.id == e.target.id)
      formPost = new Post(post.id,post.body,post.id)
      form.initFormValues(post)
      form.FormModal.show()
      e.target.parentElement.parentElement.parentElement.classList.add("changed")
    }

    if (e.target.classList.contains("btn-danger")) {


      if (confirm("are you sure delete this item")) {
        const deletePost = await Post.remove(e.target.id)
        let postIndex = posts.findIndex(p => p.id == e.target.id)
        posts.splice(postIndex, 1)
        e.target.parentElement.parentElement.parentElement.remove()
      }
    }
  });
}