import { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert, Card, CardBody, Button, Input, InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu, CardText, Table,
  DropdownItem,
  FormGroup,  
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ListGroup,
  ListGroupItem} from 'reactstrap'




import InputGroup from 'reactstrap/lib/InputGroup'


import Badge from 'reactstrap/lib/Badge'
// ** Styles
import './detail.css'


const status = {
  0: "pending",
  1: "Accepted",
  2: "InProgress",
  3: "outfordelivery",
  4: "canceled",
  5: "delivred",
  6: "Returned",
  7: "Rejected",
  8: "ReadyToTake"
}
const statuspaid = {
  0: "paid",
  1: "unpaid"
}
const InvoicePreview = ({data}) => {
  
    useEffect(()=>{
        console.log(data)
    })

  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
  return data !== null ? (
    
    <div className='invoice-preview-wrapper'>
     
      <Row className='invoice-preview'>
        <Col xl={12} md={12} sm={12}>
        {data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
          <h4 className='invoice-title'>
          Order {data.data.Etat==0?(<span className='invoice-number'>#0</span>)
          :(
              <span className='invoice-number'>#{data.data.numticket}</span>
          )}
           
            </h4>
          </div>
          <h4 className='invoice-title'>
             <span className='invoice-number'>
             {(data.data.Etat==0)&&
                               <td><span className="badge badge-pill badge-warning">Pending</span></td>
                              }
                               {(data.data.Etat==1)&&
                               <td><span className="badge badge-pill badge-success">Accepted</span></td>
                              }
                              {(data.data.Etat==2)&&
                               <td><span className="badge badge-pill badge-secondary">inProgress</span></td>
                              }
                              {(data.data.Etat==3)&&
                               <td><span className="badge badge-pill badge-info">Ready</span></td>
                              }
                                {(data.data.Etat==8)&&
                               <td><span className="badge badge-pill badge-danger">Out for Delivery</span></td>
                              }
          <span className={data.data.Etatpayement ===  "Commande payé" ? "badge badge-pill badge-success" : "badge badge-pill badge-danger"} >
          {data?.data.Etatpayement ===  "Commande payé" ? "paid" : "not paid"}
          </span></span>
            </h4>
          <div className='mt-md-0 mt-2'>
         
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>IssuedDate:</p>
              <p className='invoice-date'>{data?.data.date}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Timeline:</p>
              <p className='invoice-date'>{data?.data.time}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr />

      
      <CardBody >
        <Row className='invoice-spacing'>
          <Col className='p-0' lg='8'>
            <h6 className='mb-2'>CustomerName:</h6>
            <h6 className='mb-25'>{data.user.firstname} {data.user.lastname}</h6>
            <h6 className='mb-25'>{data.user.phonenumber}</h6>
            {data.data.typeOrder =='on delivery' ?<CardText className='mb-25'>{data.data.adresseDelevry}</CardText> : null}
           
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' lg='4'>
            <h6 className='mb-2'>payementsdetails:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>Total:</td>
                  <td>
                    <span className='font-weight-bolder'> {data.data.typeOrder === "on delivery" ? (Number(data.data.tax) + Number(data.data.subTotal) - (data.data.remise ? Number(data.data.remise) : 0) + Number(data.data.fraisLivraison)) + ( 'TND') : (Number(data.data.tax) + Number(data.data.subTotal) - (data.data.dataremise ? Number(data.data.remise) : 0)) + ('TND')
}</span>
                  </td>
                </tr>
         
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      
        
      <Table  className="w-100" >
      <div id="example_wrapper" className="dataTables_wrapper">
        <table id="example" className="display w-100 dataTable">
        <thead>
          <tr>
            <th className='py-1'>platname</th>
            <th className='py-1'>price</th>
            <th className='py-1'>Total</th>
            <th className='py-1'>quantity </th>
          </tr>
        </thead>
        <tbody>
          {data.data.listplat !== undefined ? data.data.listplat.map((item, index) => (
<>
<tr>
            <td className='py-1'>
              <p className='card-text font-weight-bold mb-25'>{item.name_plat}  {item.tailleplat !== "" ? `(${item.tailleplat})` : ""} </p>
              <p className='card-text font-weight-bold mb-25'>{item.extraschoisis !== null ?? "extras" } {item.extraschoisis !== null ?  item.extraschoisis.toString() : "" }</p>
             <p className='card-text font-weight-bold mb-25'>{item.comment}</p>
          
            </td>
            <td className='py-1'>
            <span className='font-weight-bold'>{item.price} { 'TND'}</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>{item.totalPrice} { 'TND'}</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>{item.quantity}</span>
            </td>
           
          </tr>
          {item.platformulechoisis !== null ? <tr >
          <Table style={{marginLeft : 50}} responsive>
       
        <tbody>
          {item.platformulechoisis !== undefined ? item.platformulechoisis.map((itemplat, inde) => (
<tr>
<td>

             <p className='card-text font-weight-bold mb-25'>{itemplat.plat.label === undefined ? itemplat.plat : itemplat.plat.label}</p>
          
            </td>
  </tr>

           )) : null}
             </tbody>
      </Table>
          </tr> : null}
</>
          )) : null}

        </tbody>
        </table >
        </div>     
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
          <CardText className='mb-0'>
          {data.data?.comment !== undefined ? <><span className='font-weight-bold'>comment:</span> <span className='ml-75'>{data.data.comment !== undefined ? data.data.comment : ""}</span></> : null}
             </CardText>
            <CardText className='mb-0'>
               <span className='font-weight-bold'>salesperson: {data.user.firstname}</span> <span className='ml-75'></span>
            </CardText>
          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>subtotal:</p>
                <p className='invoice-total-amount'>{data.data.subTotal} { 'TND'}</p>
              </div>
            
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>taxFees:</p>
                <p className='invoice-total-amount'>{data.data.tax}</p>
              </div>
              {data.data.typeOrder === "on delivery" ? <div className='invoice-total-item'>
                <p className='invoice-total-title'>deliverycost:</p>
                <p className='invoice-total-amount'>{data.data.fraisLivraison}</p>
              </div> : null
              }
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>discountMoney:</p>
                <p className='invoice-total-amount'>{data.data.remise ? data.data.remise : 0}</p>
              </div>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                {data.data.typeOrder === "on delivery" ? <p className='invoice-total-amount'>{(Number(data.data.tax) + Number(data.data.subTotal) - (data.data.remise ? data.data.remise : 0) + (Number(data.data.fraisLivraison)))} { 'TND'}
                </p> : <p className='invoice-total-amount'>{Number(data.data.tax) + parseFloat(data.data.subTotal) - (data.data.remise ? data.data.remise : 0)} { 'TND'}</p>
}
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
     
    </Card>

  ) : null
}
        </Col>
      
      </Row>
      {/* <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} /> */}
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Order not found</h4>
      <div className='alert-body'>
        Order with doesn't exist. Check list 
      </div>
    </Alert>
  )
}

export default InvoicePreview

