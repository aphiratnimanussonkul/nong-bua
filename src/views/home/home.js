import React from "react";
import NewsCarousal from "./components/news-carousal/news-carousal.js";
import AboutVillage from "./components/about-village/about-village.js";
import "./home.scss";
import News from "../../components/news/news.js";

const Home = ({}) => {
  const news = [
    {
      title: "",
      image:
        "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/52629688_1295604687263387_4952472015299674112_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_eui2=AeH7VOKMBAH-JFe0rwb7rYn-u04OAlfpv1O7Tg4CV-m_U0BAgpRzrwQSdU-i8QwvmxpRrqk6B69xGKtzH19aaAj-&_nc_ohc=8WSiVI6PvPMAX945_oS&_nc_ht=scontent.fbkk20-1.fna&oh=6356b09bb68e3fd32aa05af3c0e14ab4&oe=5F4AD06D",
      description:
        "ส่งงาน รับงาน เรียบร้อยค่ะ จากวันที่รอคอย ได้รับเงินสนับสนุนจากรัฐบาลโครงการประชารัฐ เพื่อเศษฐกิจฐานราก...",
      tags: ["กองทุนหมู่บ้าน"],
      created_at: "1 วันที่แล้ว",
    },
    {
      title: "",
      image:
        "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/52629688_1295604687263387_4952472015299674112_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_eui2=AeH7VOKMBAH-JFe0rwb7rYn-u04OAlfpv1O7Tg4CV-m_U0BAgpRzrwQSdU-i8QwvmxpRrqk6B69xGKtzH19aaAj-&_nc_ohc=8WSiVI6PvPMAX945_oS&_nc_ht=scontent.fbkk20-1.fna&oh=6356b09bb68e3fd32aa05af3c0e14ab4&oe=5F4AD06D",
      description:
        "ส่งงาน รับงาน เรียบร้อยค่ะ จากวันที่รอคอย ได้รับเงินสนับสนุนจากรัฐบาลโครงการประชารัฐ เพื่อเศษฐกิจฐานราก...",
      tags: ["กองทุนหมู่บ้าน"],
      created_at: "1 วันที่แล้ว",
    },
    {
      title: "",
      image:
        "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/52629688_1295604687263387_4952472015299674112_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_eui2=AeH7VOKMBAH-JFe0rwb7rYn-u04OAlfpv1O7Tg4CV-m_U0BAgpRzrwQSdU-i8QwvmxpRrqk6B69xGKtzH19aaAj-&_nc_ohc=8WSiVI6PvPMAX945_oS&_nc_ht=scontent.fbkk20-1.fna&oh=6356b09bb68e3fd32aa05af3c0e14ab4&oe=5F4AD06D",
      description:
        "ส่งงาน รับงาน เรียบร้อยค่ะ จากวันที่รอคอย ได้รับเงินสนับสนุนจากรัฐบาลโครงการประชารัฐ เพื่อเศษฐกิจฐานราก...",
      tags: ["กองทุนหมู่บ้าน"],
      created_at: "1 วันที่แล้ว",
    },
  ];
  return (
    <>
      <NewsCarousal></NewsCarousal>
      <div className="content">
        <AboutVillage></AboutVillage>
      </div>
      <News news={news} toppick={"ข่าวและกิจกรรม"}></News>
    </>
  );
};

export default Home;
