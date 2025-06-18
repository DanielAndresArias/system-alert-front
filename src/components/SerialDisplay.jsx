import { useEffect, useState } from 'react';
import { Card, Typography, message, Input, Button, Space } from 'antd';
import { io } from 'socket.io-client';

const { Title, Paragraph } = Typography;

const socket = io('http://localhost:8080',
  {
  withCredentials: true,}
);

const SerialDisplay = () => {
  const [claveCorrecta, setClaveCorrecta] = useState('1234');
  const [claveIngresada, setClaveIngresada] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    socket.on('serial-data', async(data) => {
      // Concatenamos los datos entrantes
      const clave = await data;
      setClaveIngresada(() => clave);
      // Si se completan los 4 caracteres, comparar
      if (clave.length === 4) {
        if (clave === claveCorrecta) {
          socket.emit('enviar-comando', '1');
          message.success('Clave correcta. Se envió "1" al backend');
        } else {
          socket.emit('enviar-comando', '0');
          message.error('Clave incorrecta. Se envió "0" al backend');
        }
      }
    });

    return () => {
      socket.off('serial-data');
    };
  }, [claveIngresada, claveCorrecta]);

  const changeClaveCorrecta = (e) => {
    setClaveCorrecta(e?.target?.value)
  }

  const changeClave = () => {
    setDisabled(() => !disabled)
  }

  return (
    <Card style={{ margin: 20 }}>
      <Title level={4}>Datos desde el PIC</Title>
      <Paragraph>
        Clave actual recibida: <strong>{claveIngresada}</strong>
      </Paragraph>
      <Space size={15}>
        <Input
          style={{ maxWidth: 200 }}
          value={claveCorrecta}
          addonBefore="Clave esperada"
          onChange={changeClaveCorrecta}
          disabled={disabled}
          maxLength={4}
        />
        <Button type="primary" onClick={changeClave}>{disabled? 'Cambiar clave' : 'Aceptar'}</Button>
      </Space>
    </Card>
  );
};


export default SerialDisplay;