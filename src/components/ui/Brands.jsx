"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import Image from 'next/image';

const brandsData = [
    { alt: "Brand-1", img: "/brands/brand-1.webp" },
    { alt: "Brand-2", img: "/brands/brand-2.webp" },
    { alt: "Brand-3", img: "/brands/brand-3.webp" },
];

const Brands = () => {
    // Common Configuration
    const commonConfig = {
        allowTouchMove: true,
        simulateTouch: true,
        slidesPerView: 1.5,
        spaceBetween: 20,
        loop: true,
        freeMode: true,
        speed: 8000, // Adjusted speed for better brand visibility
        modules: [FreeMode],
        breakpoints: {
            1200: { slidesPerView: 6 },
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
        },
    };

    return (
        <section id="brands" className="brand-bg">
            <div className="container">
                <div className="section-title">
                    <div className="title-icon">Brand Collaborations & Stories</div>
                    <div className="about-heading">Brands I've Collaborated With</div>
                </div>
                <div className="slider-brands">
                    <Swiper
                        {...commonConfig}
                        className="brand-swiper smooth-swiper"
                    >
                        {[...brandsData, ...brandsData, ...brandsData].map((item, index) => (
                            <SwiperSlide key={`row1-${index}`}>
                                <div className="brand-card">
                                    <Image src={item.img} alt={item.alt} width={500} height={500} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Brands;
