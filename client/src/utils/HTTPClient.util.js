import axios from "axios";

class HTTPClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:8000",
            withCredentials: true
        })
    }

    //Para el Login y el Register
    login(username, password){
        return this.instance.post("/login", {
            username,
            password
        })
    }

    register(data){
        return this.instance.post("/register", data)
    }

    logout(data){
        return this.instance.delete("/logout", data)
    }

    //Para las películas y reviews
    getAllProducts(){
        return this.instance.get("/productos/")
    }

    getOneProduct(data){
        return this.instance.get("/productos/:id", data)
    }

    createProduct(data){
        return this.instance.post("/productos/nuevo", data)
    }

    deleteProduct(data){
        return this.instance.delete("/productos/eliminar/:id", data)
    }

    updateAProduct(data){
        return this.instance.put("/productos/:id", data)
    }
}

export default HTTPClient;