import 'antd/dist/reset.css';
import { Layout } from 'antd';
import SerialDisplay from './components/SerialDisplay';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ color: 'white' }}>Monitor Serie - PIC16F887</Header>
      <Content style={{ padding: 24, minHeight: '100%' }}>
        <SerialDisplay />
      </Content>
    </Layout>
  );
}

export default App;
