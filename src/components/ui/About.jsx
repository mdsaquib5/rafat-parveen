import Image from "next/image";

const About = () => {
    return (
        <section id="about">
            <div className="container">
                <div className="about-main">
                    <div className="about-content">
                        <div className="section-title">
                            <div className="title-icon">About Me</div>
                            <div className="about-heading">Lifestyle • Aviation • Beauty • Travel Content Creator</div>
                        </div>
                        <p>A lifestyle and aviation content creator passionate about creating aesthetic, relatable, and engaging short-form content. As a cabin crew professional, I bring a unique blend of travel, beauty, fashion, and everyday lifestyle experiences into my content. My audience connects with authentic storytelling, calm visuals, relatable emotions, and natural product integrations.</p>
                        <div className="story-slider">
                            <div className="story-img">
                                <Image src="/story-1.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-2.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story1-3.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-4.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-5.webp" alt="story" width={640} height={800} priority />
                            </div>
                            <div className="story-img">
                                <Image src="/story-6.webp" alt="story" width={640} height={800} priority />
                            </div>
                        </div>
                    </div>
                    <div className="about-img">
                        <Image src="/rafat-main.webp" alt="main-story" width={640} height={640} priority />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;