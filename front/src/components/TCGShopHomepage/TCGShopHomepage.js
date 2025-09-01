import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  IconButton,
  Fade,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  ArrowBackIos, 
  ArrowForwardIos, 
  FiberManualRecord, 
  Menu as MenuIcon,
  Store,
  Campaign,
  Inventory,
  LocationOn
} from '@mui/icons-material';

// Header 컴포넌트
const Header = ({ currentSection, sections, onSectionChange, onMobileMenuOpen }) => (
  <AppBar position="static" sx={{ backgroundColor: 'white', color: 'text.primary', boxShadow: 1 }}>
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 3 } }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 0.5, sm: 1 }, minHeight: { xs: '48px', sm: '64px' } }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary',
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' },
            fontSize: { xs: '1rem', sm: '1.5rem' }
          }}
          onClick={() => onSectionChange('메인')}
        >
          CARD BASE
        </Typography>
        
        {/* 데스크톱 네비게이션 */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {sections.map((section) => (
            <Button
              key={section}
              onClick={() => onSectionChange(section)}
              sx={{
                color: currentSection === section ? 'primary.main' : 'text.primary',
                fontWeight: currentSection === section ? 'bold' : 'normal',
                borderBottom: currentSection === section ? 2 : 0,
                borderColor: 'primary.main',
                borderRadius: 0,
                '&:hover': { color: 'primary.main' },
                fontSize: '0.875rem',
                px: 2,
                py: 1
              }}
            >
              {section}
            </Button>
          ))}
        </Box>

        {/* 모바일 햄버거 메뉴 */}
        <IconButton
          sx={{ display: { xs: 'block', md: 'none' }, color: 'text.primary' }}
          onClick={onMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </Container>
    <Divider sx={{ borderColor: 'primary.light', borderWidth: 1 }} />
  </AppBar>
);

// 모바일 메뉴 컴포넌트
const MobileMenu = ({ open, onClose, onSectionChange }) => {
  const menuItems = [
    { text: '소개', icon: <Store />, section: '소개' },
    { text: '공지', icon: <Campaign />, section: '공지' },
    { text: '취급상품', icon: <Inventory />, section: '취급상품' },
    { text: '찾아오시는 길', icon: <LocationOn />, section: '찾아오시는 길' }
  ];

  const handleMenuClick = (section) => {
    onSectionChange(section);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 280,
          bgcolor: 'background.paper'
        }
      }}
    >
      <Box sx={{ pt: 2, pb: 1 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => handleMenuClick(item.section)}
                sx={{ 
                  py: 2,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      fontSize: '0.95rem',
                      fontWeight: 'medium'
                    }
                  }}
                />
                <Box sx={{ color: 'text.secondary', fontSize: '1.2rem' }}>
                  ›
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

// Footer 컴포넌트
const Footer = () => (
  <Box component="footer" sx={{ backgroundColor: '#424242', color: 'white', mt: 6 }}>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          CARD BASE
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          최고의 TCG 경험을 제공하는 전문 매장
        </Typography>
      </Box>
    </Container>
  </Box>
);

// 이미지 슬라이더 컴포넌트
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <Box sx={{ mb: 4, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <Box sx={{ position: 'relative', height: { xs: 200, sm: 280, md: 400 }, backgroundColor: '#f5f5f5' }}>
        {images.map((image, index) => (
          <Fade key={index} in={index === currentIndex} timeout={1000}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: index === currentIndex ? 'block' : 'none'
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`슬라이드 이미지 ${index + 1}`}
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
              />
            </Box>
          </Fade>
        ))}
        
        <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
          {images.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                p: 0,
                width: 12,
                height: 12,
                color: index === currentIndex ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)',
                '&:hover': { color: 'rgba(0,0,0,0.6)' }
              }}
            >
              <FiberManualRecord sx={{ fontSize: 12 }} />
            </IconButton>
          ))}
        </Box>

        <IconButton
          onClick={() => goToSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: 'rgba(0,0,0,0.7)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={() => goToSlide(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: 'rgba(0,0,0,0.7)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

// 소개 섹션 컴포넌트
const IntroSection = ({ onClick }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', cursor: 'pointer' }} onClick={onClick}>
      소개
    </Typography>
    <Paper elevation={1} sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h6" sx={{ textAlign: 'center', lineHeight: 1.8, color: 'text.secondary' }}>
        CARD BASE는 최고의 TCG 경험을 제공하는 전문 매장입니다. 
        다양한 카드게임과 관련 상품을 만나보실 수 있습니다.
      </Typography>
    </Paper>
  </Box>
);

// 공지사항 아이템 컴포넌트
const NoticeItem = ({ title, date, category }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: { xs: 1, sm: 2 }, 
    cursor: 'pointer', 
    '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' }, 
    p: 1, 
    borderRadius: 1,
    width: '100%',
    maxWidth: 600,
    justifyContent: 'flex-end'
  }}>
    <Box sx={{ flex: 1, textAlign: 'right' }}>
      <Typography variant="body1" sx={{ 
        fontWeight: 'medium', 
        mb: 0.5,
        fontSize: { xs: '0.85rem', sm: '1rem' },
        lineHeight: 1.3
      }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <Box sx={{ 
          backgroundColor: '#FFD700', 
          color: 'white', 
          px: { xs: 0.5, sm: 1 }, 
          py: 0.2, 
          borderRadius: 1, 
          fontSize: { xs: '0.6rem', sm: '0.7rem' },
          fontWeight: 'bold'
        }}>
          {category}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
          {date}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ 
      width: { xs: 50, sm: 60 }, 
      height: { xs: 35, sm: 40 }, 
      backgroundColor: '#f0f0f0', 
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
        이미지
      </Typography>
    </Box>
  </Box>
);

