import './Picture.css';


export default function Picture(props){

    return(
        <div>
        {!props.theUrl && <p>Loading...</p>}
        {props.theUrl && <img src={props.theUrl} className="ChangeSize" />}
        </div>

    );
}