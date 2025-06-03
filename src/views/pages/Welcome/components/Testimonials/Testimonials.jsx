import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Card, Row, Col, Typography, Rate, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import welcomeData from '../../WelcomeData.json'

const { Title, Paragraph, Text } = Typography;

const Testimonials = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <TestimonialsSection
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <Container>
        <HeaderSection
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title level={2} style={{ textAlign: 'center', color: 'white', marginBottom: '1rem' }}>
            Lo que dicen nuestros clientes
          </Title>
          <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem', color: '#e2e8f0' }}>
            Miles de empresarios confían en Ventamax para hacer crecer sus negocios
          </Paragraph>
        </HeaderSection>

        <Row gutter={[32, 32]} justify="center">
          {welcomeData.testimonials.map((testimonial, index) => (
            <Col xs={24} lg={12} key={testimonial.id}>
              <TestimonialCard
                variants={item}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  style={{
                    height: '100%',
                    border: 'none',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  bodyStyle={{
                    padding: '32px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >                  <QuoteIcon>
                    <FontAwesomeIcon icon={faQuoteLeft} />
                  </QuoteIcon>
                  
                  <div>
                    <Rate 
                      disabled 
                      defaultValue={testimonial.rating} 
                      style={{ 
                        marginBottom: '20px',
                        fontSize: '18px',
                        color: '#faad14'
                      }} 
                    />
                    
                    <TestimonialText>
                      "{testimonial.comment}"
                    </TestimonialText>
                  </div>

                  <CustomerInfo>                    <Avatar 
                      size={48} 
                      icon={<FontAwesomeIcon icon={faUser} />} 
                      style={{ 
                        background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                        marginRight: '16px'
                      }} 
                    />
                    <div>
                      <CustomerName>{testimonial.name}</CustomerName>
                      <BusinessName>{testimonial.business}</BusinessName>
                    </div>
                  </CustomerInfo>
                </Card>
              </TestimonialCard>
            </Col>
          ))}
        </Row>

        <CTASection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CTACard>
            <Title level={3} style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
              ¿Listo para transformar tu negocio?
            </Title>
            <Paragraph style={{ textAlign: 'center', color: '#e2e8f0', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Únete a más de 10,000 empresarios que ya confían en Ventamax
            </Paragraph>
            <CTAButtons>
              <PrimaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {welcomeData.cta.primary}
              </PrimaryButton>
              <SecondaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {welcomeData.cta.trial}
              </SecondaryButton>
            </CTAButtons>
          </CTACard>
        </CTASection>
      </Container>
    </TestimonialsSection>
  );
};

// Styled Components
const TestimonialsSection = styled(motion.section)`
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.1"/></svg>') repeat;
    background-size: 100px 100px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const HeaderSection = styled(motion.div)`
  margin-bottom: 80px;
`;

const TestimonialCard = styled(motion.div)`
  height: 100%;
  cursor: pointer;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 32px;
  color: #e2e8f0;
  opacity: 0.6;
`;

const TestimonialText = styled(Paragraph)`
  font-size: 1.1rem !important;
  line-height: 1.6 !important;
  color: #374151 !important;
  font-style: italic;
  margin-bottom: 24px !important;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const CustomerName = styled(Text)`
  font-weight: 600 !important;
  font-size: 1rem !important;
  color: #1f2937 !important;
  display: block;
`;

const BusinessName = styled(Text)`
  color: #64748b !important;
  font-size: 0.9rem !important;
`;

const CTASection = styled(motion.div)`
  margin-top: 80px;
`;

const CTACard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 48px 32px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1f2937;
  border: none;
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export default Testimonials;
