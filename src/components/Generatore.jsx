import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Generatore() {
  const [userInput, setUserInput] = useState('');
  const [sizeChoice, setSizeChoice] = useState(300);
  const [FGColorChoice, setFGColorChoice] = useState("#000");
  const [BGColorChoice, setBGColorChoice] = useState("#ffffff");
  const qrCodeRef = useRef(null);

  useEffect(() => {
    setFGColorChoice("#000");
  }, []); 

  const handleSizeChange = (e) => {
    setSizeChoice(parseInt(e.target.value));
  }

  const handleBGColorChange = (e) => {
    setBGColorChoice(e.target.value);
  }

  const handleFGColorChange = (e) => {
    setFGColorChoice(e.target.value);
  }

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value.trim());
  }

  const handleDownloadQRCode = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current, { scale: 2, logging: false, backgroundColor: null })
        .then((canvas) => {
          const link = document.createElement('a');
          link.download = 'QR_Code.png';
          link.href = canvas.toDataURL("image/png");
          link.click();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  return (
    <Container className="justify-content-center wrapper">
        <Col lg={6} md={8} sm={10}>
          <Form.Control
            type="text"
            id="placement"
            className="mb-3"
            placeholder="Inserisci un testo o un URL"
            value={userInput}
            onChange={handleUserInputChange}
          />
          <div className="options mb-3">
            <Form.Select
              className="me-3"
              value={sizeChoice}
              onChange={handleSizeChange}
            >
              <option value={100}>100*100</option>
              <option value={200}>200*200</option>
              <option value={300}>300*300</option>
            </Form.Select>
            <Form.Control
              type="color"
              className="me-3"
              id="color-1"
              value={FGColorChoice}
              onChange={handleFGColorChange}
            />
            <Form.Control
              type="color"
              id="color-2"
              value={BGColorChoice}
              onChange={handleBGColorChange}
            />
          </div>
          {userInput && (
            <div>
              <div className="container qr" ref={qrCodeRef}>
                <QRCode
                  value={userInput}
                  size={sizeChoice}
                  bgColor={BGColorChoice}
                  fgColor={FGColorChoice}
                />
              </div>
              <Button className="mt-3 generate" onClick={handleDownloadQRCode}>Download QR Code</Button>
            </div>
          )}
        </Col>
    </Container>
  );
}

