import React, {useEffect, useState} from "react";
import * as ReactBootstrap from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const PersonalTable = ()=>{

    const [posts, setPosts] = useState({blogs:[]});
    const [searchItem, setSearchItem]= useState("");
    const [order, setOrder]= useState("ASC");

  const url = "https://jsonplaceholder.typicode.com/posts"
  
  const fetchApi = async ()=>{
    const response = await fetch(url)
    const responseJson= await response.json()
    setPosts({blogs: responseJson})
  }

  const sorting=(col)=>{
    if (order=== "ASC"){
      const sorted = [...posts].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setPosts({blogs: sorted})
      setOrder("DSC")
    }
    if (order=== "DSC"){
      const sorted = [...posts].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setPosts({blogs: sorted})
      setOrder("ASC")
    }
  }

  useEffect(() =>{
    fetchApi();
  }, [])


    return(
        <div>
          <input type="text" placeholder="Ingresa tu búsqueda" style={{float:'rigth', width: '20%', marginBottom: 10, borderWidth: 1}} onChange={(e)=>{setSearchItem(e.target.value)}}/>
          <ReactBootstrap.Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={()=> sorting("title")}>Title </th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {
          posts.blogs && posts.blogs.filter(val=>{
            if (searchItem === ""){
              return val
            }else if( val.body.toLowerCase().includes(searchItem.toLowerCase()) ) {
                return val
              }

          }).map((item)=>(
            <tr key={item.id}>
            <td>{item.userId}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>
        ))
        }
      </tbody>
    </ReactBootstrap.Table>
        </div>
    )
}

export default PersonalTable