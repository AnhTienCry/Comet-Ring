import type { JSX } from "react";

const milestones = [
  {
    year: '2018',
    title: 'Nguồn Cảm Hứng',
    description: 'Comet Ring ra đời với sứ mệnh đưa vẻ đẹp vũ trụ vào từng thiết kế trang sức.'
  },
  {
    year: '2020',
    title: 'Viên Gạch Đầu Tiên',
    description: 'BST đầu tiên được ra mắt, ghi dấu ấn bằng kỹ thuật chế tác tỉ mỉ và chất liệu cao cấp.'
  },
  {
    year: '2023',
    title: 'Khẳng Định Vị Thế',
    description: 'Comet Ring được cộng đồng yêu trang sức công nhận là thương hiệu của sự tinh tế và sáng tạo.'
  }
];

const values = [
  {
    icon: 'visibility',
    title: 'Tầm Nhìn',
    description: 'Trở thành biểu tượng của trang sức nghệ thuật, mỗi món sản phẩm là một tác phẩm độc đáo.'
  },
  {
    icon: 'rocket_launch',
    title: 'Sứ Mệnh',
    description: 'Tôn vinh vẻ đẹp cá nhân thông qua những thiết kế mang câu chuyện cảm hứng từ vũ trụ.'
  },
  {
    icon: 'diamond',
    title: 'Giá Trị Cốt Lõi',
    description: 'Độc bản - Tinh xảo - Vượt ngoài giới hạn. Đây là kim chỉ nam cho mọi sáng tạo.'
  }
];

const artisans = [
  {
    name: 'Elena Petrova',
    role: 'Trưởng nhóm thiết kế',
    quote: 'Thiết kế của tôi kể những câu chuyện đầy cảm hứng.'
  },
  {
    name: 'Marcus Chen',
    role: 'Nghệ nhân kim hoàn',
    quote: 'Bàn tay tôi gắn kết kim loại với nghệ thuật chế tác.'
  },
  {
    name: 'Sophie Dubois',
    role: 'Quản lý trải nghiệm',
    quote: 'Chúng tôi mang đến trải nghiệm sang trọng cho mỗi khách hàng.'
  }
];

const AboutPage = (): JSX.Element => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container about-hero__content">
          <h1>Comet Ring: Nơi Nghệ Thuật Gặp Vũ Trụ</h1>
          <p>
            Mỗi thiết kế là một câu chuyện độc bản, lấy cảm hứng từ vẻ đẹp huyền bí của các vì sao. Chúng tôi truyền
            tải năng lượng và niềm đam mê vào từng tác phẩm tinh xảo.
          </p>
        </div>
      </section>

      <section className="page about-story">
        <div className="container about-story__grid">
          <div>
            <span className="pill">Hành trình của chúng tôi</span>
            <h2>Câu Chuyện Comet Ring</h2>
            <p>
              Hành trình của Comet Ring bắt đầu từ một niềm đam mê bất tận với vũ trụ. Chúng tôi tin rằng mỗi vì sao,
              mỗi dải ngân hà đều chứa đựng một vẻ đẹp độc nhất, và sứ mệnh của chúng tôi là mang vẻ đẹp ấy vào từng
              tác phẩm trang sức.
            </p>
            <div className="about-timeline">
              {milestones.map((milestone) => (
                <article key={milestone.year}>
                  <span>{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="about-story__image" />
        </div>
      </section>

      <section className="about-values page">
        <div className="container">
          <h2 className="section-heading">Triết Lý Thương Hiệu</h2>
          <div className="about-values__grid">
            {values.map((value) => (
              <article key={value.title} className="card">
                <span className="material-symbols-outlined">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-craft page">
        <div className="container about-craft__grid">
          <div className="about-craft__gallery">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="about-craft__text">
            <span className="pill">Nghệ thuật chế tác</span>
            <h2>Sự Tỉ Mỉ Trong Từng Chi Tiết</h2>
            <p>
              Mỗi tác phẩm của Comet Ring là kết tinh của hàng giờ lao động miệt mài, từ khâu phác thảo ý tưởng đến
              hoàn thiện sản phẩm bằng những nghệ nhân tài hoa nhất. Chúng tôi lựa chọn những chất liệu quý hiếm, kết
              hợp với kỹ thuật hiện đại để tạo nên vẻ đẹp vượt thời gian.
            </p>
          </div>
        </div>
      </section>

      <section className="about-team page">
        <div className="container">
          <h2 className="section-heading">Đội Ngũ Sáng Tạo</h2>
          <div className="about-team__grid">
            {artisans.map((artisan) => (
              <article key={artisan.name} className="about-team__card">
                <div className="about-team__avatar" />
                <h3>{artisan.name}</h3>
                <span>{artisan.role}</span>
                <p>{artisan.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta page">
        <div className="container about-cta__card">
          <div>
            <h2>Khám Phá Vũ Trụ Comet Ring</h2>
            <p>
              Hãy để chúng tôi đồng hành cùng bạn trên hành trình tìm kiếm vẻ đẹp độc bản. Khám phá những bộ sưu tập
              trang sức tinh xảo, nơi mỗi thiết kế là một vì sao lấp lánh.
            </p>
          </div>
          <a className="primary-button" href="/collections">
            Khám phá bộ sưu tập
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;


