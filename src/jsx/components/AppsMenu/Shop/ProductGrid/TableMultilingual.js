// ** React Imports
import React ,{ Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Archive, ChevronDown, Edit, FileText, MoreVertical, PlusCircle, Trash } from 'react-feather'

import DataTable from 'react-data-table-component'
import Modal from 'reactstrap/lib/Modal'
import Cleave from 'cleave.js/react'

import { Card, CardHeader, CardTitle, CardFooter, CardText, Input, Label, Row, Col, ModalHeader, ModalBody, ListGroup, ListGroupItem, ModalFooter, CardBody, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import DropdownMenu from 'reactstrap/lib/DropdownMenu'
import DropdownItem from 'reactstrap/lib/DropdownItem'
import Badge from 'reactstrap/lib/Badge'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CustomInput from 'reactstrap/lib/CustomInput'
import UncontrolledButtonDropdown from 'reactstrap/lib/UncontrolledButtonDropdown'
import { FaFolderOpen, FaLayerGroup, FaScroll } from 'react-icons/fa'
import { enableVouchers, desableVouchers, deleteVouchers, UpdateMenu } from '../../../../store/actions/vouchers_actions'

const MySwal = withReactContent(Swal)
const moment = require('moment')

const status = {
  0: { title: 'Active', color: 'light-success' },
  1: { title: 'Disabled', color: 'light-danger' }
}
const DataTableWithButtons = ({mailss, dispatch}) => {
  // ** State  
  const options = { numeral: true } 
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [scrollInnerModal, setScrollInnerModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)

  const [selectedMenu, setSelectedMenu] = useState('')
  const [selectedMenuID, setSelectedMenuID] = useState('')
  
  const [limituser, setLimituser] = useState(false)
  const [selectedPlat, setSelectedPlat] = useState({})
  const [datae, setDataa] = useState(JSON.parse(localStorage.getItem("userData")))
  const [name_voucher, setName_voucher] = useState('')
  const [code, setCode] = useState('')
  const [startDate, setstartDate] = useState(new Date())
  const [expireDate, setexpireDate] = useState(new Date())
  const [percent, setPercent] = useState('percent')
  const [minpurchase, setMinpurchase] = useState(0)
  const [id, setID] = useState('')
  const [discount, setDiscount] = useState(0)
  const [numberuse, setNumberuse] = useState(0)
  const [couponType, setcouponType] = useState("")
  const [listeMenu, setListeMenu] = useState([])
  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
  const activateVoucher = (idvoucher) => {
    dispatch(enableVouchers(idvoucher))
  }
  const desactivateVoucher = (idvoucher) => {
    dispatch(desableVouchers(idvoucher))
  }
  const deleteVoucher = (idvoucher) => {
    MySwal.fire({
      title: "Are you sure ?",
      text: "to delete Vouchers",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "yes, delete it!",
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
if (result.isConfirmed) {
    dispatch(deleteVouchers(idvoucher))
}
    })
   
  }
  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)
    const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

    if (value.length) {
      updatedData = mailss.filter(item => {
        const startsWith =
          item.title.toLowerCase().startsWith(value.toLowerCase()) ||
          item.code.toLowerCase().startsWith(value.toLowerCase()) 

        const includes =
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.code.toLowerCase().includes(value.toLowerCase()) 

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }
  const addPlat = (val, avatar) => {
 
    if (name_voucher.length < 1 || couponType.length < 1 || code.length < 1 || moment(startDate[0]) > moment(expireDate[0]) || moment(new Date()) > moment(expireDate[0]) || minpurchase <= 1 || discount <= 1) { 
   alert("Verify Info Voucher")
   } else {
     const startdate =  moment(startDate[0]).format('L')
     const expiredate =  moment(expireDate[0]).format('L')
     console.log(startDate[0])
     console.log(couponType)
 
     dispatch(UpdateMenu(name_voucher, couponType, limituser, numberuse, code, startdate, expiredate, minpurchase, discount, percent, 0, listeMenu, id))
     setUpdateModal(false)
   }
   }
  const handleFilterByType = (e, val) => {
 
    const value = e
    let updatedData = []
    setSearchValue(value)
    const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

    if (value.length) {
   if (value === "All") {
        updatedData = mailss
        setFilteredData(updatedData)
        setSearchValue(value)
   } else if (value === "Formule") {
      updatedData = mailss.filter(item => {
        const startsWith =
          item.couponType.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.couponType.toLowerCase().includes(value.toLowerCase()) 
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    } else if (value === "Recette") {
      updatedData = mailss.filter(item => {
        const startsWith =
          item.couponType.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.couponType.toLowerCase().includes(value.toLowerCase()) 
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    } else if (value === "Menu") {
   
      updatedData = mailss.filter(item => {

        const startsWith =
          item.listeMenu.find(res => res.name === val)

        const includes =
        item.listeMenu.includes(val)

        if (startsWith !== undefined) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
    }
  }
  const multiLingColumns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Code',
      selector: 'code',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Min Purchase',
      selector: 'minPurchase',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Discount/amount',
      selector: 'discount',
      sortable: true,
      minWidth: '150px'
    },
  
    {
      name: 'Discount type',
      selector: 'typeDiscount',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Coupon type',
      selector: 'couponType',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Start Date',
      selector: 'startDate',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Expire Date',
      selector: 'expireDate',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '150px',
      
      cell: row => {
        if (moment(row.expireDate) < moment(new Date())) {
        return (
          <Badge cssModule={{borderColor: 'black', borderWidth : 2}} color={status[1].color} pill>
            {status[1].title}
          </Badge>
        )
      } else {
        return (
          <Badge cssModule={{borderColor: 'black', borderWidth : 2}} onClick={() => {
            if (row.status === 1) {
            activateVoucher(row.id)
            } else {
              desactivateVoucher(row.id)
            }

            }} color={status[row.status].color} pill>
            {status[row.status].title}
          </Badge>
        )
      }
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div  className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => {
                  setName_voucher(row.title)
                  setcouponType(row.typeDiscount)
                  setNumberuse(row.numberUse)
                  setCode(row.code)
                  setstartDate(row.startDate)
                  setexpireDate(row.expireDate)
                  setMinpurchase(row.minPurchase)
                  setDiscount(row.discount)
                  setLimituser(row.typeUse)
                  setID(row.id)
                  setUpdateModal(!updateModal)
                }}>
                  <Archive size={15} />
                  <span className='align-middle ml-50'>Edit</span>
                </DropdownItem>
                <DropdownItem onClick={() => deleteVoucher(row.id)}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
           
          </div>
        )
      }
    }
  ]
  // ** Pagination Previous Component
  const Previous = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
        next
        </span>
      </Fragment>
    )
  }

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
        next
        </span>
      </Fragment>
    )
  }

  // ** Custom Pagination Component
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous size={15} />}
      nextLabel={<Next size={15} />}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 7 : mailss.length / 7 || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate pagination-sm justify-content-end pr-1 mt-1'}
    />
  )

  return (
    <>
       <div style={{flexDirection: 'row',
display: 'flex',
overflow: 'overlay',
overflowY: 'hidden',
width: '100%' }}>
        <div
                 onClick={() => {
                 
                  handleFilterByType("All", "")
                  setSelectedMenu('All') 
                  setSelectedMenuID(1) 
                  //setScrollInnerModal(true)
                
                }}
                  style={{
    height: 100,
    width: 60,
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 10}}>
                    <div
                      style={
                        {
                          padding: 20,
                        height: 65,
                        width: 60,
                        borderRadius: 15,
                          backgroundColor:
                          selectedMenu === 'All' ? "red" :  "yellow"
                        }
                      }>
                      <FaLayerGroup size={25} />
                    </div>
                    <h3
                      style={{
                      fontSize: 12,
                        textAlign: 'center',
                        color:
                      "black",
                        fontWeight: 'bold'
                      }}>
                     tous recette
                        </h3>
                  </div>
                  <div
                 onClick={() => {
                 
                  handleFilterByType("Recette", "")
                  setSelectedMenu('Recette') 
                  setSelectedMenuID(1) 
                  //setScrollInnerModal(true)
                
                }}
                  style={{
    height: 100,
    width: 60,
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 10}}>
                    <div
                      style={
                        {
                          padding: 20,
                        height: 65,
                        width: 60,
                        borderRadius: 15,
                          backgroundColor:
                          selectedMenu === 'Recette' ? "red" :  "yellow"
                        }
                      }>
                      {/* <FaScroll size={25} /> */}
                    </div>
                    <h3
                      style={{
                      fontSize: 12,
                        textAlign: 'center',
                        color:
                      "black",
                        fontWeight: 'bold'
                      }}>
                    Recette
                        </h3>
                  </div>
                  <div
                  onClick={() => {
                    
                    handleFilterByType("Formule", "")
                    setSelectedMenu('Formule') 
                    setSelectedMenuID(1) 
                  }}
                   style={{
     height: 100,
     width: 60,
     marginTop: 10,
     marginLeft: 12,
     borderRadius: 10}}>
                     <div
                       style={
                         {
                           padding: 5,
                         height: 65,
                         width: 60,
                         borderRadius: 15,
                           backgroundColor:
                           selectedMenu === 'Formule' ? "red" :  "yellow"
                         }
                       }>
  {/* <img style={{height: '100%', width: '100%'}} src={require(`@src/assets/images/icons/iconformules.png`).default} /> */}
                     </div>
                      <h4
                       style={{
                       fontSize: 12,
                         textAlign: 'center',
                         color:
                      "black",
                         fontWeight: 'bold'
                       }}>
                    formule
                         </h4>
                   </div>
                 {/* { mails.length === 0 ? <div>
                   
                 </div> : mails.map((mail, index) => (
                    <div key={index}
                  onClick={() => {
              
                    setSelectedMenu(mail.name_menu) 
                    setSelectedMenuID(mail.id) 
                    handleFilterByType("Menu", mail.name_menu)
                   
                  }}
                   style={{
     height: 100,
     width: 60,
     marginTop: 10,
     marginLeft: 12,
     borderRadius: 10}}>
                     <div
                       style={
                         {
                           padding: 5,
                         height: 65,
                         width: 60,
                         borderRadius: 15,
                           backgroundColor:
                           selectedMenu === mail.name_menu ? "red" :  "yellow"
                         }
                       }>
                       <img height={50} width={50} src={mail.icon}/>
                     </div>
                     <h4
                       style={{
                       fontSize: 12,
                         textAlign: 'center',
                         color:
                        "black",
                         fontWeight: 'bold'
                       }}>
                       {mail.name_menu}
                         </h4>
                   </div>
                
                 ))} */}
              </div>
      
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Coupon list</CardTitle>
      </CardHeader>
      <Row className='justify-content-end mx-0'>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
          <Label className='mr-1' for='search-input-1'>
          recherche
          </Label>
          <Input
            className='dataTable-filter mb-50'
            type='text'
            bsSize='sm'
            id='search-input-1'
            value={searchValue}
            onChange={handleFilter}
          />
        </Col>
      </Row>
      <DataTable
        noHeader
        pagination
        selectableRowsNoSelectAll
        columns={multiLingColumns}
        className='react-dataTable'
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={searchValue.length ? filteredData : mailss}
      />
      <CardFooter>
        <CardText className='mb-0'>
          <span className='font-weight-bold'>Note:</span>{' '}
          <span>Use Intl Dropdown in Navbar to change table language</span>
        </CardText>
      </CardFooter>
    </Card>
    <Modal isOpen={updateModal} toggle={() => setUpdateModal(!updateModal)}>
       <ModalHeader toggle={() => setUpdateModal(!updateModal)}>select Menu</ModalHeader>
      <ModalBody>
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'> update voucher</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                <Label for='email-subject' className='form-label'>
            nom voucher:
            </Label>
            <Input required   value={name_voucher}     onChange={e => setName_voucher(e.target.value)} />
        
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                <Label for='email-subject' className='form-label'>
           type coupon:
            </Label>
            <Input onChange={e => {
                setcouponType(e.target.value)
              if (e.target.value === 'Menu') {
              setScrollInnerModal(!scrollInnerModal)
              }
              }} type='select' name='select' id='select-basic'>
            <option >Recette</option>
            <option  >Menu</option>
            <option  >formule</option>
          </Input>
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                <Label for='email-subject' className='form-label'>
           limit user:
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
            code:
            </Label>
            <Input required   value={code}     onChange={e => setCode(e.target.value)} />
        
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                <Label for='email-subject' className='form-label'>
           date debut:
            </Label>
            <input type="date"  className='form-control info' value={startDate} onChange={date => setstartDate(date.target.value)}  />
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                <Label for='email-subject' className='form-label'>
            expiration date:
            </Label>
            <input type="date"className='form-control' value={expireDate} onChange={date => setexpireDate(date.target.value)}/>
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
           
          </Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Col>
         <div className='compose-footer-wrapper'>
            <div style={{justifyContent: 'center', padding: 20}} className='btn-wrapper d-flex align-items-center'>
              <UncontrolledButtonDropdown direction='up' className='mr-1'>
                <Button color='signin' onClick={() => addPlat()}>
             update voucher
                </Button>
               
              </UncontrolledButtonDropdown>
           
            </div>
                 </div>
                 </Col>
 
      </ModalBody>
    </Modal>
   </>
  )
}

export default DataTableWithButtons