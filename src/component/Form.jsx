import { useEffect, useState } from "react";
import { postMethod, putMethod } from "../Api/ApiData";


const Form = ({data,setData, updatedData,setUpdatedData }) =>{

    const [newData,setNewData]=useState({
        title:"",
        body:"",
    })

    let empty = Object.keys(updatedData).length === 0;

    const handleChange=(e)=>{ 
        let name = e.target.name;
        let value = e.target.value;
        setNewData({...newData,[name]:value})
    }

   

   const postData = async () => {

 
    if (!newData.title.trim() || !newData.body.trim()) {
        alert("Please fill all fields");
        return; 
    }

    let res = await postMethod(newData);

    if (res.status === 201) {
        setData([...data, res.data]);
        setNewData({ title: "", body: "" });
    }
};


     const updatePost=async()=>{
      try {
         let res = await putMethod(updatedData.id, newData)
        console.log(res);
        setData((elem)=>{
            return elem.map((curElem)=>{
                return curElem.id == updatedData.id ? res.data : curElem;
            })
        })
        setNewData({ title: "", body: "" });
        setUpdatedData({});
        
      } catch (error) {
        console.log(error);
        
      }
        
    }

    const submitHandle=(e)=>{
        e.preventDefault()
        const action = e.nativeEvent.submitter.value;
        if (action === "Add") {
        postData();
        }else if (action === "Update") {
            updatePost();
        }
        
        // updatePost();
      
      return;

    }

    useEffect(()=>{
        updatedData && 
        setNewData({
            title:updatedData.title || "",
            body:updatedData.body || ""
        })
    },[updatedData])

 

    return(
       <form className="form-tag" onSubmit={submitHandle}>
            <div>
                <label htmlFor="title"></label>
                <input type="text" autoComplete="off" name="title" id="title" placeholder="Add Title" value={newData.title} onChange={handleChange}  />
            </div>
              <div>
                <label htmlFor="body"></label>
                <input type="text" autoComplete="off" name="body" id="body" placeholder="Add Paragraph" value={newData.body} onChange={handleChange} />
            </div>
            <button className="btn" value={empty ? "Add" : "Update"}>
                {empty ? "Add" : "Update"}
            </button>
       </form>
    )
}
export default Form;