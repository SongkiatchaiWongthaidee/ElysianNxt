import React from 'react';
import styled from '@emotion/styled';
import { useURLShortener } from '../logic/UrlLogic.js';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  padding: 40px;
  background: radial-gradient(circle at 30% 20%, #f5e0b5 0%, #c7a676 35%, #8b5a2b 100%);
  background-attachment: fixed;
  color: #3e2c15;
  letter-spacing: 1px;
  text-align: center;
  box-shadow:
    inset 0 0 100px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(139, 90, 43, 0.4);
  border: 6px solid rgba(60, 30, 10, 0.5);
  border-radius: 20px;
  position: relative;
  max-height: 70%;
`;

const InputSection = styled.div`
  min-width: 80%;
  background: 
    linear-gradient(135deg, #faf6f0 0%, #f5f0e8 100%),
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 163, 115, 0.02) 10px, rgba(212, 163, 115, 0.02) 20px);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 
    0 8px 20px rgba(93, 64, 55, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 30px;
  border: 2px solid #d4a373;
  position: relative;
  animation: slideInFromTop 0.5s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(93, 64, 55, 0.01) 1px,
      rgba(93, 64, 55, 0.01) 2px
    );
    pointer-events: none;
    border-radius: 12px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 50px;
  padding: 0 16px;
  font-size: 0.9rem;
  color: #2e4600;
  background: linear-gradient(135deg, #d9f5c8 0%, #b7e3a1 100%);
  border: 3px solid #5a7d3f;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.15),
    0 4px 6px rgba(72, 104, 46, 0.2);

  &:focus {
    background: linear-gradient(135deg, #c8f7b3 0%, #9bd98b 100%);
    border-color: #74b35b;
    box-shadow:
      0 0 12px rgba(116, 179, 91, 0.5),
      inset 0 2px 3px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }

  &::placeholder {
    color: #4a5f35;
    opacity: 0.7;
  }

  &:hover {
    background: linear-gradient(135deg, #c8f3ad 0%, #a8e28a 100%);
  }

  &:disabled {
    background: linear-gradient(135deg, #b5c8a2 0%, #a0b18d 100%);
    border-color: #7a926d;
    color: #6e8260;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const Button = styled.button`
  flex-shrink: 0; 
  height: 50px;
  padding: 0 15px;
  margin-bottom: 3px;
  background: linear-gradient(160deg, #8b5a2b 0%, #a97142 50%, #6f4221 100%);
  color: #f8e5b6;
  border: 2px solid #5c3419;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(60, 30, 10, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  box-shadow:
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    0 6px 0 #4b2a14,
    0 6px 8px rgba(0, 0, 0, 0.3);

  background-image:
    repeating-linear-gradient(
      25deg,
      rgba(0, 0, 0, 0.05) 0px,
      rgba(0, 0, 0, 0.05) 2px,
      transparent 2px,
      transparent 6px
    ),
    linear-gradient(160deg, #8b5a2b 0%, #a97142 50%, #6f4221 100%);

  &:hover {
    background: linear-gradient(160deg, #9c6531 0%, #b97c46 50%, #7a4925 100%);
    transform: translateY(-2px);
    box-shadow:
      inset 0 2px 4px rgba(255, 255, 255, 0.15),
      0 8px 0 #4b2a14,
      0 10px 10px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(2px);
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      0 3px 0 #4b2a14;
  }

  &:disabled {
    background: linear-gradient(160deg, #7c644a 0%, #6b533d 100%);
    color: #c8b9a1;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.08),
      transparent 70%
    );
    opacity: 0.5;
    pointer-events: none;
  }
`;

const ResultSection = styled.div`
  background: 
    linear-gradient(135deg, #e8f3e8 0%, #dcedc8 100%),
    repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(107, 142, 35, 0.03) 5px, rgba(107, 142, 35, 0.03) 10px);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  border-left: 4px solid #6b8e23;
  box-shadow: 0 4px 12px rgba(107, 142, 35, 0.15);
  animation: fadeInScale 0.5s ease-out;
  position: relative;
  overflow: hidden;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent 30%, rgba(107, 142, 35, 0.1) 50%, transparent 70%);
    animation: shimmer 3s infinite;
    border-radius: 8px;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const ResultLabel = styled.div`
  font-weight: 600;
  color: #4a5f2a;
  margin-bottom: 10px;
  animation: slideInLeft 0.5s ease-out;

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ShortUrlDisplay = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ShortUrl = styled.a`
  flex: 1;
  padding: 12px;
  background: 
    linear-gradient(to bottom, #fff9f0 0%, #fffbf5 100%);
  border: 2px solid #6b8e23;
  border-radius: 6px;
  color: #d4772f;
  text-decoration: none;
  word-break: break-all;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212, 119, 47, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(to bottom, #f5f0e8 0%, #f0e8dc 100%);
    transform: translateX(3px);
    box-shadow: 
      -3px 0 8px rgba(107, 142, 35, 0.2),
      inset 0 1px 2px rgba(255, 255, 255, 0.5);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateX(1px);
  }
`;

const CopyButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #6b8e23 0%, #5a7a1a 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 
    0 3px 6px rgba(107, 142, 35, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #7a9f2a 0%, #6b8e23 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 5px 10px rgba(107, 142, 35, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 
      0 2px 4px rgba(107, 142, 35, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active::after {
    width: 200px;
    height: 200px;
  }
`;

const UrlList = styled.div`
  background: 
    linear-gradient(135deg, #faf6f0 0%, #f5f0e8 100%),
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 163, 115, 0.02) 10px, rgba(212, 163, 115, 0.02) 20px);
  border-radius: 12px;
  box-shadow: 
    0 8px 20px rgba(93, 64, 55, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 2px solid #d4a373;
  animation: fadeInUp 0.6s ease-out;
  position: relative;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(93, 64, 55, 0.01) 1px,
      rgba(93, 64, 55, 0.01) 2px
    );
    pointer-events: none;
    border-radius: 12px;
  }
`;

const ListTitle = styled.h2`
  color: #5d4037;
  font-size: 1.5rem;
  margin-bottom: 20px;
  animation: fadeInDown 0.5s ease-out;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #d4772f 0%, #6b8e23 100%);
    border-radius: 2px;
    animation: expandWidth 0.8s ease-out 0.3s backwards;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes expandWidth {
    from {
      width: 0;
    }
    to {
      width: 60px;
    }
  }
`;

const UrlItem = styled.div`
  border: 2px solid #d4a373;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: 
    linear-gradient(135deg, #fff9f0 0%, #fffbf5 100%);
  box-shadow: 0 2px 8px rgba(212, 163, 115, 0.15);
  animation: slideInRight 0.5s ease-out backwards;
  position: relative;
  overflow: hidden;

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:nth-of-type(1) { animation-delay: 0.1s; }
  &:nth-of-type(2) { animation-delay: 0.2s; }
  &:nth-of-type(3) { animation-delay: 0.3s; }
  &:nth-of-type(4) { animation-delay: 0.4s; }
  &:nth-of-type(5) { animation-delay: 0.5s; }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(180deg, #d4772f 0%, #6b8e23 100%);
    transform: scaleY(0);
    transition: transform 0.4s ease;
    transform-origin: bottom;
  }

  &:hover {
    transform: translateX(8px);
    box-shadow: 
      -4px 0 12px rgba(212, 119, 47, 0.2),
      0 4px 15px rgba(212, 163, 115, 0.3);
    border-color: #d4772f;
  }

  &:hover::before {
    transform: scaleY(1);
  }
`;

const UrlItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const UrlLabel = styled.div`
  font-size: 0.85rem;
  color: #8d6e63;
  font-weight: 600;
  margin-bottom: 5px;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  ${UrlItem}:hover & {
    color: #5d4037;
    transform: translateX(2px);
  }
`;

const UrlValue = styled.div`
  color: #5d4037;
  word-break: break-all;
  transition: color 0.3s ease;

  ${UrlItem}:hover & {
    color: #3e2723;
  }
`;

const OriginalUrl = styled(UrlValue)`
  flex: 1;
`;

const ShortCode = styled.a`
  color: #d4772f;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 15px;
  background: linear-gradient(135deg, #f5e6d3 0%, #e8d5b7 100%);
  border-radius: 6px;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  box-shadow: 0 2px 4px rgba(212, 163, 115, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #e8d5b7 0%, #d4a373 100%);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(212, 163, 115, 0.3);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(0) scale(1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px 95px;
  color: #a1887f;
  animation: fadeIn 0.8s ease-out, float 3s ease-in-out infinite;
  overflow: hidden;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  & > div:first-of-type {
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #5d4037;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 8px;

  &::before {
    content: '🌿';
    position: absolute;
    left: -12px;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateX(-10px);
  }

  &:hover::before {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Main Component
function URLShortener() {
  const {
    longUrl,
    setLongUrl,
    baseUrl,
    setBaseUrl,
    urls,
    latestShortUrl,
    copied,
    handleShorten,
    handleCopy
  } = useURLShortener();

  return (
    <Container>
      <InputSection>
        <div>
          <InputLabel>Base URL for shortened links:</InputLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Base URL (e.g., https://yourdomain.com or http://localhost:3000)"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </InputGroup>
        </div>
        <div style={{ marginTop: '20px' }}>
          <InputLabel>Long URL to shorten:</InputLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Enter your long URL here (e.g., https://example.com/very/long/path)"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleShorten()}
            />
            <Button onClick={handleShorten}>
              Shorten URL
            </Button>
          </InputGroup>
        </div>

        {latestShortUrl && (
          <ResultSection>
            <ResultLabel>Here your shortened URL!</ResultLabel>
            <ShortUrlDisplay>
              <ShortUrl href={latestShortUrl} target="_blank" rel="noopener noreferrer">
                {latestShortUrl}
              </ShortUrl>
              <CopyButton onClick={() => handleCopy(latestShortUrl)}>
                {copied ? '✓ Copied!' : 'Copy'}
              </CopyButton>
            </ShortUrlDisplay>
          </ResultSection>
        )}
      </InputSection>

      {urls.length > 0 && (
        <UrlList>
          <ListTitle>Your Shortened URLs ({urls.length})</ListTitle>
          {urls.map((url) => (
            <UrlItem key={url.id}>
              <UrlItemRow>
                <div style={{ flex: 1 }}>
                  <UrlLabel>ORIGINAL URL</UrlLabel>
                  <OriginalUrl>{url.longUrl}</OriginalUrl>
                </div>
              </UrlItemRow>
              <UrlItemRow>
                <div style={{ flex: 1 }}>
                  <UrlLabel>SHORT URL</UrlLabel>
                  <ShortCode href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                    {url.shortUrl}
                  </ShortCode>
                </div>
                <CopyButton onClick={() => handleCopy(url.shortUrl)}>
                  Copy
                </CopyButton>
              </UrlItemRow>
              <UrlLabel style={{ marginTop: '10px' }}>
                Created: {url.createdAt}
              </UrlLabel>
            </UrlItem>
          ))}
        </UrlList>
      )}

      {urls.length === 0 && (
        <UrlList>
          <EmptyState>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔗</div>
            <div>
              No shortened URLs yet. <br />
              Create your first one above!
            </div>
          </EmptyState>
        </UrlList>
      )}
    </Container>
  );
}

export default URLShortener;