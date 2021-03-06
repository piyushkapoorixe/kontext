import { Link } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'; 
import {deleteInVoice, fetch} from '../actions/index'
import GoogleLogin from 'react-google-login';


const Home = ()=>{

  const dispatch = useDispatch();
    
  useEffect(()=>{

         dispatch(fetch());


     },[dispatch])


  const global = useSelector(state=>state.Global);
    
  
  const [loggedIn, setLoggedIn] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  const responseGoogle = (response) => {
    console.log(response);
    setLoggedIn(1);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
  }

  return <div style={{textAlign:"center"}} className="ui container">

{(loggedIn === 0) ? <GoogleLogin
        clientId="607956479123-51baia593sguf5jpr7mu5g1md1ugo953.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> : <div></div>}




{(loggedIn === 1) ? <div><h2>Welcome - {name}</h2><h2>Your Email is - {email}</h2><img src={url} alt="profile-pic" /><br /><Link to="/InvoiceHome"></Link><div>
<Link to='/createInvoice' style={{marginTop:20}} className="ui green button">
        Create InVoice
      </Link>
     

   {global.length >= 1 ? <div style={{marginTop:20}}>
      <table className="ui celled table"> 
      
     
<thead>
 <tr>
   <th>Title</th>
   <th>Items</th>
   <th>Price</th>
   <th>Status</th>
   <th>Message</th>
   <th>Action</th>
 </tr>
</thead>
<tbody>{global.map(InVoice=>{
      return (<tr key={InVoice.id}>
   <td>{InVoice.title}</td>
      <td>{InVoice.items.length}</td>
      <td>{InVoice.price} Rs</td>
      <td className={InVoice.select==="unpaid" ? "negative" : 'positive'}>{InVoice.select}</td>
      <td className="positive">{InVoice.message}</td>
      <td className="positive">
        
     <span  onClick={()=>{dispatch(deleteInVoice(InVoice.id))}}><i style={{alignSelf:'center',color:'red',fontSize:16}} className="trash icon"></i></span>   
        
     <Link  to={`/edit/${InVoice.id}`}><i style={{alignSelf:'center',color:'blue',fontSize:16}} className="pen square icon"></i></Link>   
        
     
        
        
        </td>
 </tr>)
    })} 
 
</tbody>
</table>

<h1>Total: {global.reduce((acc,crr)=>{

return acc +  Number(crr.price) 

 





},0)} rs</h1>



</div>: <div style={{marginTop:50}}>no Data</div> }
         

  </div></div> : <div></div>}









  </div>






}

export default Home;