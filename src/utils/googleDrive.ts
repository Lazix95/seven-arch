export function convertGoogleDriveLink(gdriveLink: string): string | null {
  // Check if the input link contains "/file/d/" and "/view" indicating it's a typical sharing link.
  if (gdriveLink.includes('/file/d/') && gdriveLink.includes('/view')) {
    // Extract the file ID from the link.
    const fileIDStart = gdriveLink.indexOf('/file/d/') + '/file/d/'.length;
    const fileIDEnd = gdriveLink.indexOf('/view');

    if (fileIDStart !== -1 && fileIDEnd !== -1) {
      const fileID = gdriveLink.substring(fileIDStart, fileIDEnd);
      // Construct the direct image link.
      const directLink = `https://drive.google.com/uc?export=view&id=${fileID}`;
      return directLink;
    }
  }

  // If the input link doesn't match the expected format, return null.
  return null;
}
