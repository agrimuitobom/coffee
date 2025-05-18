/**
 * メニュー開閉の制御
 * フルスクリーンメニューの表示・非表示を切り替える
 */
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const menu = document.getElementById('menu');

// メニューを開く
menuOpen.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden'; // スクロールを無効化
});

// メニューを閉じる
menuClose.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.style.overflow = 'auto'; // スクロールを有効化
});

/**
 * ヘッダースクロールエフェクト
 * ページがスクロールされたときにヘッダーの見た目を変更
 */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/**
 * スムーズスクロール
 * ページ内リンクがクリックされたときに、滑らかにスクロールする
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // メニューが開いていれば閉じる
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

/**
 * 画像の遅延読み込み (Lazy Loading)
 * ページのパフォーマンスを向上させるため、画像を必要なタイミングで読み込む
 */
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // IntersectionObserverをサポートしていないブラウザ用のフォールバック
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

/**
 * フェードインアニメーション
 * 要素がビューポートに入ったときにフェードインさせる
 */
const setupFadeInAnimation = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => fadeObserver.observe(element));
    } else {
        // IntersectionObserverをサポートしていないブラウザ用のフォールバック
        fadeElements.forEach(element => element.classList.add('visible'));
    }
};

/**
 * ページ読み込み完了時に各機能を初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    setupFadeInAnimation();
});

// 画像の遅延読み込み (Lazy Loading)
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Product Gallery (製品ギャラリー)
const setupProductGallery = () => {
    const productThumbnails = document.querySelectorAll('.product-thumbnail');
    const productMainImage = document.querySelector('.product-main-image');
    
    if (productThumbnails.length > 0 && productMainImage) {
        productThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                productThumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');
                
                // Update main image
                productMainImage.src = thumbnail.dataset.image;
                productMainImage.alt = thumbnail.dataset.alt || '';
            });
        });
    }
};

// フェードインアニメーション
const setupFadeInAnimation = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => fadeObserver.observe(element));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        fadeElements.forEach(element => element.classList.add('visible'));
    }
};

// スライドショー
const setupSlideshow = () => {
    const slideshow = document.querySelector('.slideshow');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slideshow-prev');
    const nextButton = document.querySelector('.slideshow-next');
    
    if (slideshow && slides.length > 0) {
        let currentSlide = 0;
        
        // 初期状態
        slides[currentSlide].classList.add('active');
        
        // 次のスライドに移動
        const goToNextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        
        // 前のスライドに移動
        const goToPrevSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        
        // イベントリスナーを設定
        if (nextButton) {
            nextButton.addEventListener('click', goToNextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', goToPrevSlide);
        }
        
        // 自動スライドショー（オプション）
        /* 
        const slideshowInterval = setInterval(goToNextSlide, 5000);
        
        // ユーザーがスライドショーと相互作用した場合、自動再生を停止
        slideshow.addEventListener('mouseenter', () => {
            clearInterval(slideshowInterval);
        });
        */
    }
};

// ページ読み込み完了時に各機能を初期化
document.addEventListener('DOMContentLoaded', () => {
    setupProductGallery();
    setupFadeInAnimation();
    setupSlideshow();
});
