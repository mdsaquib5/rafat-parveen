const comments = [
    "Honestly, your flight vlogs and cabin crew aesthetic are next level! ✈️✨ Keep shining with such gorgeous content 🌸👏",
    "The way you capture the life of a cabin crew member is so engaging 🛫💫 Truly love seeing your travel diaries! 🌍💖",
    "Loved your beauty hacks and aviation styling tips! 💄✨ You bring real elegance and authenticity 🌟💯",
    "Your styling advice and cabin crew grace are so professional! ✈️✨ Really impressed with your aesthetic 👏💖",
    "Outstanding work on the latest travel collaborations! 👜❤️ Your media presence and style are truly inspiring 💫🛫",
    "Every vlog you share feels so calm, fresh, and aesthetic 🌴✈️ Keep growing and sharing your journey! 🚀✨",
    "Such a confident and elegant showcase of the skies! ✈️💖 Your reels keep the audience fully connected 📺✨",
    "Your travel content always feels so premium and authentic 🌸✨ Truly one of the best lifestyle creators! 💫👏",
    "Brilliant product collaborations and amazing camera confidence! 📸🔥 You bring such elegant charm to everything 💖✨",
    "Loved the way you showed the cabin crew beauty routine! 💯✨ Your presentation and tips are amazing ✈️💄"
]

const Comments = () => {
    return (
        <section className="comments-bg">
            <div className="container">
                <div className="comments">
                    {comments.map((comment, index) => (
                        <div className="comment-box" key={index}>
                            <p>{comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Comments;