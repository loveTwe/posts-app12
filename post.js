const axiosApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    headers : {
        'Content-type' : "application/json ; charset=UTF-8"
    }
})
export default class Post{
    static pgnOption = {
        _limit:5,
        _page:0
    }
    constructor(title = "",body = "",id=null){
        this.title = title
        this.body = body

        if (id){
            this.id = id
        }
    }
    static async getPosts(){
        try {
            const {data} = await axiosApi.get("posts",{
                params : this.pgnOption
            })
            return data.map(post => new Post(post.title, post.body, post.id))
        } catch (error) {
            throw error.response
        }
    }
    async create(){
        try {
            const { data } = await axiosApi.post("posts",this);
            return data
        } catch (error) {
            throw error.response
        }
    }
    async update(){
        try {
            const { data } = await axiosApi.put(`posts/${this.id}`,this);
            return data
        } catch (error) {
            throw error.response
        }
    }
    static async remove(id){
        try {
            const { data } = await axiosApi.delete(`posts/${id}`);
            return true
        } catch (error) {
            throw error.response
        }
    }
}