import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="cyan" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left"></MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" Delivermeow"}
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
