import React, {useEffect, useState} from 'react';
import axios from "axios";
import DataTable from "./DataTable";
import {useHistory} from "react-router-dom";
import {Button, Col, Pagination, Row, Spin} from "antd";
import { Input} from 'antd';
import {filter} from "./Common/filter";
const { Search } = Input;

const Home = () => {
    const history = useHistory()

    const [items, setItems] = useState(null)
    const [totalCount, setTotalCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [isPending, setIsPending] = useState(false)
    const [isSearch, setIsSearch] = useState(null)
    const [searchText, setSearchText] = useState(null)

    const token = sessionStorage.getItem('x-auth-token')
    const subdomain = sessionStorage.getItem('subdomain')

    const searchFilter = (items,keyword)=>{
        if(items.length!==0&&searchText){
            const res= items.filter(o => o.name.toLowerCase().includes(keyword.toLowerCase())).sort((a, b) => a.name.toLowerCase().indexOf(keyword.toLowerCase()) - b.name.toLowerCase().indexOf(keyword.toLowerCase()))
            console.log(res)
            setItems(res)
        }
    }

    const sendToServer = (size, page) => {
        const url = `https://${subdomain}.ox-sys.com/variations`
        const config = {headers: {Authorization: `Bearer ${token}`}}
        const params = {size, page}
        setIsPending(true)
        axios.post(url, params, config)
            .then(result => {
                setTotalCount(result.data.total_count)
                setCurrentPage(result.data.page)
                setIsPending(false)
                const res = filter(result.data.items)
                if(searchText){
                    searchFilter(res,searchText)
                }else{
                    setItems(res)
                }
            })
            .catch(err => {
                console.log(err)
                setIsPending(false)
            })
    }

    function onChange(page, size) {sendToServer(size, page)}

    const logOutHandle = ()=> {
        sessionStorage.clear()
        history.push('/login')
    }

    useEffect(() => {
        if (token) {
            setIsPending(true)
            sendToServer(10, 1)
        } else {
            history.push('/login')
        }
    }, [token])

    const handleSearchChange=(e)=>{
        setSearchText(e.target.value)
    }

    if(searchText!==null&&searchText===''){
        setSearchText(null)
    }

    const onSearch = () => {
        setIsSearch(true)
        searchFilter(items,searchText)
    }

    return (<div>
            <Row>
                <Col span={24} style={{display: 'flex', justifyContent: 'space-between',alignItems:'center',paddingTop:'0.3rem'}}>
                    <h1>PRODUCTS</h1>
                    <Button type="danger" style={{marginRight:"0.5rem"}} onClick={logOutHandle}>LOG OUT</Button>
                </Col>
            </Row>
            <Row justify="center" style={{marginBottom:'1rem'}}>
                <Col span={12}>
                <Search placeholder="search filter" size={'large'} onChange={handleSearchChange}  onSearch={onSearch} enterButton />
                </Col>
            </Row>
            <Row justify="center">
                    {
                        <Col span={24} style={{display:'flex',justifyContent:'center'}}>
                            <Pagination showQuickJumper defaultCurrent={currentPage} total={totalCount} onChange={onChange}/>
                        </Col>}
            </Row>
            {items !==null &&items.length !==0
                ? !isPending ?<DataTable item={items}  searchText={searchText} isSearch={isSearch}/> :<h1 style={{textAlign:'center',marginTop:'2rem'}}> <Spin size="large" /></h1>
                :searchText!==null ?<h1 style={{display:'flex',justifyContent:'center',marginTop:'1rem'}}><i>{searchText +' not defined'}</i></h1>:''
            }
        </div>
    )
}

export default Home;