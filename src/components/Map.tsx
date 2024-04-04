import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, addLocation, removeLocation } from '../store/locationSlice';
import 'leaflet/dist/leaflet.css';
import { MapEventsProps, CustomLocation } from '../utils/type';
import LocationList from './LocationList';
import Dialog from './Dialog';

// LocationMarkers component to render markers on the map
const LocationMarkers: React.FC<{ locations: CustomLocation[] }> = ({ locations }) => {
  return (
    <>
      {locations.map((location: any) => (
        <Marker key={location.id} position={location.latlng}>
          <Popup>
            Latitude: {location.latlng.lat} <br />
            Longitude: {location.latlng.lng}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

// Map component
const Map: React.FC = () => {
  // Get locations from Redux store
  const locations = useSelector((state: RootState) => state.locations.data);
  const dispatch = useDispatch();
  const [data, setData] = useState<CustomLocation[]>([]);
  // Initial position for the map
  const initialPos: any = [51.505, -0.09];
  const [sidebar, setSidebar] = useState<boolean>(false);
  // Dialog states to remove Item
  const [dialog, setDialog] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [removalID, setRemovalID] = useState<number>(0);
  // Click Add button
  const [addFlag, setAddFlag] = useState(false);

  // Function to generate unique IDs
  const uniqId = () => Math.floor(new Date().getTime());

  // Callback function to handle adding a new location
  const handleAddLocation = (latlng: any) => {
    // Create a new location object with a unique ID
    const newLocation = { id: uniqId(), latlng };
    if (!addFlag) {
      setData([...data, newLocation]);
      setAddFlag(true);
    } else {
      setData([...data.slice(0, data.length - 1), newLocation]);
    }
  };

  const handleRemoveLocation = (id: number) => {
    setRemovalID(id);
    setDialog(true);
  };

  // Add new location only when the user clicks the add button
  const addNewLocation = () => {
    // Dispatch addLocation action with the new location
    if (addFlag) {
      dispatch(addLocation(data[data.length - 1]));
      setAddFlag(false);
    }
  };

  // MapEvents component to handle map events
  const MapEvents: React.FC<MapEventsProps> = ({ onAddLocation }) => {
    // useMapEvents hook to handle map events
    const map = useMapEvents({
      // Handle click event on the map
      click(e) {
        onAddLocation(e.latlng); // Call onAddLocation callback with clicked coordinates
      },
    });

    return null; // MapEvents component does not render anything
  };

  // Set state when locations change
  useEffect(() => {
    setData(locations);
  }, [locations]);

  useEffect(() => { // when user confirms the action to remove location
    if (confirm && removalID > 0) dispatch(removeLocation(removalID));
    // Reset states
    setConfirm(false);
    setDialog(false);
    setRemovalID(0);
  }, [confirm]);

  useEffect(() => { // Dispatch data to store
    const savedData = localStorage.getItem('locations');
    if (savedData) {
      dispatch(setLocation(JSON.parse(savedData)));
    }
  }, [dispatch]);

  return (
    <div>
      <div className='fixed top-2 right-2 z-[1000]'>
        <button
          className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => addNewLocation()}
        >
          Add
        </button>
        <button
          onClick={() => setSidebar(true)}
          className="rounded-md ml-2 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          List
        </button>
      </div>
      <MapContainer
        center={initialPos}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkers locations={data} /> {/* Render LocationMarkers component */}
        <MapEvents onAddLocation={handleAddLocation} /> {/* Render MapEvents component */}
      </MapContainer>
      {
        sidebar ?
          <LocationList
            locations={locations}
            onRemoveLocation={handleRemoveLocation}
            setSidebar={setSidebar}
          /> : null
      }
      {dialog ? <Dialog setConfirm={setConfirm} setDialog={setDialog} /> : null}
    </div>
  );
};

export default Map;
