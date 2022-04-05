import React, { Fragment, useEffect, useState } from "react";
import { firestore } from "../../../../../fire";
import { Link ,Route} from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { banneRestaurants } from "../../../../store/actions/restaurant_actions";

import {
   InputGroup,
   InputGroupAddon,
   Input,
   InputGroupText,
   CustomInput,
   DropdownMenu,
   DropdownItem,
   DropdownToggle,
   UncontrolledDropdown,
   Card, CardImg, CardTitle, CardBody, CardHeader, CardImgOverlay, CardText, Row, Col, Button, ModalHeader, ModalFooter, Label, Modal, ModalBody, ListGroup
 } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux";
import { AddPromotions, deletePromotions, getPromotions } from "../../../../store/actions/promotions_actions";
import Compressor from 'compressorjs';
import Cleave from 'cleave.js/react'
import { AddMenu, getVouchers } from "../../../../store/actions/vouchers_actions";

import UncontrolledButtonDropdown from 'reactstrap/lib/UncontrolledButtonDropdown'
import DataTableWithButtons from "./TableMultilingual";
const moment = require('moment')

const allInputs = {imgUrl: ''}



 const ListVouchers = (props) => {    
                        
   const dispatch = useDispatch()
   const [searchTerm, setSearchTerm] = useState("")
   const [Restaurant, setRestaurants] = useState([])
   const store = useSelector(state => state)

   const [stateModal, setStateModal] = useState(false)
   const {promotions} = useSelector(state => state.Promotions)
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const options = { numeral: true }  // ** States
    const [openMail, setOpenMail] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState('')
    const [selectedMenuID, setSelectedMenuID] = useState('')
    const [scrollInnerModal, setScrollInnerModal] = useState(false)
    const [formuleModal, setFormuleModal] = useState(false)
    const [limituser, setLimituser] = useState(false)
    const [givemember, setGivemember] = useState(false)
    const [selectedPlat, setSelectedPlat] = useState({})
    const [datae, setDataa] = useState(JSON.parse(localStorage.getItem("userData")))
    const [name_voucher, setName_voucher] = useState('')
    const [code, setCode] = useState('')
    const [startDate, setstartDate] = useState("")
    const [expireDate, setexpireDate] = useState("")
    const [percent, setPercent] = useState('percent')
    const [minpurchase, setMinpurchase] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [numberuse, setNumberuse] = useState(0)
    const [couponType, setcouponType] = useState("Recette")
    const [listeMenu, setListeMenu] = useState([])
    const [listeFormule, setFormuleMenu] = useState([])
    const [listeMembers, setListeMembers] = useState([])
    const [listeIDMembers, setListeIDMembers] = useState([])
    const startdatee = moment().format()
    const deletePromotion = () => {

      setStateModal(false)
  
setTimeout(() => {
  dispatch(getVouchers()) 
}, 2000);
   }
const searchByTerm = (value) => {
   setSearchTerm(value)
   

}

      useEffect(() => {
        
         dispatch(getVouchers()) 
      }, [])
  
   //  const handleSubmitImage = (e) => {
   //     e.preventDefault()
   //     if(imageAsFile === '' ) {
   //       console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
   //     }
   //     else {
   //        let data = {
   //           promoName ,
   //           expireDate
   //        }
   //        dispatch(AddPromotions(data, imageAsFile))
   //     }
   //  }
   
const handleImgaeasFile = (e) => {
const image = e.target.files[0]
new Compressor(image, {
   quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
   success: (compressedResult) => {
     // compressedResult has the compressed file.
     // Use the compressed file to upload the images to your server.        
     setImageAsFile(imageFile => (compressedResult))
   },
 });
 

}
const addPlat = () => {
 
   if (name_voucher.length < 1 || couponType.length < 1 || code.length < 1 || moment(startDate) > moment(expireDate)|| moment(new Date()) > moment(expireDate) || minpurchase <= 1 || discount <= 1 )
  { 
  alert("Verify Info Voucher")
  } else {
    const startdate =  moment(startDate).format('YYYY-MM-DD')
    const expiredate =  moment(expireDate).format('YYYY-MM-DD')
    console.log(startDate)
    console.log(expiredate)
    console.log(code)
    console.log(limituser)
    console.log(numberuse)
    console.log(name_voucher)
    console.log(minpurchase)
    console.log(percent)
    console.log(listeMenu)
    
   dispatch(AddMenu(name_voucher, couponType, limituser, numberuse, code, startdate, expiredate , minpurchase, discount, percent, 0, listeMenu))
    setName_voucher("")
    setcouponType("Recette")
    setNumberuse(0)
    setCode("")
    setPercent("percent") 
    setMinpurchase(0)
    setDiscount(0)
   
  }
  }
      return (
         <div  style={{ width: '100%', overflow: 'auto' }}>
         <Row>
         <Col sm='12'>
           <Card>
             <CardHeader>
               <CardTitle tag='h4'> Ajouter code promo </CardTitle>
             </CardHeader>
             <CardBody>
               <Row>
                 <Col className='mb-2' xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
             Nom code promo:
             </Label>
             <Input required   value={name_voucher}     onChange={e => setName_voucher(e.target.value)} />
         
                 </Col>
                 <Col className='mb-2' xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
             type code promo:
             </Label>
             <Input onChange={e => {
                 setcouponType(e.target.value)
               if (e.target.value === 'Menu') {
               setScrollInnerModal(!scrollInnerModal)
              // checkedItems.clear()
               setPercent("percent") 
               } 
               if (e.target.value === 'Formule') {
                 setFormuleModal(!formuleModal)
               //  checkedItems.clear()
                 setPercent("percent") 
                 } 
               }} type='select' name='select' id='select-basic'>
             <option >Recette</option>
             <option  >Menu</option>
             <option  >Formule</option>
           </Input>
                 </Col>
                 <Col className='mb-2' xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
             nombre utilisation:
             </Label>
             <CustomInput 
 
       style={{backgroundColor: "black"}}
           type='switch'
           id='commentOnArticle'
           checked={limituser}
           onChange={e => setLimituser(e.target.checked)}
           name='customSwitch'
           label={limituser ? "Limited" : "unlimited"}
         />
         {
         limituser ? <Cleave className='form-control' value={numberuse}     onChange={e => setNumberuse(e.target.value)} placeholder='10' options={options} id='numeral-formatting' /> : null
           }
                 </Col>
                 <Col className='mb-2' xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
             Code:
             </Label>
             <Input required   value={code}     onChange={e => setCode(e.target.value)} />
         
                 </Col>
                 <Col className='mb-2' xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
             date debut:
             </Label>
             <input type="date" 
              className='form-control info'
              value={startDate} 
              onChange={(date) => setstartDate(date.target.value)}  />
                 </Col>
                 <Col className='mb-2' xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
            date expiration:
             </Label>
             <input type="date" className='form-control' value={expireDate} onChange={(date) => setexpireDate(date.target.value)}/>
                 </Col>
                 <Col xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
             minumum total:
             </Label>
             <Input required   value={minpurchase}     onChange={e => setMinpurchase(e.target.value)} />
         
                 </Col>
                 <Col xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
             remise:
             </Label>
             <Cleave value={discount} className='form-control' onChange={e => setDiscount(e.target.value)}  placeholder='10' options={options} id='numeral-formatting' />
   
                 </Col>
                 <Col xl='4' md='6' sm='12'>
                 <Label for='email-subject' className='form-label'>
            type remise:
             </Label>
             <Input onChange={e => setPercent(e.target.value)}  type='select' name='select' id='select-basic'>
            <option >percent</option>
             {couponType === "Recette" ? <option >amount</option> : null }
           </Input>
                 </Col>
               </Row>
             </CardBody>
           </Card>
         </Col>
 
       </Row>
       <Row>
       <Col>
          <div className='compose-footer-wrapper'>
      
                  </div>
                  </Col>
                  <Col>
          <div className='compose-footer-wrapper'>
             <div style={{justifyContent: 'center', padding: 20}} className='btn-wrapper d-flex align-items-center'>
               <UncontrolledButtonDropdown direction='up' className='mr-1'>
                 <Button color='signin'  style={{width : 300}} 
                  onClick={() => addPlat()}
                  >
add voucher</Button>
                
               </UncontrolledButtonDropdown>
            
             </div>
                  </div> 
                  </Col> 
       </Row>
     
   <div style={{
        marginTop: 20,
         
      
 width: '100%'}}>
  <Col sm='12'>
          <DataTableWithButtons
          mailss={store.Vouchers.vouchers}
      
          dispatch={dispatch}
          />
        </Col>
 {/*       
         { plats !== undefined ? plats.length === 0 ? <div></div> : plats.map((plat, index) => (
             <Col xl='2' md='2' sm='1' >
             <Card onClick={() => handleMailClick(plat)} style={{height: '10rem', justifyContent: 'center', textAlign: 'center', width: '10rem', backgroundColor: plat.enable === undefined || plat.enable === 1 ? 'white' : '#7f7f7f', opacity: plat.enable === undefined || plat.enable === 1 ? 1 : 0.2}} className='mb-3'>
               <CardImg style={{width: '80%', margin: '10%', height: '66px', marginBottom: 0}} top src={plat.image_plat} alt='card-top'/>
               <CardBody style={{marginBottom: 0, marginTop: 0,  padding: 0, justifyContent: 'center'}}>
                 <CardTitle style={{fontSize: 12, textAlign: 'center', margin: 0, height: '2rem', padding: 0}}  tag='h5'>{plat.name_plat}</CardTitle>
          
                   <Button color='signin'   style={{
     borderRadius: 25,
     width: '7rem',
     alignSelf: 'center',
     marginLeft: '15%',
     padding: 0,
     height: 25
   }} block >
                   {plat.price} {datae.currency || 'TND'}
                 </Button>
          
                 
               </CardBody>
             </Card>
           </Col>
       
         )) : <div></div>}
        */}
   
    
       </div>
       <div>
        
       <Modal  className={`modal-dialog-centered`} scrollable isOpen={formuleModal} toggle={() => setFormuleModal(!formuleModal)}>
        <ModalHeader toggle={() => setFormuleModal(!formuleModal)}>select formule</ModalHeader>
        <ModalBody>
       <button //onClick={handleCheck}
       >
  {//isCheckedAll ? 'Cancel' : 'Check All'
  }
 </button> 
      {/* <ListGroup>
        {plats !== undefined ? plats.map((v, i) => (
 <ListGroupItem   data-key={v.id}  onClick={handleCheck} style={{ backgroundColor: checkedItems.has(v.id) ? COLORS.rouge : 'white' }}
 className='d-flex' key={i}>
  <span className='mr-1'>
        <img height={30} width={30} src={v.image_plat}/>
      </span>
  <span
  style={{ color: checkedItems.has(v.id) ? 'white' : 'black' }}
 
       >
    {v.name_plat}
  </span>
 </ListGroupItem>
 )) :  null}
  </ListGroup>  */}
      
        </ModalBody>
        <ModalFooter>
          <Button color='signin' //</ModalFooter>onClick={() => AddFormules()}
          >
           ajouter
          </Button>
        </ModalFooter>
      </Modal>
    
{/*  
       <Modal  className={`modal-dialog-centered`} scrollable isOpen={scrollInnerModal} toggle={() => setScrollInnerModal(!scrollInnerModal)}>
        <ModalHeader toggle={() => setScrollInnerModal(!scrollInnerModal)}>select menu</ModalHeader>
        <ModalBody>
       <button onClick={handleCheck}>
  {isCheckedAll ? 'Cancel' : 'Check All'}
 </button> 
      <ListGroup>
        {mails.map((v, i) => (
 <ListGroupItem   data-key={v.id}  onClick={handleCheck} style={{ backgroundColor: checkedItems.has(v.id) ? COLORS.rouge : 'white' }}
 className='d-flex' key={i}>
  <span className='mr-1'>
        <img height={30} width={30} src={v.icon}/>
      </span>
  <span
  style={{ color: checkedItems.has(v.id) ? 'white' : 'black' }}
 
       >
    {v.name_menu}
  </span>
 </ListGroupItem>
 ))}
  </ListGroup> 
      
        </ModalBody>
        <ModalFooter>
          <Button color='signin' onClick={() => AddMenue()}>
          ajouter
          </Button>
        </ModalFooter>
      </Modal>
      <Modal  className={`modal-dialog-centered`} scrollable isOpen={givemember} toggle={() => setGivemember(!givemember)}>
        <ModalHeader toggle={() => setGivemember(!givemember)}>select menu</ModalHeader>
        <ModalBody>
     
      <ListGroup>
        {members.allDataallmember.map((v, i) => (
 <ListGroupItem    data-key={v.idUser}  onClick={() => gestionMembers(v)} style={{ backgroundColor: listeIDMembers.includes(v.idUser) === true ? COLORS.rouge : 'white' }}
 className='d-flex' key={i}>
  <span className='mr-1'>
        <img height={30} width={30} src={v.avatar}/>
      </span>
  <span
  style={{ color: listeIDMembers.includes(v.idUser) ? 'white' : 'black' }}
 
       >
    {v.lastname} {" "} {v.firstname} 
  </span>
  <span
  style={{marginLeft: '50%', color: listeIDMembers.includes(v.idUser) ? 'white' : 'black' }}
 
       >
    {v.Total}
  </span>
 </ListGroupItem>
 ))}
  </ListGroup> 
      
        </ModalBody>
        <ModalFooter>
          <Button color='signin' onClick={() => addPlat()}>
                 ajouter to member
          </Button>
        </ModalFooter>
      </Modal> */}
 
  
          </div>
 
       </div>
       
      );
 
}; 

export default ListVouchers;
