import React, { Suspense } from 'react'
import styled from 'styled-components'
import welcomeData from '../../WelcomeData.json'
import { CardWelcome } from './CardWelcome/CardWelcome'
import { motion } from 'framer-motion'
import { Spin } from 'antd'
import { uiImage } from '../../../../templates/system/FormattedValue/ui/uiImage'
import Features from '../Features/Features'
import Testimonials from '../Testimonials/Testimonials'

// Lazy loading de componentes pesados
const ImageGallery = React.lazy(() => import('../../../../component/ImageGallery/ImageGallery').then(module => ({ default: module.ImageGallery })))

const Body = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MainContent>
        <HeroSection
          as={motion.div}
          variants={sectionVariants}
        >
          <CardWelcome welcomeData={welcomeData} />
        </HeroSection>
        
        <GallerySection
          as={motion.div}
          variants={sectionVariants}
        >
          <h2 className="gallery-title">Conoce nuestro sistema</h2>
          <Suspense fallback={
            <LoadingContainer>
              <Spin size="large" tip="Cargando galería..." />
            </LoadingContainer>
          }>
            <ImageGallery images={uiImage} />
          </Suspense>
        </GallerySection>
      </MainContent>
      
      {/* Nuevas secciones fuera del contenedor principal para full-width */}
      <FeaturesSection
        as={motion.div}
        variants={sectionVariants}
      >
        <Features />
      </FeaturesSection>

      {/* <TestimonialsSection
        as={motion.div}
        variants={sectionVariants}
      >
        <Testimonials />
      </TestimonialsSection> */}
    </Container>
  )
}

export default Body

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 140px); // Ajustar por header y footer
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  overflow-x: hidden;
`

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`

const HeroSection = styled.div`
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`

const GallerySection = styled.div`
  margin-bottom: 40px;
  
  .gallery-title {
    text-align: center;
    margin-bottom: 40px;
    color: var(--color-text-primary, #262626);
    font-size: 2rem;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 30px;
    }
  }
`

const FeaturesSection = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`

const TestimonialsSection = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  flex-direction: column;
  gap: 16px;
  
  .ant-spin-text {
    color: var(--color-text-secondary, #666);
    font-size: 16px;
  }
`