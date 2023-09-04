/* eslint-disable @next/next/no-img-element */
import { DragEvent, useEffect, useState } from 'react';
import classes from './SharedImageUpload.module.scss';
import { Divider, Grid, Typography } from '@mui/material';
import { SharedIf } from '../SharedIf';
import { getFilePreviewURL } from '@/utils/uploadUtils';
import { SharedGridBreak } from '../grid/SharedGridBreak';
import { SharedUploadFile } from '../form/SharedUploadFile';
import { SharedOutlinedContainer } from '../grid/SharedOutlinedContainer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { SharedButton } from '../SharedButton';
import { SharedGridContainer } from '@/features/shared/grid/SharedGridContainer';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import clsx from 'clsx';
import { func } from 'prop-types';

interface SharedImageUploadProps {
  name?: string;
  previewUrl?: string | null;
  label: string;
  noPreview?: boolean;
  externalLink?: string | null;
  useExternalLink?: boolean;
  onChange?: (name: string, file: File | null) => void;
  onPreviewUrlChange?: (previewUrl: string | null) => void;
  onExternalLinkChange?: (externalLink: string | null) => void;
}

export const SharedImageUpload = (props: SharedImageUploadProps) => {
  const { previewUrl, name, label, useExternalLink, externalLink } = props;
  const { onChange, noPreview, onPreviewUrlChange, onExternalLinkChange } = props;

  const [useExternalLinkState, setUseExternalLinkState] = useState<boolean>(!!externalLink);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setImage(previewUrl ?? null);
  }, [previewUrl]);

  useEffect(() => {
    if (externalLink) setUseExternalLinkState(true);
  }, [externalLink]);

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    onChange?.(name ?? '', file);
    if (noPreview) return;
    setImage(await getFilePreviewURL(file));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setImage(null);
    onChange?.(name ?? '', null);
    onPreviewUrlChange?.(null);
  };

  async function handleUploadImage(file: File, previewUrl: string) {
    onChange?.(name ?? '', file);
    if (noPreview) return;
    onPreviewUrlChange?.(previewUrl);
    setImage(previewUrl);
  }

  function handleUseExternalLinkChange(value: boolean) {
    setUseExternalLinkState(value);
    if (value) {
      handleRemoveImage();
    } else {
      onExternalLinkChange?.(null);
    }
  }

  return (
    <SharedOutlinedContainer style={{ aspectRatio: '16/9', width: '100%', height: '100%', marginBottom: '20px' }} label={label}>
      <SharedGridContainer centerX={false} spacing={0} mb={0}>
        <SharedIf If={useExternalLink}>
          <SharedGridSwitch
            gridItemProps={{ className: 'u-text--align-start u-ml--1 u-mb--3' }}
            label={'Use External Link'}
            value={useExternalLinkState}
            onChange={handleUseExternalLinkChange}
          />
        </SharedIf>

        <SharedIf If={useExternalLinkState}>
          <SharedGridItem item xs={12}>
            <SharedTextField label={'External URL'} value={externalLink ?? ''} onChange={(e) => onExternalLinkChange?.(e.target.value)} />
          </SharedGridItem>
        </SharedIf>

        <SharedIf If={useExternalLink}>
          <SharedGridItem className={'u-pb--5'} xs={12}>
            <Divider />
          </SharedGridItem>
        </SharedIf>

        <Grid item xs={12} style={{ position: 'relative' }}>
          <div className={classes.dropzone}>
            <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} style={{ aspectRatio: '16/9', width: '100%', height: '100%' }}>
              <Grid style={{ height: '100%' }} container alignContent={'center'}>
                <Grid style={{ height: image || externalLink ? '100%' : 'auto' }} item xs={12}>
                  <SharedIf If={useExternalLinkState ? externalLink : image}>
                    <img src={useExternalLinkState ? externalLink ?? '' : (image as string)} alt="Uploaded" className={classes.image} />
                    <div className={clsx(classes.overlay, classes.overlayFull)}>
                      <SharedButton onClick={handleRemoveImage} btnType={'Icon'}>
                        <DeleteForeverIcon style={{ fontSize: '30px' }} />
                      </SharedButton>
                    </div>
                  </SharedIf>

                  <SharedIf If={useExternalLinkState && !externalLink}>
                    <div className={clsx('u-center--x u-center--y u-flex--column u-full-height')}>
                      <ImageNotSupportedOutlinedIcon style={{ fontSize: '50px', color: 'gray' }} />
                      <SharedGridBreak />
                      <Typography className={'u-mt--2'}>Please provide an external URL</Typography>
                    </div>
                  </SharedIf>

                  <SharedIf If={!image && !useExternalLinkState}>
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
        </Grid>
      </SharedGridContainer>
    </SharedOutlinedContainer>
  );
};
