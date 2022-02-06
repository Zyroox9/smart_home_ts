import '../styles/TurnedOnInfo.scss';

import { AiFillCheckCircle } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im';

export default function TurnedOnInfo( { isTurnedOn } : { isTurnedOn: boolean } ) {

    return (

        <div className="turned-on-info">
            <div>W użyciu:</div> {isTurnedOn ? <AiFillCheckCircle /> : <ImCancelCircle />}
        </div>

    );
  }