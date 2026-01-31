import React, { useState } from 'react';
import styled from 'styled-components';

const ServiceButton = ({ 
  children, 
  icon, 
  onClick, 
  variant = 'primary',
  size = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick && onClick(e);
  };

  return (
    <ButtonWrapper
      variant={variant}
      size={size}
      isHovered={isHovered}
      isClicked={isClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <span>{children}</span>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  
  /* Size variations */
  ${({ size }) => {
    switch(size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 14px;
          border-radius: 8px;
        `;
      case 'large':
        return `
          padding: 16px 32px;
          font-size: 18px;
          border-radius: 12px;
        `;
      default:
        return `
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 10px;
        `;
    }
  }}

  /* Variant styles */
  ${({ variant, isHovered, isClicked }) => {
    const baseStyles = `
      background: white;
      color: #333;
      border: 2px solid;
    `;

    const shadows = `
      /* Base shadow layer */
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        inset 0 0 0 1px rgba(255, 255, 255, 0.5);
      
      /* Hover shadow enhancement */
      ${isHovered ? `
        box-shadow: 
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05),
          0 0 0 3px rgba(var(--primary-rgb), 0.1),
          inset 0 0 0 1px rgba(255, 255, 255, 0.8);
      ` : ''}
      
      /* Click animation */
      ${isClicked ? `
        transform: scale(0.98);
        box-shadow: 
          0 2px 4px -1px rgba(0, 0, 0, 0.1),
          0 1px 2px -1px rgba(0, 0, 0, 0.06),
          inset 0 0 0 2px rgba(var(--primary-rgb), 0.2);
      ` : ''}
    `;

    switch(variant) {
      case 'primary':
        return `
          ${baseStyles}
          --primary-rgb: 59, 130, 246;
          border-color: rgb(var(--primary-rgb));
          color: rgb(var(--primary-rgb));
          ${shadows}
          &:hover {
            background: rgba(var(--primary-rgb), 0.05);
          }
        `;
      case 'secondary':
        return `
          ${baseStyles}
          --primary-rgb: 107, 114, 128;
          border-color: rgb(var(--primary-rgb));
          color: rgb(var(--primary-rgb));
          ${shadows}
          &:hover {
            background: rgba(var(--primary-rgb), 0.05);
          }
        `;
      case 'success':
        return `
          ${baseStyles}
          --primary-rgb: 34, 197, 94;
          border-color: rgb(var(--primary-rgb));
          color: rgb(var(--primary-rgb));
          ${shadows}
          &:hover {
            background: rgba(var(--primary-rgb), 0.05);
          }
        `;
      case 'gradient':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          position: relative;
          
          &::before {
            content: '';
            position: absolute;
            top: 1px;
            left: 1px;
            right: 1px;
            bottom: 1px;
            background: white;
            border-radius: inherit;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: inherit;
            z-index: -1;
          }
          
          span {
            position: relative;
            z-index: 1;
          }
          
          ${shadows}
          
          ${isHovered ? `
            &::before {
              opacity: 0.1;
            }
          ` : ''}
        `;
      default:
        return `
          ${baseStyles}
          --primary-rgb: 59, 130, 246;
          border-color: #e5e7eb;
          ${shadows}
          &:hover {
            border-color: rgb(var(--primary-rgb));
            background: rgba(var(--primary-rgb), 0.02);
          }
        `;
    }
  }}

  /* Animation for the border glow */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: inherit;
    border: 2px solid transparent;
    background: linear-gradient(45deg, 
      rgba(59, 130, 246, 0.5),
      rgba(147, 51, 234, 0.5),
      rgba(239, 68, 68, 0.5)
    ) border-box;
    -webkit-mask: 
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  ${({ isHovered }) => isHovered && `
    &::after {
      opacity: 1;
    }
  `}

  /* Active state */
  &:active {
    transform: translateY(1px);
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  transition: transform 0.3s ease;
  
  ${ButtonWrapper}:hover & {
    transform: scale(1.1);
  }
`;

// Usage examples
const ServicesSection = () => {
  const services = [
    { label: 'Web Design', variant: 'primary', icon: '🎨' },
    { label: 'Development', variant: 'secondary', icon: '💻' },
    { label: 'Marketing', variant: 'success', icon: '📈' },
    { label: 'Premium', variant: 'gradient', icon: '⭐' }
  ];

  return (
    <ServicesContainer>
      <SectionTitle>Our Services</SectionTitle>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceButton
            key={index}
            variant={service.variant}
            icon={service.icon}
            onClick={() => console.log(`Clicked ${service.label}`)}
          >
            {service.label}
          </ServiceButton>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

const ServicesContainer = styled.div`
  padding: 40px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export { ServiceButton, ServicesSection };
export default ServiceButton;