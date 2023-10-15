function Input(props)
{
return <input className="mx-3"
name={props.name}

type= {props.type}  placeholder={props.placeholder} 
onChange={props.onChange}

/>
}
 export default Input