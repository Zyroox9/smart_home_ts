import '../styles/ColorInfo.scss';


export default function ColorInfo( { color } : { color: string } ) {

    return (

        <div className="color-info">
            <div>Kolor: {color}</div> 
            <div className="color-bar" style={{ backgroundColor: color }}></div>
        </div>

    );
  }