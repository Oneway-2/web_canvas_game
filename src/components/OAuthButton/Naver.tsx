import React from 'react';
import { ButtonContainer, OAuthButtonProps } from './';

export const NaverOAuthButton: React.FunctionComponent<OAuthButtonProps> = ({ onClick }) => {
  return (
    <ButtonContainer color={'#1ec800'} title={'#ffffff'} onClick={onClick}>
      <svg version="1.1" id="naver" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
        <polygon
          className="logo"
          fill="#ffffff"
          points="115.9,145.8 83.7,98.4 83.7,145.8 50,145.8 50,54.3 84.2,54.3 116.4,101.6 116.4,54.3    150,54.3 150,145.8 115.9,145.8"
        />
      </svg>
      <span className="title">네이버 로그인</span>
    </ButtonContainer>
  );
};
