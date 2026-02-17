import { useEffect, useState } from "react";
import { deletePost, getPost } from "../Api/ApiData";
import Form from "./Form";
import "../App.css";
 
const GetApi = () => {
  const [data, setData] = useState([]);
  const[updatedData, setUpdatedData] = useState({});
  // console.log(updatedData);
  
 

  const useData = async () => {
    let response = await getPost();
    setData(response.data);
  };
 

  const handleDel=async(id)=>{
        try {
            let response = await deletePost(id)
            console.log(response);

          if (response.status===200) {
            let newData =  data.filter((elem)=>{
              return elem.id !== id
            })
            setData(newData)
            
          }
        } catch (error) {
          console.log(error);
          
        }
  }

  const handleUpdate=(elem)=>{
    setUpdatedData(elem)
  }

     
  useEffect(() => {
    useData();
  },[]);


 
  return (
    <div className="container">
      <section>
        <Form data={data} setData={setData} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
      </section>

      <div className="row">
        
        {data.map((elem) => {
        const {body, id, title} = elem;
        return(
          <div className="box col-4" key={id}>
            <div className="card-content">
              <h2><span className="id-badge">{id}</span> {title}</h2>
              <p className="text">{body}</p>
            </div>
 
          <div className="btn-row">
            <button className="edit-btn" 
            onClick={()=>handleUpdate(elem)}>
              Edit
            </button>

            <button className="delete-btn" 
              onClick={ ()=>handleDel(id)}>
                Delete
            </button>
          </div>
          </div>
        )})}

      </div>
    </div>
  );
};
 
export default GetApi;


