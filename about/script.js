document.addEventListener('DOMContentLoaded', function() {
  // 为优化卡片添加动画效果
  const optimizationCards = document.querySelectorAll('.optimization-card');
  optimizationCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // 为大脑卡片添加动画效果
  const brainCards = document.querySelectorAll('.brain-card');
  brainCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 500 + index * 200);
  });

  // 为大脑卡片添加悬停效果
  brainCards.forEach(card => {
    const processIcon = card.querySelector('.process-icon');
    card.addEventListener('mouseenter', () => {
      processIcon.style.transition = 'transform 0.5s ease';
      processIcon.style.transform = 'rotate(180deg)';
    });
    card.addEventListener('mouseleave', () => {
      processIcon.style.transform = 'rotate(0deg)';
    });
  });

  // 为特性列表项添加动画效果
  const features = document.querySelectorAll('.features li');
  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      feature.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      feature.style.opacity = '1';
      feature.style.transform = 'translateX(0)';
    }, 800 + index * 100);
  });
}); 