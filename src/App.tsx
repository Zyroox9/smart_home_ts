import { useState, useEffect } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import DeviceList from './components/DeviceList';
import { ISmartDevice } from './components/SmartDevice';
import { Modal } from './components/Modal';
import DeviceDetail from './components/DeviceDetail';
import axiosInstance from './Axios';


interface ISmartBulb {
  type: 'bulb';
  id: string;
  name: string;
  connectionState: 'connected' | 'disconnected' | 'poorConnection';
  isTurnedOn: boolean;
  brightness: number;
  color: string;
}

interface ISmartOutlet {
  type: 'outlet';
  id: string;
  name: string;
  connectionState: 'connected' | 'disconnected' | 'poorConnection';
  isTurnedOn: boolean;
  powerConsumption: number;
}

interface ISmartTemperatureSensor {
  type: 'temperatureSensor';
  id: string;
  name: string;
  connectionState: 'connected' | 'disconnected' | 'poorConnection';
  temperature: number;
}

export type ISmartDeviceDetails = ISmartBulb | ISmartOutlet | ISmartTemperatureSensor

interface IState {
  isModalOpen: boolean,
  detailItem: ISmartDeviceDetails,
  devices: Array<ISmartDevice>
}


export function App() {
  const [state, setState] = useState<IState>({
    isModalOpen: false,
    devices: [],
    detailItem: {} as ISmartDeviceDetails
  });

  async function getDevices() {
    const response = await axiosInstance.get(`devices`);

    if (response.status === 200) {
      setState( prevState => {  return {
        ...prevState, 
        devices: response.data
      }})
    }
  };

  async function handleItemClick( device: ISmartDeviceDetails ) {
    const response = await axiosInstance.get(`devices/${device.id}`);

    if (response.status === 200) {
      
      setState( prevState => {  return {
        ...prevState, 
        detailItem: response.data,
        isModalOpen: true,
      }})

    }
  };

  function connectWS () {
    const ws = new WebSocket("wss://api-smart-home.herokuapp.com/api/v1/refresh")

      ws.onmessage = (event: any) => {
        const updatedItem: ISmartDeviceDetails = JSON.parse(event.data);
        console.log(updatedItem)

        setState( prevState => { return { 
          ...prevState, 
          devices: prevState.devices.map( device => { 
            return device.id !== updatedItem.id ? device 
              : { 
                type: updatedItem.type,
                id: updatedItem.id,
                name: updatedItem.name,
                connectionState: updatedItem.connectionState
              }
          }),
          detailItem: updatedItem.id === prevState.detailItem.id ? updatedItem : prevState.detailItem 
        }})
      }
  }


  useEffect(() => {
    getDevices();
    connectWS();
  }, [])

  return (
    <div className="App">
      <Navbar />

      <DeviceList devices={state.devices} handleItemClick={handleItemClick} />

      {state.isModalOpen && 
      <Modal closeModal={ () => { setState( prevState => { return {...prevState, isModalOpen: false}})}}> 
        <DeviceDetail device={state.detailItem} />
      </Modal>}
      

    </div>
  );
}

