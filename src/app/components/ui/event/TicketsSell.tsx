import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const { Text } = Typography;

interface LimitPurchaseQty {
  min: number;
  max: number;
}

interface TicketProps {
  id: string;
  price: number;
  details: string;
  eventId: string;
  eventName: string;
  qty: number;
  totalTickets: number;
  ticketTitle: string;
  limit_purchase_qty: LimitPurchaseQty;
}

const TicktesSell: React.FC<TicketProps> = ({
  price,
  details,
  eventName,
  qty,
  totalTickets,
  ticketTitle,
  limit_purchase_qty,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="antd-custome-card">
      <Card>
        <div className="tickets-card">
          <div className="">
            <div className="tickets-icon">
              <svg
                id="ticket-9-svgrepo-com"
                xmlns="http://www.w3.org/2000/svg"
                width="142.681"
                height="81.282"
                viewBox="0 0 142.681 81.282"
              >
                <path
                  id="Path_19523"
                  data-name="Path 19523"
                  d="M182.273,203.494H89.442V229.81h92.831V203.494Zm-73.759,8.539a.212.212,0,0,1-.226.219h-3.827a.118.118,0,0,0-.135.133v11.868a.209.209,0,0,1-.223.219h-2.825a.205.205,0,0,1-.219-.219V212.386c0-.09-.05-.133-.14-.133H97.092a.21.21,0,0,1-.223-.219v-2.477a.21.21,0,0,1,.223-.219h11.2a.212.212,0,0,1,.226.219Zm6.43,12.22a.205.205,0,0,1-.219.219H111.9a.205.205,0,0,1-.219-.219v-14.7a.208.208,0,0,1,.219-.219h2.829a.208.208,0,0,1,.219.219Zm7.395-4.1a2.224,2.224,0,0,0,2.271,1.669,2.493,2.493,0,0,0,2.4-1.709.213.213,0,0,1,.314-.115l2.427,1.091a.171.171,0,0,1,.111.269,5.327,5.327,0,0,1-5.277,3.362A5.209,5.209,0,0,1,119.2,221a19.989,19.989,0,0,1,0-8.192,5.209,5.209,0,0,1,5.385-3.721,5.327,5.327,0,0,1,5.277,3.362.172.172,0,0,1-.111.269l-2.427,1.091a.218.218,0,0,1-.314-.108,2.493,2.493,0,0,0-2.4-1.718,2.228,2.228,0,0,0-2.271,1.671,21.982,21.982,0,0,0,0,6.5Zm23.247,4.317h-3.276a.318.318,0,0,1-.334-.2l-3.428-6.367-1.982,2.49v3.857a.205.205,0,0,1-.219.219h-2.829a.207.207,0,0,1-.221-.219v-14.7a.209.209,0,0,1,.221-.219h2.829a.207.207,0,0,1,.219.219V216.1l5.033-6.568a.393.393,0,0,1,.377-.2H145.2c.133,0,.206.156.09.289l-4.59,5.744,5.015,8.837C145.806,224.359,145.738,224.472,145.587,224.472Zm13.557-12.529a.207.207,0,0,1-.221.219H152.4a.121.121,0,0,0-.138.133V215.3c0,.093.045.131.138.131h5.428a.212.212,0,0,1,.224.223v2.362a.211.211,0,0,1-.224.223H152.4c-.093,0-.138.045-.138.131v3.141c0,.09.045.129.138.129h6.521a.211.211,0,0,1,.221.226v2.384a.207.207,0,0,1-.221.219h-9.707a.205.205,0,0,1-.219-.219v-14.7a.208.208,0,0,1,.219-.219h9.707a.209.209,0,0,1,.221.219Zm14.34.09a.211.211,0,0,1-.223.219H169.43a.118.118,0,0,0-.133.133v11.868a.207.207,0,0,1-.221.219h-2.829a.206.206,0,0,1-.221-.219V212.386a.117.117,0,0,0-.133-.133h-3.829a.211.211,0,0,1-.224-.219v-2.477a.211.211,0,0,1,.224-.219h11.2a.211.211,0,0,1,.224.219v2.477Z"
                  transform="translate(-64.517 -177.485)"
                />
                <path
                  id="Path_19524"
                  data-name="Path 19524"
                  d="M141.512,127.532a16.218,16.218,0,0,1-16.2-16.2v-1.17H17.368v1.17a16.218,16.218,0,0,1-16.2,16.2H0v46.549H1.17a16.215,16.215,0,0,1,16.2,16.194v1.17H125.313v-1.17a16.215,16.215,0,0,1,16.2-16.194h1.17V127.532Zm-20.831,36.42v1.459H22V133.249H120.68v30.7Z"
                  transform="translate(0 -110.162)"
                />
              </svg>
            </div>
          </div>

          <div className="tickets-cart-details">
            <div className="price-cartbtn">
              <p className="price">${price}</p>
            </div>
            <div className="details">
              <h4>{ticketTitle}</h4>
              <span>{details}</span>
            </div>
            <div style={{ backgroundColor: "black", height: "1px" }}></div>
            <div className="conditons-count">
              <div className="">
                <Row className="">
                  <Col span={12}>
                    <Text>
                      <span>Total Tickers : {totalTickets}</span>
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text>
                      <span>Available : {qty}</span>
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Text>
                      <span>Min Purchase: {limit_purchase_qty.min}</span>
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text>
                      <span>Max Purchase: {limit_purchase_qty.max}</span>
                    </Text>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TicktesSell;
