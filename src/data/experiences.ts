import { Language } from '../i18n/types';

export interface WorkflowStep {
  step: string;
  desc: string;
  image?: string;
}

export interface ChallengeSolution {
  problem: string;
  solution: string;
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  overview: string;
  description: string;
  roleResponsibilities: string[];
  workflow: WorkflowStep[];
  challenges: ChallengeSolution[];
  results: string[];
  lessons: string[];
  mainImage: string;
  gallery: GalleryItem[];
}

const experiencesVi: Experience[] = [
  {
    id: "seller-pod",
    company: "Green E Media",
    role: "Seller POD",
    period: "2026",
    overview: "Nghiên cứu thị trường US, tìm kiếm ngách sản phẩm tiềm năng, tối ưu tiêu đề và hình ảnh sản phẩm, quản lý danh mục sản phẩm, phối hợp với đơn vị Fulfillment và hỗ trợ khách hàng trong quá trình vận hành mô hình Print-on-Demand trên eBay US.",
    description: "Công việc kinh doanh qua mô hình Print-on-Demand trên thị trường US đòi hỏi sự nhạy bén và khả năng cập nhật xu hướng liên tục. Trong vai trò này, tôi tham gia điều phối, phát triển ngách sản phẩm, và tối ưu hóa hệ thống vận hành nhằm mang lại lợi nhuận ổn định.",
    roleResponsibilities: [
      "Nghiên cứu thị trường US, tìm kiếm và phân tích các ngách sản phẩm tiềm năng có mức độ cạnh tranh thấp và lợi nhuận cao.",
      "Tối ưu tiêu đề, hình ảnh và mô tả sản phẩm (chuẩn SEO) để thu hút lượng truy cập tự nhiên.",
      "Quản lý danh mục sản phẩm, theo dõi và cập nhật hàng hóa thường xuyên.",
      "Phối hợp chặt chẽ với đơn vị Fulfillment để đảm bảo tiến độ sản xuất và giao hàng.",
      "Hỗ trợ khách hàng trong suốt quá trình vận hành mô hình Print-on-Demand."
    ],
    workflow: [
      { step: "Nghiên cứu ngách", desc: "Tìm kiếm ngách sản phẩm tiềm năng tại thị trường US.", image: "/ảnh dự án Seller POD/1.png" },
      { step: "Tối ưu Listing", desc: "Viết tiêu đề chuẩn SEO, cập nhật hình ảnh và mô tả sản phẩm.", image: "/ảnh dự án Seller POD/3.png" }
    ],
    challenges: [
      { problem: "Thị trường US rất khốc liệt với độ cạnh tranh cực kỳ cao.", solution: "Tập trung khai thác các ngách sản phẩm cụ thể (micro-niches) và cá nhân hóa trải nghiệm khách hàng để tạo sự khác biệt." }
    ],
    results: [
      "Tăng lượng truy cập tự nhiên (organic traffic) đáng kể.",
      "Duy trì sức khỏe tài khoản luôn ở mức Top Rated / Above Standard."
    ],
    lessons: [
      "Cải thiện khả năng nghiên cứu thị trường và sử dụng thành thạo các công cụ phân tích AI."
    ],
    mainImage: "/ảnh dự án Seller POD/2.jpg",
    gallery: [
      { src: "/ảnh dự án Seller POD/1.png", caption: "Listing Optimization" },
      { src: "/ảnh dự án Seller POD/3.png", caption: "Market Research" },
      { src: "/ảnh dự án Seller POD/4.png", caption: "Fulfillment" }
    ]
  },
  {
    id: "turkey-chicken-feet",
    company: "Turkey Chicken Feet",
    role: "Chủ cửa hàng F&B",
    period: "2025 – 2026",
    overview: "Tự khởi nghiệp và vận hành cửa hàng F&B quy mô nhỏ, quản lý nhập hàng, tồn kho, chế biến, bán hàng, tài chính và quảng bá trên mạng xã hội.",
    description: "Hành trình khởi nghiệp kinh doanh dịch vụ ăn uống nhỏ từ con số 0. Tự tay thiết lập hệ thống từ thu mua, quản lý chất lượng đến chiến dịch marketing truyền thông mạng xã hội, đem lại trải nghiệm trọn vẹn cho khách hàng.",
    roleResponsibilities: [
      "Quản lý việc nhập nguyên vật liệu và kiểm soát hàng tồn kho nhằm đảm bảo tính tươi mới của sản phẩm.",
      "Chế biến, giám sát và quản lý chất lượng từng món ăn được đưa đến tay khách hàng.",
      "Trực tiếp bán hàng, tư vấn và chăm sóc khách hàng hàng ngày.",
      "Quản lý tài chính, kiểm soát thu chi để duy trì dòng tiền ổn định.",
      "Triển khai các chiến dịch quảng bá trên mạng xã hội như Facebook, TikTok để tiếp cận người dùng địa phương."
    ],
    workflow: [
      { step: "Quản lý nguồn hàng", desc: "Lựa chọn nguyên liệu tươi ngon mỗi ngày, kiểm soát chặt chẽ hàng tồn kho.", image: "/ảnh dự án chân gà/z8018874574544_33e992ff2fbf4dcb1ea87939d74d0233.jpg" },
      { step: "Vận hành hàng ngày", desc: "Tự tay chế biến, phục vụ khách hàng và quản lý sổ sách đơn hàng.", image: "/ảnh dự án chân gà/z8018882572744_9f62fbf8132f4c82da0f48d044a30426.jpg" }
    ],
    challenges: [
      { problem: "Kiểm soát chi phí nguyên vật liệu đầu vào thường xuyên biến động.", solution: "Đàm phán với nhiều nhà cung cấp và tối ưu hóa quy trình sơ chế, chế biến để giảm lãng phí tối đa." }
    ],
    results: [
      "Đạt điểm hoàn vốn (break-even) trong thời gian rất ngắn.",
      "Xây dựng thành công lượng khách hàng trung thành, ủng hộ thường xuyên thông qua mạng xã hội."
    ],
    lessons: [
      "Nắm vững kỹ năng vận hành F&B thực tế và khả năng phân bổ tài chính cá nhân / doanh nghiệp."
    ],
    mainImage: "/ảnh dự án chân gà/z8018874731733_d89b9cbf149dbccbad03593e43f9f2e2.jpg",
    gallery: [
      { src: "/ảnh dự án chân gà/z8018874574544_33e992ff2fbf4dcb1ea87939d74d0233.jpg", caption: "Chuẩn bị nguyên liệu" },
      { src: "/ảnh dự án chân gà/z8018882572744_9f62fbf8132f4c82da0f48d044a30426.jpg", caption: "Vận hành và sơ chế" },
      { src: "/ảnh dự án chân gà/z8018904306998_c90ea66dbf2d87fd73dd42c903c01ba3.jpg", caption: "Món ăn hoàn thiện" },
      { src: "/ảnh dự án chân gà/z8018904313730_d5ce28c65569333b6785a4f661d27162.jpg", caption: "Sản phẩm thực tế" },
      { src: "/ảnh dự án chân gà/z8018904321007_50f74c88d1ad743d09fae16088fac79a.jpg", caption: "Sản phẩm" },
      { src: "/ảnh dự án chân gà/z8018904328028_a2412a60ed5bd269d103d579e9304810.jpg", caption: "Đóng gói" }
    ]
  },
  {
    id: "hn-sim",
    company: "H&N International SIM",
    role: "Quản lý kho & Nhân viên bán hàng",
    period: "2023 – 2024",
    overview: "Quản lý kho, kiểm soát tồn kho, hỗ trợ bán hàng, xử lý xuất nhập hàng, tư vấn khách hàng và lập báo cáo kinh doanh cho hệ thống phân phối SIM quốc tế.",
    description: "Một môi trường bán lẻ quốc tế nhịp độ nhanh. Công việc tập trung vào việc quản lý chuỗi cung ứng thẻ SIM, tư vấn kỹ thuật và đảm bảo sự hài lòng tuyệt đối của hành khách du lịch quốc tế.",
    roleResponsibilities: [
      "Quản lý toàn bộ quy trình kho bãi và kiểm soát số lượng tồn kho của các dòng SIM quốc tế.",
      "Tư vấn trực tiếp, hỗ trợ bán hàng cho khách hàng có nhu cầu sử dụng mạng khi đi du lịch nước ngoài.",
      "Xử lý các thủ tục xuất nhập hàng, phối hợp với các bên vận chuyển (logistics) để giao hàng đúng hẹn.",
      "Lập báo cáo kinh doanh định kỳ và báo cáo số liệu cho ban quản lý."
    ],
    workflow: [
      { step: "Quản lý tồn kho", desc: "Kiểm đếm và phân loại SIM quốc tế theo từng quốc gia bằng hệ thống mã màu.", image: "/ảnh dự án sim du lịch/480479928_1321084122330539_8242247431842356657_n.jpg" },
      { step: "Xử lý đơn hàng", desc: "Đóng gói, dán nhãn và bàn giao hàng cho các đơn vị vận chuyển.", image: "/ảnh dự án sim du lịch/638787478_1606569060448709_5839869850080730148_n.jpg" }
    ],
    challenges: [
      { problem: "Quản lý hạn sử dụng của rất nhiều loại SIM khác nhau.", solution: "Xây dựng hệ thống theo dõi trên Excel với các cảnh báo màu sắc tự động khi SIM sắp đến hạn." }
    ],
    results: [
      "Giảm thiểu sai sót trong khâu đóng gói và xuất hàng xuống mức thấp nhất.",
      "Tối ưu hóa thời gian xử lý đơn hàng, có thể đáp ứng được các đơn giao gấp."
    ],
    lessons: [
      "Phát triển kỹ năng tổ chức kho bãi bài bản và rèn luyện tư duy xử lý tình huống khẩn cấp linh hoạt."
    ],
    mainImage: "/ảnh dự án sim du lịch/480479928_1321084122330539_8242247431842356657_n.jpg",
    gallery: [
      { src: "/ảnh dự án sim du lịch/480479928_1321084122330539_8242247431842356657_n.jpg", caption: "Warehouse Management (Placeholder)" },
      { src: "/ảnh dự án sim du lịch/638787478_1606569060448709_5839869850080730148_n.jpg", caption: "Order Processing (Placeholder)" }
    ]
  },
  {
    id: "zoo-restaurant",
    company: "Nhà hàng 2,3Zoo",
    role: "Quản lý ca",
    period: "2022 – 2023",
    overview: "Bắt đầu với vị trí nhân viên phục vụ và được thăng chức lên Quản lý ca, phụ trách phân công nhân sự, đào tạo nhân viên và đảm bảo vận hành nhà hàng hiệu quả.",
    description: "Kinh nghiệm thực tiễn quý báu trong ngành dịch vụ và nhà hàng với khối lượng công việc áp lực cao. Rèn luyện kỹ năng phục vụ khách hàng, xử lý khủng hoảng truyền thông và lãnh đạo đội ngũ nhân viên trẻ.",
    roleResponsibilities: [
      "Phân công, sắp xếp nhân sự hợp lý cho từng khu vực trong ca làm việc.",
      "Trực tiếp hướng dẫn, đào tạo nhân viên mới về quy trình phục vụ và tác phong chuyên nghiệp.",
      "Đảm bảo mọi hoạt động của nhà hàng vận hành trơn tru và đạt tiêu chuẩn chất lượng trong những giờ cao điểm.",
      "Chịu trách nhiệm giải quyết nhanh chóng và êm đẹp mọi phàn nàn, khiếu nại từ khách hàng."
    ],
    workflow: [
      { step: "Họp đầu ca", desc: "Tập hợp nhân viên, phổ biến công việc, và kiểm tra tác phong trước giờ mở cửa.", image: "/ảnh dự án nhà hàng/image (1).png" },
      { step: "Giờ cao điểm", desc: "Điều phối nhân sự di chuyển linh hoạt và kiểm soát chất lượng đồ ăn từ bếp ra bàn.", image: "/ảnh dự án nhà hàng/image.png" }
    ],
    challenges: [
      { problem: "Nhà hàng luôn trong tình trạng quá tải vào các dịp lễ hoặc cuối tuần.", solution: "Thiết lập các trạm hỗ trợ nhanh, linh động sắp xếp nhân sự từ khu vực vắng sang khu vực đông." }
    ],
    results: [
      "Được công nhận năng lực và thăng chức lên Quản lý ca chỉ trong thời gian ngắn.",
      "Góp phần đáng kể vào việc cải thiện chỉ số hài lòng của khách hàng và duy trì khách quen."
    ],
    lessons: [
      "Phát triển mạnh mẽ kỹ năng lãnh đạo đội ngũ và ứng biến với các khủng hoảng trong vận hành F&B."
    ],
    mainImage: "/ảnh dự án nhà hàng/image (1).png",
    gallery: [
      { src: "/ảnh dự án nhà hàng/image (1).png", caption: "Hình ảnh 1" },
      { src: "/ảnh dự án nhà hàng/image (6).png", caption: "Hình ảnh 2" },
      { src: "/ảnh dự án nhà hàng/image.png", caption: "Hình ảnh 3" },
      { src: "/ảnh dự án nhà hàng/z8018872029923_2ab0917acebb3d37050e09437658cf3f.jpg", caption: "Hình ảnh 4" }
    ]
  }
];

