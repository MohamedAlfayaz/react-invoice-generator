import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { InvoiceItem } from "./reusable/InvoiceItem";
import { InvoiceModal } from "./reusable/InvoiceModal";
import logo from '../assets/logo.png'

export const InvoiceForm = () => {
  const [state, setState] = useState({
    isOpen: false,
    currency: "₹",
    currentDate: "",
    invoiceNumber: 1,
    billTo: "",
    billToAddress: "",
    billToEmail: "",
    billFrom: "Maxmoc Motors Works PVT LTD",
    billFromEmail: "www.maxmoc.in",
    billFromAddress: "Sona Tower, Dindigul",
    notes: "",
    subTotal: "0.00",
    taxRate: 0,
    taxAmount: "0.00",
  });
  const [total, setTotal] = useState(0.0);

  const [items, setItems] = useState([
    {
      id: "0",
      name: "",
      description: "",
      quantity: "1",
      amount: 1.0,
    },
  ]);
  const onChange = (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const onItemizedItemEdit = (event) => {
    const individualItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };
    var newItems = items.map((item) => {
      for (var key in item) {
        if (key === individualItem.name && item.id === individualItem.id) {
          item[key] = individualItem.value;
        }
      }
      return item;
    });
    setItems(newItems);
  };
  const handleAddEvent = (e) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id,
      name: "",
      amount: 1.0,
      description: "",
      quantity: 1,
    };
    setItems((items) => [...items, item]);
  };

  const handleRowDel = (item) => {
    if (items.length > 1) {
      setItems((items) => items.filter((data) => data.id !== item.id));
    } else {
      setItems([
        {
          id: "0",
          name: "",
          description: "",
          quantity: "",
          amount: 1.0,
        },
      ]);
    }
  };

  const onCurrencyChange = (selectedOption) => {
    setState((state) => ({ ...state, selectedOption }));
  };

  const handleCalculateTotal = (items) => {
    var subTotal = 0;
    items.map((item) => {
      subTotal +=
        parseFloat(item.amount).toFixed(2) * parseFloat(item.quantity);
    })[0];
    const taxAmount = parseFloat(
      parseFloat(subTotal) * parseFloat(state.taxRate / 100)
    ).toFixed(2);

    const total = parseFloat(subTotal) + parseFloat(taxAmount);

    setTotal(total);

    setState(() => ({
      ...state,
      subTotal,
      taxAmount,
    }));
  };

  useEffect(() => {
    handleCalculateTotal(items);
  }, [items, state.taxRate]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setState((state) => ({ ...state, isOpen: true }));
      }}
    >
      <Row>
        <Col md={8} lg={9}>
          <Card className="d-flex p-4 p-xl-5 my-3 my-xl-4">
            <span className="mb-3 d-flex justify-content-evenly align-items-center fw-bold">
              Maxmoc Motor Works India Private Limited
              <img style={{width:'150px'}} src={logo} alt="logo" />
            </span>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row mb-3">
                <div className="mb-2">
                  <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                  <span className="current-date">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row md-3">
                <div className="mb-2">
                  <span className="fw-bold">Invoice&nbsp;Number:&nbsp;</span>
                  <span className="current-date">{state.invoiceNumber}</span>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Customer Detail : </Form.Label>
                <Form.Control
                  placeholder="Enter Name"
                  value={state.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={onChange}
                  autoComplete="name"
                  required={true}
                ></Form.Control>
                <Form.Control
                  placeholder="Enter Email"
                  value={state.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={onChange}
                  autoComplete="email"
                ></Form.Control>
                <Form.Control
                  placeholder="Enter Address"
                  value={state.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  onChange={onChange}
                  autoComplete="address"
                  required={true}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label className="fw-bold">BillFrom : </Form.Label>
                <Form.Control
                  value={state.billFrom}
                  className="my-2"
                  disabled={true}
                />
                <Form.Control
                  value={state.billFromEmail}
                  className="my-2"
                  disabled={true}
                />
                <Form.Control
                  value={state.billFromAddress}
                  className="my-2"
                  disabled={true}
                />
              </Col>
            </Row>
            <InvoiceItem
              items={items}
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={state.currency}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold ">Subtotal:</span>
                  <span>
                    {state.currency} {state.subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold ">TaxRate:</span>
                  <span>
                    {state.taxRate} % {state.currency} {state.taxAmount}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2" style={{fontSize:'1.125rem'}}>
                  <span className="fw-bold ">Total:</span>
                  <span>
                    {state.currency} {total}
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button
              variant="primary"
              type="submit"
              className="d-block w-100 mb-3"
            >
              Review Invoice
            </Button>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Currency : </Form.Label>
              <Form.Select
                onChange={(e) => onCurrencyChange({ currency: e.target.value })}
                className="btn btn-ligt my-1"
              >
                <option value="₹">INR</option>
                <option value="$">USD</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax Rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={state.taxRate}
                  onChange={onChange}
                  className="bg-whitwe-border"
                  placeholder="0.00"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <InvoiceModal
        showModal={state.isOpen}
        closeModal={() => setState((state) => ({ ...state, isOpen: false }))}
        info={state}
        items={items}
        total={total}
      />
    </Form>
  );
};
