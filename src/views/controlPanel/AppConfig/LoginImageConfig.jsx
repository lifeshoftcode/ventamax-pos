import React, { useState, useEffect } from 'react';
import { Card, Upload, Button, message, Image, Spin } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from '../../../firebase/firebaseconfig';
import { MenuApp } from '../../templates/MenuApp/MenuApp';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginImageConfig = () => {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const loginImageRef = ref(storage, 'app-config/login-image');

    useEffect(() => {
        fetchCurrentImage();
    }, []);

    const fetchCurrentImage = async () => {
        try {
            const files = await listAll(loginImageRef);
            if (files.items.length > 0) {
                const url = await getDownloadURL(files.items[0]);
                setCurrentImage(url);
            }
        } catch (error) {
            console.error('Error fetching current image:', error);
            message.error('Error al cargar la imagen actual');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isImage) {
            message.error('Solo puedes subir archivos de imagen!');
            return false;
        }
        if (!isLt2M) {
            message.error('La imagen debe ser menor a 2MB!');
            return false;
        }
        return true;
    };

    const clearCurrentImage = async () => {
        try {
            setLoading(true);
            const files = await listAll(loginImageRef);
            await Promise.all(files.items.map(fileRef => deleteObject(fileRef)));
            setCurrentImage(null);
            message.success('Imagen eliminada correctamente');
        } catch (error) {
            console.error('Error clearing current image:', error);
            message.error('Error al eliminar la imagen');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (fileList.length === 0) return;
        
        try {
            setLoading(true);
            
            // Primero eliminar la imagen existente si hay una
            await clearCurrentImage();
            
            // Subir la nueva imagen
            const file = fileList[0].originFileObj;
            const imageRef = ref(loginImageRef, file.name);
            await uploadBytes(imageRef, file);
            
            // Obtener y establecer la nueva URL
            const url = await getDownloadURL(imageRef);
            setCurrentImage(url);
            setFileList([]);
            
            message.success('Imagen actualizada correctamente');
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Error al subir la imagen');
        } finally {
            setLoading(false);
        }
    };    const renderCurrentImage = () => {
        if (loading) return <StyledSpin size="large" />;
        if (!currentImage) return (
            <EmptyState>
                <p>No hay imagen configurada</p>
                <p className="subtitle">Selecciona una imagen para la pantalla de login</p>
            </EmptyState>
        );
        
        return (
            <ImageContainer>
                <Image
                    src={currentImage}
                    alt="Login"
                    preview={false}
                />
                <DeleteButton
                    icon={<DeleteOutlined />}
                    onClick={clearCurrentImage}
                >
                    Eliminar
                </DeleteButton>
            </ImageContainer>
        );
    };return (
        <PageWrapper>
            <MenuApp
                sectionName="Imagen de Login"
                showBackButton={true}
                onBackClick={() => navigate(-1)}
            />
            <ContentWrapper>
                <ImageSection>
                    {renderCurrentImage()}
                </ImageSection>
                
                <ActionSection>
                    <Upload
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        fileList={fileList}
                        maxCount={1}
                        showUploadList={false}
                    >
                        <Button 
                            icon={<UploadOutlined />}
                            size="large"
                        >
                            Seleccionar Imagen
                        </Button>
                    </Upload>
                    
                    {fileList.length > 0 && (
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={loading}
                            size="large"
                        >
                            Guardar Cambios
                        </Button>
                    )}
                </ActionSection>
            </ContentWrapper>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    min-height: 100vh;
    background: transparent;
`;

const ContentWrapper = styled.div`
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

const ImageSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 2rem;
    padding: 1rem;
`;

const ActionSection = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const ImageContainer = styled.div`
    position: relative;
    
    .ant-image {
        max-width: 100%;
        img {
            max-height: 300px;
            object-fit: contain;
        }
    }
`;

const DeleteButton = styled(Button)`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(0, 0, 0, 0.8);
        color: white;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    color: #8c8c8c;
    
    p {
        margin: 0;
        &.subtitle {
            font-size: 0.9em;
            margin-top: 0.5rem;
            color: #bfbfbf;
        }
    }
`;

const StyledSpin = styled(Spin)`
    .ant-spin-dot-item {
        background-color: #1890ff;
    }
`;

export default LoginImageConfig;
