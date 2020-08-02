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

const NewsCard = ({ detail }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia image={detail.image} />
        <CardContent>
          <div className="top-card-news">
            <div className="tags">
              {detail.tags.map((tag) => {
                return <Chip label={tag} size="small" className="chip" />;
              })}
            </div>
            <Typography variant="subtitile2" className="how-long">
              {detail.created_at}
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
        <Button size="small" variant="outlined" className="read-more-button">
          อ่านเพิ่มเติม
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