const experiencesEn: Experience[] = [
  {
    id: "seller-pod",
    company: "Green E Media",
    role: "Seller POD",
    period: "2026",
    overview: "Researched the US market, identified profitable product niches, optimized product listings, managed product catalogs, coordinated with fulfillment partners, and supported customers for cross-border Print-on-Demand operations targeting the US market.",
    description: "Operating a Print-on-Demand business targeted at the US market requires agility and trend awareness. In this role, I coordinated e-commerce operations, developed niche products, and optimized the fulfillment process to ensure steady profitability.",
    roleResponsibilities: [
      "Researched the US market and identified profitable niches with low competition.",
      "Optimized product listings, titles, and images to improve SEO and organic traffic.",
      "Managed the overall product catalog, continuously adding and updating items.",
      "Coordinated with fulfillment partners to ensure production and shipping timelines were met.",
      "Supported customers and handled operations for cross-border Print-on-Demand operations."
    ],
    workflow: [
      { step: "Niche Research", desc: "Identified profitable niches in the US market.", image: "/ảnh dự án Seller POD/1.png" },
      { step: "Listing Optimization", desc: "Wrote SEO-optimized titles, updated product images and descriptions.", image: "/ảnh dự án Seller POD/3.png" }
    ],
    challenges: [
      { problem: "The US market is highly competitive with massive volumes.", solution: "Focused on specific micro-niches and personalized designs to stand out from generic products." }
    ],
    results: [
      "Significantly increased organic traffic and sales.",
      "Consistently maintained a Top Rated / Above Standard account health score."
    ],
    lessons: [
      "Improved market research skills and proficiency with AI-driven analytics tools."
    ],
    mainImage: "/ảnh dự án Seller POD/2.jpg",
    gallery: [
      { src: "/ảnh dự án Seller POD/1.png", caption: "Listing Optimization" },
      { src: "/ảnh dự án Seller POD/3.png", caption: "Market Research" },
      { src: "/ảnh dự án Seller POD/4.png", caption: "Fulfillment" }
    ]
  },
  {
    id: "turkey-chicken-feet",
    company: "Turkey Chicken Feet",
    role: "Small Business Owner",
    period: "2025 – 2026",
    overview: "Founded and independently operated a small F&B business, managing purchasing, inventory, food preparation, customer service, finance, and social media marketing.",
    description: "An entrepreneurial journey starting from scratch. I built the entire system—from purchasing and quality control to social media marketing campaigns, ensuring a wonderful experience for local food enthusiasts.",
    roleResponsibilities: [
      "Managed purchasing and inventory, ensuring raw materials were always fresh and available.",
      "Oversaw food preparation and maintained strict quality control over every served dish.",
      "Handled daily sales, customer interactions, and direct customer service.",
      "Managed finances, bookkeeping, and overall cash flow to sustain operations.",
      "Ran social media marketing campaigns (Facebook, TikTok) to attract and engage local customers."
    ],
    workflow: [
      { step: "Sourcing", desc: "Selected fresh ingredients daily and controlled inventory efficiently.", image: "/ảnh dự án chân gà/z8018874574544_33e992ff2fbf4dcb1ea87939d74d0233.jpg" },
      { step: "Daily Operations", desc: "Prepared food, served customers, and managed order fulfillment.", image: "/ảnh dự án chân gà/z8018882572744_9f62fbf8132f4c82da0f48d044a30426.jpg" }
    ],
    challenges: [
      { problem: "Controlling volatile ingredient costs while maintaining food quality.", solution: "Negotiated with suppliers and optimized preparation processes to significantly reduce food waste." }
    ],
    results: [
      "Reached the break-even point very quickly after launch.",
      "Built a highly loyal customer base who frequently engaged via social media."
    ],
    lessons: [
      "Mastered the realities of F&B operations and personal/business finance management."
    ],
    mainImage: "/ảnh dự án chân gà/z8018874731733_d89b9cbf149dbccbad03593e43f9f2e2.jpg",
    gallery: [
      { src: "/ảnh dự án chân gà/z8018874574544_33e992ff2fbf4dcb1ea87939d74d0233.jpg", caption: "Ingredients & Prep" },
      { src: "/ảnh dự án chân gà/z8018882572744_9f62fbf8132f4c82da0f48d044a30426.jpg", caption: "Operations" },
      { src: "/ảnh dự án chân gà/z8018904306998_c90ea66dbf2d87fd73dd42c903c01ba3.jpg", caption: "Dish" },
      { src: "/ảnh dự án chân gà/z8018904313730_d5ce28c65569333b6785a4f661d27162.jpg", caption: "Product" },
      { src: "/ảnh dự án chân gà/z8018904321007_50f74c88d1ad743d09fae16088fac79a.jpg", caption: "Service" },
      { src: "/ảnh dự án chân gà/z8018904328028_a2412a60ed5bd269d103d579e9304810.jpg", caption: "Packaging" }
    ]
  },
  {
    id: "hn-sim",
    company: "H&N International SIM",
    role: "Warehouse & Sales Supervisor",
    period: "2023 – 2024",
    overview: "Managed warehouse operations, inventory control, sales support, logistics, customer consulting, and business reporting for an international SIM distribution company.",
    description: "A fast-paced international retail environment. My work focused on managing the SIM card supply chain, providing technical consulting, and ensuring absolute satisfaction for international travelers.",
    roleResponsibilities: [
      "Managed overall warehouse operations and implemented strict inventory control measures.",
      "Provided sales support and customer consulting regarding international roaming and SIM setups.",
      "Handled logistics, packing, and order fulfillment in collaboration with couriers.",
      "Prepared regular business reports and submitted metrics to management."
    ],
    workflow: [
      { step: "Inventory Control", desc: "Counted and categorized international SIMs by country using a visual color-coding system.", image: "/ảnh dự án sim du lịch/480479928_1321084122330539_8242247431842356657_n.jpg" },
      { step: "Order Fulfillment", desc: "Packed, labeled, and handed over shipments to logistics providers.", image: "/ảnh dự án sim du lịch/638787478_1606569060448709_5839869850080730148_n.jpg" }
    ],
    challenges: [
      { problem: "Managing the strict expiration dates of various international SIM cards.", solution: "Built an automated tracking system in Excel with color-coded alerts to prioritize sales of expiring items." }
    ],
    results: [
      "Minimized packing errors down to the lowest possible margin.",
      "Optimized order processing time, effortlessly fulfilling urgent express orders."
    ],
    lessons: [
      "Developed advanced warehouse organization techniques and emergency problem-solving skills."
    ],
    mainImage: "/ảnh dự án sim du lịch/480479928_1321084122330539_8242247431842356657_n.jpg",
    gallery: [
      { src: "/ảnh dự án sim du lịch/480479928_1321084122330539_8242247431842356657_n.jpg", caption: "Warehouse Management (Placeholder)" },
      { src: "/ảnh dự án sim du lịch/638787478_1606569060448709_5839869850080730148_n.jpg", caption: "Order Processing (Placeholder)" }
    ]
  },
  {
    id: "zoo-restaurant",
    company: "2,3Zoo Restaurant",
    role: "Shift Manager",
    period: "2022 – 2023",
    overview: "Started as a service staff member and was promoted to Shift Manager, responsible for team supervision, scheduling, staff training, and ensuring smooth daily restaurant operations.",
    description: "Gained invaluable hands-on experience in a high-pressure hospitality environment. Honed my skills in customer service, crisis management, and leading a dynamic team of young staff.",
    roleResponsibilities: [
      "Supervised the team, managed shift schedules, and assigned zones.",
      "Trained new staff on service protocols, etiquette, and operational procedures.",
      "Ensured smooth restaurant operations during extremely busy peak hours.",
      "Resolved customer complaints and service issues quickly and professionally."
    ],
    workflow: [
      { step: "Shift Briefing", desc: "Assigned tasks, checked staff readiness, and set daily goals before opening.", image: "/ảnh dự án nhà hàng/image (1).png" },
      { step: "Peak Hours", desc: "Coordinated staff deployment on the floor and maintained food delivery quality.", image: "/ảnh dự án nhà hàng/image.png" }
    ],
    challenges: [
      { problem: "Severe overcrowding during holidays and weekends causing service delays.", solution: "Implemented flexible staffing and set up rapid response stations to assist overwhelmed zones." }
    ],
    results: [
      "Demonstrated excellence and was promoted to Shift Manager within a very short timeframe.",
      "Improved overall customer satisfaction and successfully retained regular patrons."
    ],
    lessons: [
      "Developed robust team leadership and real-time crisis management skills."
    ],
    mainImage: "/ảnh dự án nhà hàng/image (1).png",
    gallery: [
      { src: "/ảnh dự án nhà hàng/image (1).png", caption: "Image 1" },
      { src: "/ảnh dự án nhà hàng/image (6).png", caption: "Image 2" },
      { src: "/ảnh dự án nhà hàng/image.png", caption: "Image 3" },
      { src: "/ảnh dự án nhà hàng/z8018872029923_2ab0917acebb3d37050e09437658cf3f.jpg", caption: "Image 4" }
    ]
  }
];

export const experiencesData: Record<Language, Experience[]> = {
  vi: experiencesVi,
  en: experiencesEn
};

export function getExperienceById(id: string, language: Language = 'en'): Experience | undefined {
  return experiencesData[language].find(exp => exp.id === id);
}
