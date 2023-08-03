/* eslint-disable @next/next/no-img-element */
import { DragEvent, useEffect, useState } from 'react';
import classes from './SharedImageUpload.module.scss';
import { Button, Grid } from '@mui/material';
import { SharedIf } from '../SharedIf';
import { getFilePreviewURL } from '@/utils/uploadUtils';
import { SharedGridBreak } from '../grid/SharedGridBreak';
import { SharedUploadFile } from '../form/SharedUploadFile';
import { SharedOutlinedContainer } from '../SharedOutlinedContainer';

interface SharedImageUploadProps {
  name: string;
  previewUrl?: string;
  onChange?: (name: string, file: File) => void;
}

export const SharedImageUpload = ({ onChange, previewUrl, name }: SharedImageUploadProps) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setImage(previewUrl ?? null);
  }, [previewUrl]);

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    setImage(await getFilePreviewURL(file));
    onChange?.(name, file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  async function handleUploadImage(file: File, previewUrl: string) {
    onChange?.(name, file);
    setImage(previewUrl);
  }

  return (
    <SharedOutlinedContainer style={{ aspectRatio: '16/9', width: '100%', height: '100%', marginBottom: '20px' }} centerText={true} label={'Drag Image'}>
      <div>
        <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} style={{ aspectRatio: '16/9', width: '100%', height: '100%' }}>
          <Grid style={{ height: '100%' }} container alignContent={'center'}>
            <Grid style={{ height: image ? '100%' : 'auto' }} item xs={12}>
              <SharedIf RIf={!!image}>
                <img src={image as string} alt="Uploaded" className={classes.image} />
                <Button onClick={handleRemoveImage}>Remove Image</Button>
              </SharedIf>

              <SharedIf RIf={!image}>
                <span>Drag and drop an image here</span>
                <SharedGridBreak />
                <span>or</span>
                <SharedGridBreak />
                <SharedUploadFile onChange={handleUploadImage} />
              </SharedIf>
            </Grid>
          </Grid>
        </div>
      </div>
    </SharedOutlinedContainer>
  );
};
