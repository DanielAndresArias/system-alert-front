import { useEffect, useState } from 'react';
import { Card, Typography, message, Input } from 'antd';
import { io } from 'socket.io-client';

const { Title, Paragraph } = Typography;

const socket = io('http://localhost:8080',
  {
  withCredentials: true,}
);

const CLAVE_CORRECTA = '4579';

const SerialDisplay = () => {
  const [mensaje, setMensaje] = useState('');
  const [claveIngresada, setClaveIngresada] = useState('');

  useEffect(() => {
    socket.on('serial-data', (data) => {
      // Concatenamos los datos entrantes
      const nuevaClave = claveIngresada + data;
      setClaveIngresada(nuevaClave);

      // Mostrar todo lo recibido
      setMensaje(() => data);

      // Si se completan los 4 caracteres, comparar
      if (nuevaClave.length === 4) {
        if (nuevaClave === CLAVE_CORRECTA) {
          socket.emit('enviar-comando', '1');
          message.success('Clave correcta. Se envió "1" al backend');
        } else {
          socket.emit('enviar-comando', '0');
          message.error('Clave incorrecta. Se envió "0" al backend');
        }

        // Reiniciar para la próxima entrada
        setClaveIngresada('');
      }
    });

    return () => {
      socket.off('serial-data');
    };
  }, [claveIngresada]);

  return (
    <Card style={{ margin: 20 }}>
      <Title level={4}>Datos desde el PIC</Title>
      <Paragraph code>{mensaje || 'Esperando datos...'}</Paragraph>

      <Paragraph>
        Clave actual recibida: <strong>{claveIngresada}</strong>
      </Paragraph>

      <Input
        style={{ maxWidth: 200 }}
        value={CLAVE_CORRECTA}
        disabled
        addonBefore="Clave esperada"
      />
    </Card>
  );
};


export default SerialDisplay;