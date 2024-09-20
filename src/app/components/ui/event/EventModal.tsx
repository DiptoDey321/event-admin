import { Col, Row } from "antd";
import imgSrc from "./../../../../../public/party-2.png";
import EventDetailsHero from "./EventDetailsHero";
import "./EventModal.css";
import TicktesSell from "./TicketsSell";

const EventModal = ({ eventDetails }: any) => {
  console.log(eventDetails);

  return (
    <div className="event-details-page">
      <div className="hero-section-container">
        <div className="blur">
          <EventDetailsHero
            companyName={`${eventDetails?.created_by.first_name} ${eventDetails?.created_by.last_name}`}
            isAuthorized={true}
            eventTitle={eventDetails?.title}
            place={eventDetails?.venue_name}
            startTime={eventDetails?.event_start_date_time}
            endTime={eventDetails?.event_end_date_time}
            location={eventDetails?.address}
            details={eventDetails?.description}
            imageUrl={imgSrc}
            imageAlt="Event"
          ></EventDetailsHero>
        </div>

       
      </div>
      <div className="tickets-container">
          <div className="">
            <div className="tickets">
              <h2 style={{color:"black"}}> Tickets</h2>
              <hr />
              <div className="tickets-lists">
                <Row gutter={[30, 30]} justify="center">
                  {eventDetails?.tickets.map((tickets: any, index: number) => (
                    <Col key={index} xs={24} sm={24} md={24} lg={24} xxl={24}>
                      <TicktesSell
                        id={tickets?._id}
                        eventId={tickets?.event_id}
                        price={tickets.price}
                        qty={tickets.available_qty}
                        ticketTitle={tickets.title}
                        details={tickets?.description}
                        eventName={eventDetails?.title}
                        limit_purchase_qty={tickets?.limit_purchase_qty}
                        totalTickets = {tickets?.qty}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>

          <div className="event-desc">
            <h2 style={{ paddingBottom: "8px", color: "black" }}>
              Description
            </h2>
            <div style={{ height: "1px", backgroundColor: "black" }}></div>
            <p
              style={{ color: "black", paddingTop: "20px" }}
              dangerouslySetInnerHTML={{ __html: eventDetails?.description }}
            />
          </div>
        </div>
    </div>
  );
};

export default EventModal;
