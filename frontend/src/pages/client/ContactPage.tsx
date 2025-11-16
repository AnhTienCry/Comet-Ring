import type { ReactElement } from 'react';

const ContactPage = (): ReactElement => {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container contact-hero__content">
          <h1>Kết Nối Với Chúng Tôi</h1>
          <p>
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Đừng ngần ngại liên hệ với Comet Ring để
            được tư vấn và hỗ trợ tốt nhất.
          </p>
        </div>
      </section>

      <section className="page contact-content">
        <div className="container contact-grid">
          <div className="contact-info">
            <div>
              <span className="material-symbols-outlined">mail</span>
              <div>
                <h3>Email</h3>
                <p>Gửi yêu cầu của bạn cho chúng tôi</p>
                <a href="mailto:support@cometring.com">support@cometring.com</a>
              </div>
            </div>
            <div>
              <span className="material-symbols-outlined">call</span>
              <div>
                <h3>Điện thoại</h3>
                <p>Hỗ trợ khách hàng 24/7</p>
                <a href="tel:+84123456789">+84 123 456 789</a>
              </div>
            </div>
            <div>
              <span className="material-symbols-outlined">location_on</span>
              <div>
                <h3>Cửa hàng</h3>
                <p>Ghế thăm showroom của chúng tôi</p>
                <span>123 Phố Đồng Khởi, Quận 1, TP. Hồ Chí Minh</span>
              </div>
            </div>
            <div>
              <span className="material-symbols-outlined">schedule</span>
              <div>
                <h3>Giờ làm việc</h3>
                <p>Thứ Hai - Thứ Sáu: 9:00 - 21:00</p>
                <p>Thứ Bảy & Chủ Nhật: 10:00 - 19:00</p>
              </div>
            </div>
          </div>

          <form className="contact-form">
            <h2>Gửi Lời Nhắn</h2>
            <div className="form-grid">
              <label>
                Tên
                <input type="text" placeholder="Tên của bạn" required />
              </label>
              <label>
                Họ
                <input type="text" placeholder="Họ của bạn" required />
              </label>
              <label className="form-grid--full">
                Email
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label className="form-grid--full">
                Số điện thoại
                <input type="tel" placeholder="Số điện thoại của bạn" />
              </label>
              <label className="form-grid--full">
                Lời nhắn
                <textarea placeholder="Hãy cho chúng tôi biết bạn cần gì..." rows={5} />
              </label>
            </div>
            <button type="submit" className="primary-button">
              Gửi lời nhắn
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;



