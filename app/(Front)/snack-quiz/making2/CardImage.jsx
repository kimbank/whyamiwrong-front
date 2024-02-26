"use client";

import React from 'react';
import axios from 'axios';
import {
  styled,
  Card,
  CardMedia,
  CardActions,
  Fab,
  Button,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { CloudUploadRounded, DeleteForeverRounded } from "@mui/icons-material";

import Loading from "@/components/loading";


const ImageUpload = ({ imgBase64String }) => {
  const [base64String, setBase64String] = React.useState('');
  const [promtData, setPromtData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(',')[1]; // base64 부분만 추출
        console.log(base64[2]);
        setBase64String(base64);
        // 여기서 API 요청을 보낼 수 있습니다.
        // 예: sendToApi(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div>
        <span>
          {promtData}
        </span>
        <Button variant="contained" onClick={() => sendToApi(base64String)}>제출하기</Button>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            image={`data:image/jpeg;base64,${imgBase64String}`}
            sx={{ display: 'flex', height: '140px', alignItems: 'center', justifyContent: 'center' }}
          >
            {base64String === '' &&
              <Fab component="label" color="primary" aria-label="add">
                <CloudUploadRounded />
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Fab>
            }
          </CardMedia>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {base64String !== '' &&
              <IconButton onClick={() => setBase64String('')} component="label" variant="contained" color="error">
                <DeleteForeverRounded />
              </IconButton>
            }
          </CardActions>
        </Card>
      </div>
    </>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default ImageUpload;
