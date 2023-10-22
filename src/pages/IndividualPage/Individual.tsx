import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useImageUpload from '@Pages/IndividualPage/hooks/useImageUpload';
import People from '@Assets/icons/People';
import color from '@Styles/color';
import Down from '@Assets/icons/Down';
import PreArrow from '@Assets/icons/PreArrow';
import sampleImg from './image.png';
import backgroundImg from './backgroundImg.png';
import axios from 'axios';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ROUTES_PATH } from '@Constants/routes';


const BASE_URL = 'https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app/user/albums';

type AlbumPhotos = {
  createdDate: string;
  modifiedDate: string;
  id: number;
  imageUrl: string;
  likes: number;
}


const Individual = () => {
  const {albumId} = useParams();
  const navigate = useNavigate();

  const {file, imgURL, selectImg, onSubmit, isImgUpload, stickerPhoto} = useImageUpload();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const [isImgonSubmit, setIsImgonSubmit] = useState(false);

  const initialPhoto = {
    createdDate: 'string',
    modifiedDate: 'string',
    id: 0,
    imageUrl: sampleImg,
    likes: 0
  };
  const [albumPhotos, setAlbumPhotos] = useState<AlbumPhotos[]>([initialPhoto]);
  const handleImgClick = () => {
    imgUploadInput.current?.click();
  };

  const swiper = useSwiper();


  useEffect(() => {
    fetch();
  }, []);


  const fetch = () => {
    axios
    .get(`${BASE_URL}/${albumId}`)
    .then((res) => {
      const {data} = res;
      console.log(data.data);
      console.log(albumPhotos);

      setAlbumPhotos(prevState => [...prevState, ...data.data]);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handlePhotoClick = (photoId: number, index: number) => {
    if (index === 0) {
      console.log(photoId);
      handleImgClick();
    } else {
      navigate(`${ROUTES_PATH.decoration}/${photoId}`);
    }

  };

  return (
    <DefaultLayout>
    <Layout>
      <Header>
        <Link to="hello" onClick={() => console.log('뒤로가기!')}>
          <LeftBtn>
            <PreArrow color={color.gray[700]}></PreArrow>
          </LeftBtn>
        </Link>

        <RightBtn>
          {isImgUpload ? (
            <>
              <DownIcon isUploaded color={color.gray[700]}/>
              <People color={color.gray[700]}/>
            </>
          ) : (
            <>
              <DownIcon color={color.gray[400]}/>
              <People color={color.gray[700]}/>
            </>
          )}
        </RightBtn>
      </Header>
      <Content>
        {/*<input*/}
        {/*  type="file"*/}
        {/*  accept="image/*"*/}
        {/*  required*/}
        {/*  ref={imgUploadInput}*/}
        {/*  onChange={selectImg}*/}
        {/*  style={{display: 'none'}}*/}
        {/*/>*/}

        {/*{isImgUpload ? <>*/}
        {/*  <SampleImg src={imgURL}/>*/}
        {/*  <Button onClick={handleImgClick}>사진 선택</Button>*/}
        {/*  <Button onClick={onSubmit}>사진 업로드 </Button>*/}
        {/*</> : <Swiper*/}
        {/*  modules={[Navigation, Pagination]}*/}
        {/*  spaceBetween={10}*/}
        {/*  slidesPerView={1}*/}
        {/*  centeredSlides={true}*/}
        {/*>*/}
        {/*  {albumPhotos?.map((photos, index) => (*/}
        {/*    <SwiperSlide*/}
        {/*      key={photos.id}*/}
        {/*      onClick={() => handlePhotoClick(photos.id, index)}*/}
        {/*    >*/}
        {/*      <img src={photos.imageUrl}/>*/}
        {/*    </SwiperSlide>*/}
        {/*  ))}*/}
        {/*</Swiper>}*/}
      </Content>
      <Footer>
        <Button>꾸미기</Button>

      </Footer>

      {/*<PlusLikeBtn></PlusLikeBtn>*/}

      {/*<BtnWrap>*/}
      {/*  {!isImgUpload && <Button onClick={handleImgClick}>사진 선택</Button>}*/}

      {/*  {isImgUpload && <Button onClick={onSubmit}>사진 업로드</Button>}*/}

      {/*  {isUploaded && !isUploaded && (*/}
      {/*    <Button>*/}
      {/*      <Link to="/" onClick={() => console.log('꾸미기!')}>*/}
      {/*        꾸미기*/}
      {/*      </Link>*/}
      {/*    </Button>*/}
      {/*  )}*/}
      {/*</BtnWrap>*/}

    </Layout>
    </DefaultLayout>
  );
};

const DefaultLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: antiquewhite;
  min-height: 100vh;

`;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;



const Header = styled.div`
  width: 100%;
  height: 52px;
  padding: 10px 17px 10px 21px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 100%;
  height: 450px;
  background-color: #f6f6f6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 21px;
  margin-bottom: 70px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  color: ${color.btn};
  background-color: ${color.primary};
  border-radius: 8px;
  font-size: 20px;
`;
const None = styled.div`
  /* width: 375px; */
  height: 44px;
  background-color: white;
`;

const LeftBtn = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;

const DownIcon = styled(Down)<{ isUploaded?: boolean }>`
  color: ${(props) => (props.isUploaded ? color.gray[700] : color.gray[400])};

  &:hover {
    cursor: ${(props) => (props.isUploaded ? 'pointer' : 'default')};
    color: ${(props) => (props.isUploaded ? color.gray[600] : color.gray[400])};
  }
`;

const RightBtn = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-right: 80px;

  &:hover {
    cursor: pointer;
  }

  ${DownIcon}:hover {
    cursor: default;
  }
`;



const Info = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
`;

const SampleImg = styled.img`
  display: flex;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0px auto;

  &:hover {
    cursor: pointer;
  }
`;

const PlusLikeBtn = styled.div`
  width: 375px;
  height: 56px;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BtnWrap = styled.div`
  /* width: 375px;
  height: 126px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgUpload = styled.img`
  width: 80%;
`;

const ImgInput = styled.input`
  display: none;
`;

export default Individual;
