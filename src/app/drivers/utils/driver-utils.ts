import { NAME_TO_ISO } from '../../shared/nationalities';

export function getIsoFromGpName(gpName: string, countryName?: string): string {
  if (countryName && NAME_TO_ISO[countryName]) {
    return NAME_TO_ISO[countryName];
  }

  const cleanName = gpName.replace(" Grand Prix", "").trim();

  if (NAME_TO_ISO[cleanName]) {
    return NAME_TO_ISO[cleanName];
  }

  const firstWord = cleanName.split(' ')[0];
  if (NAME_TO_ISO[firstWord]) {
    return NAME_TO_ISO[firstWord];
  }

  return 'xx';
}
