import React, {useState} from 'react';
import axios from "axios";
import {Button, Col, Form, Input, Row} from 'antd';
import {useHistory} from "react-router-dom";

const Login = () => {
    const history = useHistory()

    const [err,setErr]= useState(null)
    const token = sessionStorage.getItem('x-auth-token')

    const onFinish = (values) => {
        const url = `https://${values.subdomain}.ox-sys.com/security/auth_check`
        const params = new URLSearchParams()
        params.append('_username', values.username)
        params.append('_password', values.password)
        params.append('_subdomain', values.subdomain)

        const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}

        axios.post(url, params, config)
            .then((result) => {
                sessionStorage.setItem('x-auth-token', result.data.token)
                sessionStorage.setItem('subdomain', values.subdomain)
               history.push('/')
            })
            .catch((err) => setErr(err))
    }

    if(token)
        return history.push('/')

    return  <Row justify="center" >
        <Col span={6}  style={{marginTop:"7rem"}}>
            <h1 style={{textAlign:'center'}}>SIGN IN</h1>
            <Form name="basic" labelCol={{span: 24,offset:9}} wrapperCol={{span: 24,}}
                initialValues={{remember: true}} onFinish={onFinish} autoComplete="off">

                <Form.Item label="Username" name="username" rules={[{required: true, message: 'Please input your username!'}]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!'}]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item label="subdomain" name="subdomain" rules={[{required: true, message: 'Please input your subdomain!'}]}>
                    <Input />
                </Form.Item>

                <Form.Item shouldUpdate wrapperCol={{offset: 0, span: 24}}>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>SIGN IN</Button>
                </Form.Item>

            </Form>

            {err !==null && <div style={{display:'flex',justifyContent:'center'}}><h1 style={{color:'red'}}>{err.message}</h1></div>}
        </Col>
    </Row>
}

export default Login;