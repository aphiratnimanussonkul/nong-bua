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
import { useHistory, withRouter } from "react-router-dom";
import { convertHowLong } from "../../../../helpers/convert-how-long/index";

import "./news-card.scss";

const NewsCard = ({ detail }) => {
  const history = useHistory();
  const isMobile = navigator.userAgent.includes("Mobile");
  const readNews = (newsId) => {
    history.push(`/news-information/${newsId}`);
  };

  return (
    <Card
      className={isMobile ? "news-card mobile" : "news-card"}
      onClick={() => readNews(detail.id)}
    >
      <CardActionArea>
        <CardMedia image={detail.images[0]} />
        <CardContent>
          <div className="top-card-news">
            <div className="tags">
              {detail.tags.map((tag, index) => {
                return (
                  <Chip label={tag} size="small" className="chip" key={index} />
                );
              })}
            </div>
            <Typography variant="subtitle2" className="how-long">
              {convertHowLong(detail.createdAt.seconds)}
            </Typography>
          </div>
          <Typography gutterBottom variant="h5" className="toppick">
            {detail.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {detail.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider light />
      <CardActions>
        <Button size="small" variant="outlined" className="brown-yellow-outlined-button">
          อ่านเพิ่มเติม
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(NewsCard);
