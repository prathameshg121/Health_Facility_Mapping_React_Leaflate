import React,{useState} from "react";

export default function DataInRadius (){

    const [coOrdinates, setcoOrdinates] = useState({
        latiude :"",
        longitude :""
    })

    function handleClik(event){
        
        
    }


    return(
        <div>
      <form>
  <div class="form-group">
    <label >latitude</label>
    <input  class="form-control"  aria-describedby="emailHelp" placeholder="latitude" name="latiude" />
 
  </div>
  <div class="form-group">
    <label >longitude</label>
    <input  class="form-control" id="exampleInputPassword1" placeholder="longitude" name="longitude" />
    <button type="submit" style={{width:"100px"}} onClick={handleClik} class="btn btn-primary">Find </button>
  </div>

</form>
<br/>
         
        </div>
    )
}