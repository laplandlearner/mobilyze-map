// Define type for each location
export type CustomLocation = {
  id: number,
  latlng: {
    lat: number,
    lng: number,
  }
}

// Define props type for LocationList component
export interface LocationListProps {
  locations: CustomLocation[];
  onRemoveLocation: (param: number) => void;
  setSidebar: (param: boolean) => void;
}

// Define props type for LocationItem component
export interface LocationItemProps {
  location: CustomLocation;
  onRemoveLocation: (param: number) => void;
}

// Define props type for MapEvents component
export interface MapEventsProps {
  onAddLocation: (latlng: any) => void;
}
