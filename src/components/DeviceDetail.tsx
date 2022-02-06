import '../styles/DeviceDetail.scss';
import { ISmartDeviceDetails } from '../App';
import { SmartDevice } from './SmartDevice';
import ColorInfo from './ColorInfo';
import TurnedOnInfo from './TurnedOnInfo';


interface IDeviceDetailProps { 
  device: ISmartDeviceDetails
}

export default function DeviceDetail( { device } : IDeviceDetailProps ) {

    return (
      <div className="container" >
        <SmartDevice device={device} handleItemClick={ () => {} } />

        {device.connectionState === 'disconnected' 
          ? <div>Brak połączenia</div>
          :
        <div className="details">
          <div className="header">Szczegóły:</div>

            {device.type === 'temperatureSensor' && 
            <div className="params">Temperatura: {device.temperature}°C</div>}

            {device.type === 'outlet' && 
            <div className="params">
              <TurnedOnInfo isTurnedOn={device.isTurnedOn} />
              <div>Zużycie energii: {device.powerConsumption}W</div>
            </div>}

            {device.type === 'bulb' && 
            <div className="params">
              <TurnedOnInfo isTurnedOn={device.isTurnedOn} />
              <div>Jasność: {device.brightness}%</div>
              <ColorInfo color={device.color} />
            </div>}

        </div>
}
      </div>
    );
  }