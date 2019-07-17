
import React from "react"
import Main from '../tamplets/Main'
import logo from '../../assets/imgs/logo1.png'


export default props =>
<Main text-align= 'center'
subtitle="Agricutura Sintrópica" icon="tree" title="AgroVida">
    
<div className="display -4"align-items="center"><h1>Agricultura Sintrópica</h1></div>
<p className="mb-0" align-items="center">Sistema Agroflorestal</p>
<aside className="logo">
    <a href="/" className="logo1">
        <img src={logo} alt="logo1" />
       
   </a>
        <p>
        
          </p>
          <p>
            <iframe
            
             
              width="725"
              height="315"
              frameBorder="0"
              
              allowFullScreen
              src="https://www.youtube.com/embed/watch?v=CbI5hTtMUq0&list=RDCbI5hTtMUq0&start_radio=1"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; center"
            />
          </p>
  
</aside>

       
</Main>