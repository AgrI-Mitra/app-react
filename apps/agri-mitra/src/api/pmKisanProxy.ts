import axios from 'axios';

const pmKisanProxy = (endpoint: string, data: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PM_KISAN_BASE_URL}/${endpoint}`;
      const config = {
        maxBodyLength: Infinity,
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      return axios.post(url, data, config);
  } catch (error) {
    console.error(error);
  }
}

export default pmKisanProxy;