export function convertGoogleDriveLink(gDriveLink: string): string | null {
  if (gDriveLink.includes('/file/d/') && gDriveLink.includes('/view')) {
    const fileIDStart = gDriveLink.indexOf('/file/d/') + '/file/d/'.length;
    const fileIDEnd = gDriveLink.indexOf('/view');

    if (fileIDStart !== -1 && fileIDEnd !== -1) {
      const fileID = gDriveLink.substring(fileIDStart, fileIDEnd);
      return `https://drive.google.com/uc?export=view&id=${fileID}`;
    }
  }

  return gDriveLink;
}
