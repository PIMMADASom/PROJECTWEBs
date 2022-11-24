import React from 'react';
import { Layout, Menu } from 'antd';
import { useState , useEffect } from 'react';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import './App.css';
import TreeMenu from 'react-simple-tree-menu';
import '../node_modules/react-simple-tree-menu/dist/main.css';
import axios from 'axios';
import 'antd/dist/antd.css';
import TabSam from './Sample/TabSam';
import TabTrain from './Train/TabTrain';
const treeData = require('./DirTree.json')

const { Header, Sider, Content } = Layout;

function App() {

  const [collapseds,setCollapseds] = useState(false)
  const [content,setContent] = useState(<TabSam />);
  const [image,setImage] = useState("");

  const toggle = () => {
    setCollapseds(!collapseds);
  };



  return (
    <Layout>
        <Sider trigger={null} collapsible collapsed={collapseds} width={300} 
          style={{
            height: '100%',
            overflow: 'auto',
          }}
          >


          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                <TreeMenu data={treeData} key="1"
                  onClickItem={
                    ({value}) => 
                      axios.get('http://127.0.0.1:5000/api',{params: {image:value}}).then(respons=>setImage(respons.data))
                      .then(setContent(
                      <img src={`data:image/jpeg;base64,${image}`} width="300px"/>
                      ))
                  }
                  hasSearch = {false}
                />
            <Menu.Item key="2" icon={<BarChartOutlined/>} onClick={() =>{setContent(<TabSam />);}}>
            sample_submission.csv
            </Menu.Item>
            <Menu.Item key="3" icon={<BarChartOutlined/>} onClick={() =>{setContent(<TabTrain />);}}>
            train_labels.csv
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapseds ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick:toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
  );
}

export default App;
