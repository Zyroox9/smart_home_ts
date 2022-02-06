import { useState, useEffect } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import DeviceList from './components/DeviceList';
import { ISmartDevice } from './components/SmartDevice';
import { Modal } from './components/Modal';
import DeviceDetail from './components/DeviceDetail';
import axiosInstance from './Axios';

const ws = new WebSocket("ws://61fea676a58a4e00173c9950.mockapi.io/api/v1/refresh");


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
        isModalOpen: true
      }})
    }
  };

  useEffect(() => {
    getDevices();
}, [])


  return (
    <div className="App">
      <Navbar />

      <DeviceList devices={state.devices} handleItemClick={handleItemClick} />

      {state.isModalOpen && 
      <Modal closeModal={ () => setState( prevState => {return {...prevState, isModalOpen: false}})}> 
        <DeviceDetail device={state.detailItem} />
      </Modal>}
      

    </div>
  );
}

