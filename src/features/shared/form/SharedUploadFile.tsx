import { getFilePreviewURL } from "@/utils/uploadUtils";
import { Button } from "@mui/material";

interface SharedUploadFileProps {
  label?: string;
  onChange?: (file: File, previewUrl: string) => void;
}

export function SharedUploadFile({ label = "Upload", onChange }: SharedUploadFileProps) {
  async function handleOnChangeUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const url = await getFilePreviewURL(file);
      return onChange?.(file, url);
    }
  }

  return (
    <Button variant="outlined" component="label">
      <span>{label}</span>
      <input onChange={handleOnChangeUpload} type="file" hidden />
    </Button>
  );
}
