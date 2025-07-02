import styled from 'styled-components'
import TitleSection from '../components/home/Title/Index'
import BestSection from '../components/home/Section1'
import NewSection from '../components/home/Section2'
import ComingSoonSection from '../components/home/Section3'
import Banner from '../components/home/Banner'
import Footer from '../components/common/Footer'
import Aside from '../components/common/Aside'

const Home = () => {
  return (
    <div className="home-wrapper">
      <TitleSection />
      <SectionsWrapper>
        <Banner/>
        <BestSection />
        <NewSection />
        <ComingSoonSection />
      </SectionsWrapper>
      <Footer />
      <Aside />
    </div>
  )
}

const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 130px;
  margin-bottom: 120px;
`

export default Home