import React, {useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';

export default function DeviceInfoComponent() {
  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const uniqueId = await DeviceInfo.getUniqueId();
      const deviceModel = DeviceInfo.getModel();
      const deviceBrand = DeviceInfo.getBrand();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();

      console.log('Unique ID:', uniqueId);
      console.log('Model:', deviceModel);
      console.log('Brand:', deviceBrand);
      console.log('OS:', systemName);
      console.log('OS Version:', systemVersion);
    };

    fetchDeviceInfo();
  }, []);

  return null;
}