// 공지사항 섹션 컴포넌트
const NoticeSection = ({ onClick }) => {
  const notices = [
    { title: 'TV 애니메이션 "텐죠의 사쿠나히메" 콜라보 카페 개최 결정!', date: '2024/9/26', category: '이벤트' },
    { title: '「너의 옆 니치로 님」콜라보 카페 개최 결정!', date: '2024/7/1', category: '이벤트' },
    { title: '아틀라스 페스 개최 기념 「아틀라스 브랜드 35주년 콜라보 카페」', date: '2024/5/17', category: '이벤트' }
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ 
        display: 'flex', 
        width: '100%', 
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Box sx={{ 
          width: { xs: '100%', md: '25%' }, 
          pr: { xs: 0, md: 2 }, 
          mb: { xs: 2, md: 0 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
            }}
            onClick={onClick}
          >
            공지사항
          </Typography>
        </Box>
        <Box sx={{ 
          width: { xs: '100%', md: '75%' }, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          alignItems: { xs: 'stretch', md: 'flex-end' }
        }}>
          {notices.map((notice, index) => (
            <NoticeItem key={index} {...notice} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// 취급상품 아이템 컴포넌트
const ProductItem = ({ title, subtitle, gradient }) => (
  <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 }, height: '100%', width: '100%' }}>
    <Box sx={{
      height: 160,
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'white', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          px: 1,
          fontSize: { xs: '0.8rem', sm: '1rem', md: '1.25rem' }
        }}
      >
        {title}
      </Typography>
    </Box>
    <CardContent sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'medium',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' }
        }}
      >
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

// 취급상품 섹션 컴포넌트
const ProductSection = ({ onClick }) => {
  const products = [
    { title: '포켓몬 카드', subtitle: '포켓몬 TCG', gradient: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)' },
    { title: '유희왕', subtitle: '유희왕 카드', gradient: 'linear-gradient(45deg, #667eea, #764ba2)' },
    { title: '매직 더 개더링', subtitle: 'MTG 카드', gradient: 'linear-gradient(45deg, #f093fb, #f5576c)' },
    { title: '디지몬 카드', subtitle: '디지몬 TCG', gradient: 'linear-gradient(45deg, #4facfe, #00f2fe)' }
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, cursor: 'pointer', fontSize: { xs: '1.5rem', sm: '2rem' } }} onClick={onClick}>
        취급상품
      </Typography>
      <Box sx={{ 
        width: '100%', 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        {products.map((product, index) => (
          <Box key={index} sx={{ 
            width: { xs: '100%', sm: '25%' }, 
            padding: { xs: 0, sm: '0 4px' }
          }}>
            <ProductItem {...product} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// 찾아오시는 길 섹션 컴포넌트
const LocationSection = ({ onClick }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, cursor: 'pointer' }} onClick={onClick}>
      찾아오시는 길
    </Typography>
    <Box sx={{ 
      display: 'flex', 
      width: '100%', 
      gap: 4,
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'stretch'
    }}>
      <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex' }}>
        <Paper elevation={1} sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>매장 정보</Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 0.5 }}>주소</Typography>
            <Typography variant="body2" color="text.secondary">서울시 강남구 테헤란로 123, 2층</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 0.5 }}>전화번호</Typography>
            <Typography variant="body2" color="text.secondary">02-1234-5678</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 0.5 }}>영업시간</Typography>
            <Typography variant="body2" color="text.secondary">평일 10:00 - 22:00<br />주말 10:00 - 20:00</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 0.5 }}>교통편</Typography>
            <Typography variant="body2" color="text.secondary">지하철 2호선 강남역 3번 출구 도보 5분</Typography>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex' }}>
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: { xs: 250, md: 0 }
          }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>매장 위치 지도</Typography>
            <Box sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'error.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>📍</Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  </Box>
);

// 메인 컴포넌트
const TCGShopHomepage = () => {
  const [currentSection, setCurrentSection] = useState('메인');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sections = ['소개', '공지', '취급상품', '찾아오시는 길'];
  
  const slideImages = [
    'https://via.placeholder.com/800x300/87CEEB/ffffff?text=Image+1',
    'https://via.placeholder.com/800x300/98FB98/ffffff?text=Image+2',
    'https://via.placeholder.com/800x300/87CEFA/ffffff?text=Image+3'
  ];

  const renderContent = () => {
    switch (currentSection) {
      case '소개':
        return '저희 CARD BASE에 오신 것을 환영합니다.';
      case '공지':
        return '현재 공지사항이 없습니다.';
      case '취급상품':
        return '다양한 TCG 카드를 취급하고 있습니다.';
      case '찾아오시는 길':
        return '매장 위치 안내입니다.';
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Header 
        currentSection={currentSection}
        sections={sections}
        onSectionChange={setCurrentSection}
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
      />

      <MobileMenu 
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSectionChange={setCurrentSection}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
          {currentSection === '메인' ? (
            <>
              <ImageSlider images={slideImages} />
              <IntroSection onClick={() => setCurrentSection('소개')} />
              <NoticeSection onClick={() => setCurrentSection('공지')} />
              <ProductSection onClick={() => setCurrentSection('취급상품')} />
              <LocationSection onClick={() => setCurrentSection('찾아오시는 길')} />
            </>
          ) : (
            <>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {currentSection}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {renderContent()}
              </Typography>
            </>
          )}
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default TCGShopHomepage;