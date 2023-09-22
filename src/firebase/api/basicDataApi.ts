import { getDocument } from '../utils/firebaseDocumentUtils';
import { ExternalImage, FirebaseImage, getImageLink } from '../utils/firebaseImageUtils';

export async function fetchBasicInfo(): Promise<DataBasicInfo> {
  const basicInfo = await getDocument<DataBasicInfo['basicInfo']>('general', 'basicInfo');
  const basicInfoImages = { loadingScreenImage: await getImageLink({ folder: 'general', name: 'loadingScreenImage' }) };
  return { basicInfo, basicInfoImages };
}

export interface DataBasicInfo {
  readonly basicInfo: { companyName: string };
  readonly basicInfoImages: { loadingScreenImage: FirebaseImage | ExternalImage | null };
}
