import React, { useState } from 'react';
import { Upload, Button, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const LoginImageConfig = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (file) => {
        setLoading(true);
        try {
            // Aquí irá la lógica para subir la imagen
            // Por ejemplo, usando Firebase Storage o tu servicio preferido
            message.success('Imagen actualizada correctamente');
            setImageUrl(URL.createObjectURL(file));
        } catch (error) {
            message.error('Error al subir la imagen');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const uploadProps = {
        name: 'file',
        accept: 'image/*',
        showUploadList: false,
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('Solo puedes subir archivos de imagen!');
                return false;
            }
            handleUpload(file);
            return false;
        },
    };

    return (
        <Container>
            <StyledCard title="Configuración de Imagen de Login">
                <div className="upload-section">
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />} loading={loading}>
                            Seleccionar Imagen
                        </Button>
                    </Upload>
                </div>
                {imageUrl && (
                    <PreviewSection>
                        <h3>Vista Previa:</h3>
                        <img src={imageUrl} alt="Vista previa" />
                    </PreviewSection>
                )}
            </StyledCard>
        </Container>
    );
};

const Container = styled.div`
    padding: 24px;
    max-width: 800px;
    margin: 0 auto;
`;

const StyledCard = styled(Card)`
    .upload-section {
        text-align: center;
        margin-bottom: 20px;
    }
`;

const PreviewSection = styled.div`
    text-align: center;
    
    img {
        max-width: 100%;
        max-height: 300px;
        margin-top: 16px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
`;

export default LoginImageConfig;
