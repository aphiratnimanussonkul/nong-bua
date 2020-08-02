import React from "react";
import "./about-village.scss";
import { CardMedia, Typography } from "@material-ui/core";

const AboutVillage = () => {
  return (
    <div className="about-village">
      <h2>รู้จักบ้านหนองบัว</h2>
      <div className="detail">
        <CardMedia
          image={
            "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/52629688_1295604687263387_4952472015299674112_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_eui2=AeH7VOKMBAH-JFe0rwb7rYn-u04OAlfpv1O7Tg4CV-m_U0BAgpRzrwQSdU-i8QwvmxpRrqk6B69xGKtzH19aaAj-&_nc_ohc=8WSiVI6PvPMAX945_oS&_nc_ht=scontent.fbkk20-1.fna&oh=6356b09bb68e3fd32aa05af3c0e14ab4&oe=5F4AD06D"
          }
        ></CardMedia>
        <Typography>
          บ้านหนองบัว เป็นหมู่บ้านแยกมาจากบ้านหนองปรือ หมู่ที่ 4 ตำบลโบสถ์
          อาเภอพิมาย จังหวัดนครราชสีมา เนื่องจากบ้านหนองปรือเป็นหมู่บ้านขนาดใหญ่
          มีอาณาเขต กว้างขวาง มีประชากรอาศัยอยู่หนาแน่น เมื่อปี พ.ศ. 2551
          ทางราชการจึงได้ประกาศแยกขึ้นอีก หน่ึงหมู่บ้าน ชื่อหมู่บ้าน “หนองบัว”
          เกิดจากเดิมเป็นชื่อคุ้มหนองบัวก่อนที่จะมีการแยกหมู่บ้าน
          และการที่ได้ชื่อคุ้มหนองบัว
          เพราะว่ามีสระน้ำกลางหมู่บ้านที่อดีตเต็มไปด้วยดอกบัวจานวนมาก
          จึงมีการเรียกชื่อสระน้าว่าหนองบัว จึงนามาเป็นชื่อเรียกคุ้ม
          “คุ้มหนองบัว” มีการแต่งตั้ง ผู้ใหญ่บ้านคนแรก คือ นายสัมพันธ์ ฉาบพิมาย
          ปัจจุบันหมู่บ้านหนองบัว หมู่ที 25 ตำบลโบสถ์ อำเภอพิมาย
          จังหวัดนครราชสีมา ปัจจุบันมีนางกัญญา กอบพิมาย เป็นผู้ใหญ่บ้าน
        </Typography>
      </div>
    </div>
  );
};

export default AboutVillage;
