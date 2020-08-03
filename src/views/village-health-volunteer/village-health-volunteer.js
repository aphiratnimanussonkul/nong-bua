import React from "react";
import News from "../../components/news/news";
import { GridList } from "@material-ui/core";

import "./village-health-volunteer.scss";
import DirectoryCard from "../../components/directory-card/directory-card";
import StaticCard from "./components/static-card/static-card";

const VillageHealthVolunteer = () => {
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
    <div className="village-health-volunteer">
      <div className="directory">
        <div className="content">
          <h2 className="toppick">
            ทำเนียบอาสาสมัคร สาธารณสุขประจำหมู่บ้าน บ้านหนองบัว
          </h2>
          <GridList>
            <DirectoryCard></DirectoryCard>
            <DirectoryCard></DirectoryCard>
            <DirectoryCard></DirectoryCard>
            <DirectoryCard></DirectoryCard>
          </GridList>
        </div>
      </div>
      <div className="village-information">
        <div className="content">
          <h2 className="toppick">ข้อมูลสาธารณสุขทั่วไปของหมู่บ้าน</h2>
          <GridList className="static-list">
            <StaticCard
              staticData={{ iconName: "home", unit: "ครัวเรือน", amount: 160 }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconName: "people",
                unit: "คน",
                amount: 658,
              }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconUrl:
                  "https://www.clipartkey.com/mpngs/m/225-2250168_man-gender-sex-male-gender-symbol-svg-png.png",
                unit: "ประชากรชาย",
                amount: 253,
              }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconUrl:
                  "https://www.freeiconspng.com/uploads/female-gender-symbol-icon-16.png",
                unit: "ประชากรหญิง",
                amount: 315,
              }}
            ></StaticCard>
            <StaticCard
              staticData={{
                iconName: "king_bed",
                unit: "ผู้ป่วยติดเตียง",
                amount: 5,
              }}
            ></StaticCard>
          </GridList>
        </div>
      </div>
      <News news={news} toppick={"ข่าวและกิจกรรมของอสม"}></News>
    </div>
  );
};

export default VillageHealthVolunteer;
