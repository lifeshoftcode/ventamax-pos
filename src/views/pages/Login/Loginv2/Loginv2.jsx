import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/userSlice";
import { Login } from "./Login";
import imgDefault from "./imgs/Imagen de WhatsApp 2024-03-20 a las 16.08.41_2d4b60ad.jpg";
import { Button, Spin, Skeleton } from "antd";
import { icons } from "../../../../constants/icons/icons";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseconfig";

export const LoginV2 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Estado para controlar el loading mientras carga la imagen
  const [imageLoading, setImageLoading] = useState(true);
  const user = useSelector(selectUser);
  const homePath = "/home";
  // Estado para almacenar la URL de la imagen de login
  const [loginImage, setLoginImage] = useState(null);
  // Controla el fade‑in de la imagen
  const [imageLoaded, setImageLoaded] = useState(false);
  // Función para cargar la imagen desde Firebase Storage
  const fetchLoginImage = async () => {
    setImageLoading(true);
    try {
      const loginImageRef = ref(storage, "app-config/login-image");
      const files = await listAll(loginImageRef);
      if (files.items.length > 0) {
        const url = await getDownloadURL(files.items[0]);
        setLoginImage(url);
      } else {
        // Si no hay imágenes, desactivamos el loading
        setImageLoading(false);
      }
    } catch (error) {
      console.error("Error al cargar la imagen de login:", error);
      // Si hay error, simplemente usaremos la imagen por defecto
      setImageLoading(false);
    }
  };

  useEffect(() => {
    // Cargar la imagen al montar el componente
    fetchLoginImage();
  }, []);

  useEffect(() => {
    // Reiniciar la animación cuando cambia la imagen que se muestra
    setImageLoaded(false);
  }, [loginImage]);

  useEffect(() => {
    if (user === null) return; // Estado inicial
    if (user === false) return; // Usuario no autenticado, quedarse en login

    // Si hay usuario o token válido, redirigir a home
    const sessionToken = localStorage.getItem("sessionToken");
    const sessionExpires = localStorage.getItem("sessionExpires");

    if (user || (sessionToken && sessionExpires && Date.now() < parseInt(sessionExpires))) {
      navigate(homePath, { replace: true });
    }
  }, [user, navigate]);

  const goToHome = () => navigate("/");

  const displayedImage = loginImage;

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {/* Spin a pantalla completa mientras la imagen está cargando */}
      
      <Spin spinning={loading} tip="Cargando..." size="large">
        <Background>
          <Container>
            <ImagenContainer>
              <ButtonBack icon={icons.arrows.arrowLeft} onClick={goToHome}>
                Volver
              </ButtonBack>
              <Imagen loaded={imageLoaded}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  src={displayedImage}
                  onLoad={() => {
                    setImageLoaded(true);
                    setImageLoading(false);
                  }}
                />
              </Imagen>
            </ImagenContainer>
            <Login setLoading={setLoading} />
          </Container>
        </Background>
      </Spin>
    </div>
  );
};

/* ------------------------------- Estilos ------------------------------- */

const Background = styled.div`
  background-color: #4d4d4d;
  height: 100vh;
  overflow-y: auto;
`;

const ButtonBack = styled(Button)`
  position: absolute;
  cursor: pointer;
  display: flex;
  top: 2em;
  left: 2em;
  align-items: center;
  gap: 0.5em;
`;

const Imagen = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: 1em;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
   
  }
`;

const ImagenContainer = styled.div`
  padding: 1em;
  height: 100vh;
  max-height: 800px;
  position: relative;
  padding-right: 0;

  @media (max-width: 800px) {
    display: none;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1366px;
  max-height: 800px;
  height: 100vh;
  margin: 0 auto;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    justify-content: center;
    justify-items: center;
  }
`;
