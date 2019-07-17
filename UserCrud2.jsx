import React, { Component } from "react"
import axios from 'axios'
import Main from '../tamplets/Main'
import 'bootstrap/dist/css/bootstrap.min.css'



const headerProps = {
    icon: "conversation",
    title:"Forum",
    subtitle:"Deixe seu comentário, tire sua dúvida"
}
   const baseUrl = 'http://localhost:3004/users'
   const initialState = {
       user: {  name:'', email:'', comentários:''},
       list: []
   }


export default class UserCrud extends Component {
    state = {...initialState}

componentWillMount() {
    axios(baseUrl).then(resp =>{
       this.setState({list: resp.data}) 
    })
}


    clear() {
        this.setState({user: initialState.user})
    }
     save(){
         const user = this.state.user
         const method = user.id ? 'put' : 'post'
         const url = user.id ? `${baseUrl}/${user.id}`: baseUrl
         axios[method](url, user)
         .then(resp =>{
            const list = this.getUpdateList(resp.data) 
            this.setState({user: initialState.user, list})
         })
     }

     getUpdateList(user){
         const list = this.state.list.filter(u => u.id !== user.id)
         list.unshift(user)
         return list
     }

     updateField(event){
         const user = {...this.state.user}
         user[event.target.name] = event.target.value
         this.setState({user})
     }

     renderForm(){
         return(
           <div className="form" align-items="center">
               <div className="row">
                    <div className="col-12 col-md-10">
                        <div className="form-group">
                            <label>Comentários:</label>
                            {'   '}
                            <input type="text" className="form-control"
                            
                            name="comentários"
                            value={this.state.user.comentários}
                            onChange={e => this.updateField(e)}
                            placeHolder="Digite o comentário..."/>
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-10">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                      
                    <div className="col-12 col-md-10">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                 </div>
                 
               <div className="row">
                    <div className="col-12 dflex justify-content-end">
                     <button className="btn btn-primary"
                         onClick={e =>this.save(e)}>
                         Cadastrar
                    </button>
                   {' '}
                    <button className="btn btn-secondary ml-9"
                    onClick={e =>this.clear(e)}>
                        Cancelar
                        </button> 
                        
                     </div>
                </div>
                <hr />
         </div>
    )
}
load(user){
   this.setState({user}) 
}
remove(user){
  axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== user)
      this.setState({ list})
  })  
}
renderTable(){
    return (
        <table className="m-t10px">
            <thead>
                <tr>
                
        <th>Comentários</th>
        <th> Nome </th>   
        <th>E-mail</th>
            
                
                </tr>
            </thead>
            <tbody>
                {this.renderRows()}  
            </tbody>
        </table>
     )
}
renderRows(){
    return this.state.list.map(user =>{
        return(
          <tr key={user.id}>
             <td>{user.comentários}</td> 
             <td>{user.name}</td> 
             <td>{user.email}</td> 
             
            <td>
                 
                 <button className="btn btn-warning"
                  onClick={()=>this.load(user)}>
                   <i className="fa fa-pencil"></i>
                 </button>
                 {' '}
                 {/* <button className="btn btn-warning ml-10"
                 
                 onClick={()=>this.remove(user)}>
                    <i className="fa fa-trash"></i>
                 </button>*/}
                
             </td>
          </tr>  
        )
    })
}


        render() {
           
             return(
                 <Main {...headerProps}>
                     {this.renderForm()}
                     {this.renderTable()}
                </Main>
        )
    }
}