import React, { Component } from "react"
import axios from 'axios'
import Main from '../tamplets/Main'
import logo from '../../assets/imgs/logo1.png'

const headerProps = {
    icon: "users",
    title:"Clientes",
    subtitle:"Cadastro de clientes: Incluir, Listar, Alterar e Excluir!"
   
    
}
   const baseUrl = 'http://localhost:3003/users'
   const initialState = {
       user: { name: '', email: '', cpf:''},
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
                   <div className="col-10 col-md-9">
                       <div className="form-group">
                           <label>Nome:</label>  
                           {'   '}
                           
                           <input type="text" className="form-control"
                      
                           name="name"
                           value={this.state.user.name}
                           onChange={e => this.updateField(e)}
                           placeHolder="Digite o nome..."/>
                        </div>
                    </div>
                    <div className="col-12 col-md-5">
                        <div className="form-group">
                            <label>E-mail:</label>
                            {'   '}
                            <input type="text" className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                            placeHolder="Digite o e-mail..."/>
                          
                        </div>

                    </div>
                    <div className="col-12 col-md-5">
                        <div className="form-group">
                            <label>Cpf:</label>
                            {'   '}
                            <input type="number" className="form-control"
                            
                            name="cpf"
                            value={this.state.user.cpf}
                            onChange={e => this.updateField(e)}
                            placeHolder="Numero cpf..."/>
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
                <label>Cep:
        <input name="cep" type="text" id="cep" value="" size="10" maxlength="9"
               onblur="pesquisacep(this.value);" /></label><br />
        <label>Rua:
        <input name="rua" type="text" id="rua" size="60" /></label><br />
        <label>Bairro:
        <input name="bairro" type="text" id="bairro" size="40" /></label><br />
        <label>Cidade:
        <input name="cidade" type="text" id="cidade" size="40" /></label><br />
        <label>Estado:
        <input name="uf" type="text" id="uf" size="2" /></label><br />
        <label>IBGE:
        <input name="ibge" type="text" id="ibge" size="8" /></label><br />
       
        <button className="btn btn-primary"
                         onClick={e =>this.save(e)}>
                         Verificar CEP
       </button>
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
        <table className="m-t108px">
            <thead>
                <tr>
                <th>Cpf</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Id</th>
                 <th>Ações</th>
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
              <td>{user.cpf}</td>
             <td>{user.name}</td> 
             <td>{user.email}</td> 
             <td>{user.id}</td> 
             <td>
                 
                 <button className="btn btn-warning"
                  onClick={()=>this.load(user)}>
                          <i className="fa fa-pencil"></i>
                 </button>
                 {' '}
                 <button className="btn btn-warning ml-10"
                 onClick={()=>this.remove(user)}>
                     <i className="fa fa-trash"></i>
                 </button>
                
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