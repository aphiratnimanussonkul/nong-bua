import React from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@material-ui/core";
import "./news-carousal.scss";

const NewsCarousal = (props) => {
  const news = [
    {
      title: "รับปริญญา",
      image:
        "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/88360954_2997376033681635_6927793767550287872_o.jpg?_nc_cat=101&_nc_sid=8bfeb9&_nc_eui2=AeELUZ4oF25uuwLMG5vb7vtTsGUOxTHRMVOwZQ7FMdExUwq-85YpROgfAHr88kysExFimtsCEeeg5kPimzlyso_Z&_nc_ohc=UzLfVbz3t2oAX85YZeX&_nc_ht=scontent.fbkk20-1.fna&oh=77ae520d6d6b99ab564f0c2b20d6bbcb&oe=5F4C60C2",
    },
    {
      title: "งานบวช พีท",
      image:
        "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/84649851_832637333870820_4265385807533047808_n.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_eui2=AeE_kCF1IO9yXgbBqt1JHhJIqfitWikI-9Sp-K1aKQj71HIZimhAplMBA4LI9qd3sLGRxMxXQoaZvVlHQXdfdmfp&_nc_ohc=iSpWFqYFLKkAX9ltfuc&_nc_ht=scontent.fbkk20-1.fna&oh=f9438b88315e00d4c81a0b7f7b9608e0&oe=5F4A016E",
    },
  ];

  return (
    <Carousel>
      {news.map((item) => (
        <CardMedia image={item.image}>
          <div className="news-title">
            <div className="vertical-divider"></div>
            <h3>{item.title}</h3>
          </div>
        </CardMedia>
      ))}
    </Carousel>
  );
};

export default NewsCarousal;
