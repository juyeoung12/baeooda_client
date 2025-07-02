import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeHeader from './HomeHeader';
import Title from './Title';
import Category from './Category';


const TitleSection = () => {
  return (
      <TitleContainer>
        <HomeHeader />
        <Title />
        <Category />
      </TitleContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
`;

export default TitleSection;
