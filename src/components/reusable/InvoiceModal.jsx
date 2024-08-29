import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { Row, Col, Modal, Table, Button } from "react-bootstrap";

export const InvoiceModal = (props) => {
  const generateInvoice = () => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <Modal show={props.showModal} onHide={props.onHideModal} size="lg" centered>
      <div id="invoiceCapture">
        <div className="d-flex flex-row justify-conent-between align-items-start bg-light w-100 p-4">
          <div className="w-100">
            <h4 className="fw-bold my-2">{props.info.billFrom}</h4>
            <h6 className="fw-bold text-secondary md-1">
              Invoice #:{props.info.invoiceNumber}
            </h6>
          </div>
          <img  style={{width:'200px'}} src="assets/logo.png" alt="logo" />
          <div className="text-end ms-4">
            <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
            <h5 className="fw-bold text-secondary">
              {props.info.currency} {props.total}
            </h5>
          </div>
        </div>
        <div className="p-4">
          <Row className="mb-4">
            <Col md={4}>
              <div className="fw-bold">Billed to:</div>
              <div>{props.info.billTo || ""}</div>
              <div>{props.info.billToAddress || ""}</div>
              <div>{props.info.billToEmail || ""}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold">Billed from:</div>
              <div>{props.info.billFrom || ""}</div>
              <div>{props.info.billFromAddress || ""}</div>
              <div>{props.info.billFromEmail || ""}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold mt-2">Date Of Issue :</div>
              <div>{new Date().toLocaleDateString()}</div>
            </Col>
          </Row>
          <Table className="mb-0">
            <thead>
              <tr>
                <th>QTY</th>
                <th>Description</th>
                <th className="text-end">Price</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {props.items.map((item, i) => {
                return (
                  <tr id={i} key={i}>
                    <td style={{ width: "70px" }}>{item.quantity}</td>
                    <td>
                      {item.name} ---- {item.description}
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.currency} {item.amount}
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.currency} {item.amount * item.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Table>
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  SUBTOTAL
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {props.info.currency} {props.info.subTotal}
                </td>
              </tr>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  TAX
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {props.info.currency} {props.info.taxAmount}
                </td>
              </tr>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  TOTAL
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {props.info.currency} {props.total}
                </td>
              </tr>
            </tbody>
          </Table>
          {props.info.notes && (
            <div className="bg-light py-3 px-4 rounded">{props.info.notes}</div>
          )}
        </div>
        <hr />
      <div className="d-block px-4">
        <h6>Payment Terms / Details</h6>
        <p>Account Name : Maxmoc Moter Works India PVT LTD</p> 
        <p>Name of the Bank : HDFC Bank Limited, Dindigul Branch</p>
        <p>Account No : 50200074826031</p>
        <p>RTGS / IFSC : HDFC0001850</p>
        <p>MICR CODE : 625240006</p>
        <p>PAN NO : AAQCM2589R</p>
      </div>
      <hr />
      <div className="d-block px-4">
        <p>Web Site : www.maxmoc.in / support@maxmoc.in</p>
        <p>We hereby declare that, The Informantion incorporated is True and the value stated in invoice is the gross amount receivable / abvance for the services rendered / to be rendered </p>
      </div>
      </div>
      <div className="pb-4 px-4 ">
        <Button
          variant="primary"
          className="d-block w-100 mt-3 mt-md-0"
          onClick={generateInvoice}
        >
          Download
        </Button>
      </div>
    </Modal>
  );
};
