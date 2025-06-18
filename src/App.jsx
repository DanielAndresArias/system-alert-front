import 'antd/dist/reset.css';
import { Layout } from 'antd';
import SerialDisplay from './components/SerialDisplay';
import { Footer } from 'antd/es/layout/layout';

const { Header, Content } = Layout;

function App() {
  return (
    <div>
      <Header style={{ color: 'white' }}>Monitor Serie - PIC16F887</Header>
      <Content style={{ padding: 24 }}>
        <SerialDisplay />
      </Content>
    </div>
  );
}

export default App;
