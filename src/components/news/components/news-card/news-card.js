import React from "react";
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  Chip,
  Divider,
} from "@material-ui/core";
import "./news-card.scss";

const NewsCard = () => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image="https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.0-9/52629688_1295604687263387_4952472015299674112_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_eui2=AeH7VOKMBAH-JFe0rwb7rYn-u04OAlfpv1O7Tg4CV-m_U0BAgpRzrwQSdU-i8QwvmxpRrqk6B69xGKtzH19aaAj-&_nc_ohc=8WSiVI6PvPMAX945_oS&_nc_ht=scontent.fbkk20-1.fna&oh=6356b09bb68e3fd32aa05af3c0e14ab4&oe=5F4AD06D"
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className="top-card-news">
            <div className="tags">
              <Chip label="กองทุนหมู่บ้าน" size="small" className="chip" />
            </div>
            <Typography variant="subtitile2" className="how-long">
              1 วันที่แล้ว
            </Typography>
          </div>
          <Typography gutterBottom variant="h5" className="toppick">
            กิจกรรม
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider light />
      <CardActions>
        <Button size="small" variant="outlined" className="read-more-button">
          อ่านเพิ่มเติม
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
