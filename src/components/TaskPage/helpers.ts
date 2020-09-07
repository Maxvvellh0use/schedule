import { EventData } from '../types';

export async function getRawContent(url: string) {
  try {
    const res = await fetch(transformLinkToRawContent(url));
    const data = await res.text();
    console.log(data)
    return data;
  } catch (e) {
    console.error(e);
  }   
}

export function isMarkdown(url: string): boolean {
  const FILE_EXTENSION_LENGTH = 3;
  return url.slice(-FILE_EXTENSION_LENGTH) === '.md';
}

export function transformLinkToRawContent(url: string): string {
  return url.replace("github.com", "raw.githubusercontent.com").replace('/blob', '');
}

export function getCoordinates(eventObj: EventData | undefined): any{
  const COORDS_COUNT = 2;

  if (eventObj?.optional.place === 'online') return undefined;
  const supposedCoords = eventObj?.optional.place.split(' ').map((item) => +item);
  if (
    Array.isArray(supposedCoords)
    && supposedCoords.length === COORDS_COUNT
    && supposedCoords.every((item) => !isNaN(item))
  ) return supposedCoords
  else return undefined;
}