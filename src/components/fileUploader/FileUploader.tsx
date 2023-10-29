import React, { Fragment } from "react"
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileUploaderProps from "./FileUploaderProps";

const FileUploader: React.FC <FileUploaderProps> = ({callback, name, multiple}) => {
    const fireUploadEvent = () => {
        const fileInput = document.getElementById('file-input');
    
        if (!fileInput) {
          return false
        }
    
        fileInput.click();
      }
    
      const handleFile = async (file: any) => {
        return new Promise(async (resolve, reject) => {
          const reader = new FileReader();
    
          reader.onload = function (event: any) {
            const base64String = event.target.result;
            resolve(base64String)
          };
      
          await reader.readAsDataURL(file);
    
        })
      }
    
      const upload = async () => {
        const fileInput: HTMLElement | null = document.getElementById('file-input');
    
        if (!fileInput) {
          return false
        }
    
        if (fileInput instanceof HTMLInputElement) {
          const uploader = fileInput.files
    
          if (uploader && uploader.length > 0) {
            const files = []

            for(let i = 0; i < uploader.length; i++) {
                const fileBase64 = await handleFile(uploader[0])
                const body = {
                  file: fileBase64,
                  mimeType: uploader[0].type
                }

                files.push(body)
            }

            callback(files)
          }
        }
      }

    return (
        <Fragment>
            <Button style={{width: '100%'}} variant="contained" onClick={fireUploadEvent} size="medium">
            <FileUploadIcon/>
                { name }
            </Button>
            <input multiple={multiple} onChange={upload} hidden type="file" id="file-input" accept=".jpg, .jpeg, .png" />
        </Fragment>
    )
}

export default FileUploader