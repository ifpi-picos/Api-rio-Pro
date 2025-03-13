import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBody,
  H2,
  H1,
  Main,
  P1,
  ContainerInputs,
  Container,
  EmailIcone,
  PasswordIcone,
  Input,
  Form,
  Button,
  ContainerButton,
  ContainerTitulo,
  ContainerPrincipal,
  ContainerCadastro,
  ContainerText,
  PLogin,
  LinkLogin,
  UserIcone,
} from './styles'; // Supondo que você tenha seus estilos em um arquivo separado

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem antes de enviar
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("https://projeto-full-stack-apiariopro.onrender.com/usuarios/cadastrar",  {  // Use variável de ambiente para URL
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha
      });

      if (response.status === 201) {
        alert("Usuário cadastrado com sucesso!");
        setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" }); // Limpa o formulário
        navigate("/login"); // Redireciona para a página de login
      }
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <AppBody>
      <ContainerPrincipal>
        <ContainerCadastro>
          <Main>
            <Form onSubmit={handleSubmit}>
              <ContainerTitulo>
                <H1>CADASTRO</H1>
              </ContainerTitulo>
        
              <ContainerInputs>
                <Container>
                  <UserIcone />
                  <Input
                    type="text"
                    placeholder="NOME COMPLETO"
                    required
                    autoFocus
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    maxLength={40}
                  />
                </Container>
                <Container>
                  <EmailIcone />
                  <Input
                    type="email"
                    placeholder="E-MAIL"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={40}
                  />
                </Container>
                <Container>
                  <PasswordIcone />
                  <Input
                    type="password"
                    placeholder="SENHA"
                    required
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    maxLength={30}
                  />
                </Container>
                <Container>
                  <PasswordIcone />
                  <Input
                    type="password"
                    placeholder="CONFIRME SUA SENHA"
                    required
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    maxLength={30}
                  />
                </Container>
              </ContainerInputs>

              <ContainerButton>
                <Button type="submit">CADASTRAR</Button>
              </ContainerButton>

              <ContainerText>
                <PLogin>JÁ POSSUI CADASTRO?</PLogin>
                <LinkLogin onClick={() => navigate("/login")}>Login!</LinkLogin>
              </ContainerText>
            </Form>
          </Main>
        </ContainerCadastro>
      </ContainerPrincipal>
    </AppBody>
  );
}

export default Cadastro;
