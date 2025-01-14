import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ModalColmeia/index.js";
import Header from "../../components/HeaderPrincipal/index.js";
import {
  faPlus,
  faLocationDot,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { GiBee } from 'react-icons/gi';
import {
  AppBody,
  Text,
  Botao,
  BotaoTexto,
  BotaoContainer,
  Main,
  StyledIcon,
  Container,
  ContainerPrincipal,
  Footer,
} from './styles'; // Supondo que seus estilos estão em um arquivo separado

const Home = () => {
  const navigate = useNavigate();

  // Estado para exibir ou ocultar a Modal
  const [showModal, setShowModal] = useState(false);

  // Estado para armazenar as colmeias
  const [colmeias, setColmeias] = useState({
    MELGUEIRA: { vazia: 0, em_campo: 0 },
    NINHO: { vazia: 0, em_campo: 0 },
    NUCLEO: { vazia: 0, em_campo: 0 },
  });

  // Função para abrir/fechar a Modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Função para adicionar colmeia
  const handleAddColmeia = ({ tipo_colmeia, quantidade, estado }) => {
    const updatedColmeias = {
      ...colmeias,
      [tipo_colmeia]: {
        ...colmeias[tipo_colmeia],
        [estado.toLowerCase()]: colmeias[tipo_colmeia][estado.toLowerCase()] + parseInt(quantidade, 10),
      },
    };

    setShowModal(false);

    setColmeias(updatedColmeias);

    // Redireciona para a página Colmeias com os dados atualizados
    navigate("/colmeias", { state: { colmeias: updatedColmeias } });
  };

  return (
    <AppBody>
      <Header />
      <Main>
        <ContainerPrincipal>
          <Text>Acesso rápido</Text>
          <Container>
            <BotaoContainer>
              <Botao onClick={toggleModal}>
                <StyledIcon icon={faPlus} />
                <BotaoTexto>Adicionar Colmeia</BotaoTexto>
              </Botao>

              <Botao onClick={() => navigate("/colmeias", { state: { colmeias } })}>
                <StyledIcon icon={faBoxArchive} />
                <BotaoTexto>Colmeias</BotaoTexto>
              </Botao>
            </BotaoContainer>

            <BotaoContainer>
              <Botao>
                <StyledIcon icon={faLocationDot} />
                <BotaoTexto>Geolocalização</BotaoTexto>
              </Botao>

              <Botao onClick={() => navigate("/apiarios")}>
                <GiBee size={20} style={{ marginRight: '5px' }} />
                <BotaoTexto>Apiários</BotaoTexto>
              </Botao>
            </BotaoContainer>

            <Modal
              isOpen={showModal}
              closeModal={toggleModal}
              onAddColmeia={handleAddColmeia}
            />
          </Container>
        </ContainerPrincipal>
      </Main>
      <Footer></Footer>
    </AppBody>
  );
};

export default Home;
