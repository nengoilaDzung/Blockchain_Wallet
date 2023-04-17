import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  console.log(cryptoNews);
  if (!cryptoNews?.value) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLocaleLowerCase())
            }
          >
            <Select value="Cryptocurrency">Cryptocurrency</Select>
            {data?.data?.coins.map((coin) => (
              <Select value={coin.name}>{coin.name}</Select>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="nonreferrer">
              <div className="news-image-container">
                <Typography className="news-title" level={4}>
                  {news.name}
                </Typography>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  ></Avatar>
                  <Typography className="provider-name">
                    {news.provider[0]?.name}
                  </Typography>
                </div>
                <Typography>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Typography>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
