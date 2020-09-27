import {IP_TOKEN, IP_INFO_URL} from './consts';

export default async function getCurrentCoordinates() {
  const urlGeo = `${IP_INFO_URL}${IP_TOKEN}`;
  const resGeo = await fetch(urlGeo, {
    method: 'GET',
    mode: 'cors',
    referrerPolicy: 'no-referrer',
  });
  const response = await resGeo.json();
  return response.loc.split(',').map((e:string) => +e).reverse();
}