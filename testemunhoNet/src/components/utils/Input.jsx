import "./input.css";

const Input = (Props) =>{
    return(
        <input type={`${Props.tipo ? Props.tipo: "text"}`} 
            className={`form-control ${Props.filled ? "filled": ""}`} 
            placeholder={Props.placeHolder ? Props.placeHolder: ""} 
            aria-label="Username" 
            aria-describedby="basic-addon1"
            onChange={Props.change}
            value={Props.value}/>
    );
}

export default Input;