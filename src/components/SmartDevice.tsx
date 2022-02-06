import '../styles/SmartDevice.scss';
import { ISmartDeviceDetails } from '../App';

import Zarowka from '../images/Zarowka.svg';
import Gniazdko from '../images/Gniazdko.png';
import Termometr from '../images/Termometr.svg';

export interface ISmartDevice {
  type: 'bulb' | 'outlet' | 'temperatureSensor';
  id: string;
  name: string;
  connectionState: 'connected' | 'disconnected' | 'poorConnection';
}

interface ISmartDeviceProps {
  device: ISmartDevice | ISmartDeviceDetails,
  handleItemClick: Function
}

export function SmartDevice( { device, handleItemClick } : ISmartDeviceProps ) {

    return (
      <div className="item" onClick={ () => handleItemClick(device) }>
          <img src={ device.type === 'bulb' ? Zarowka : ( device.type === 'outlet' ? Gniazdko : Termometr )} alt="ikona" className="icon" />

          <div className={"connection-state " + device.connectionState}/>

          <div className="item-name">
            {device.name}
          </div>
      </div>
    );
  }