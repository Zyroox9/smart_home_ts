import '../styles/DeviceList.scss';
import { SmartDevice, ISmartDevice } from './SmartDevice';


interface IDeviceListProps {
  devices: Array<ISmartDevice>, 
  handleItemClick: Function
}


export default function DeviceList( { devices, handleItemClick } : IDeviceListProps) {
    return (
      <div className="device-list">
          {devices && devices.map( device => <SmartDevice key={device.id} device={device} handleItemClick={handleItemClick} />)}
      </div>
    );
  }