import React, { useState } from "react";
import styled from "styled-components";
import "../Header/HomeHeader.css";
import { useSnackbar } from "notistack";
import services from "../../../services";
import { Button } from "@mui/material";

const Contact = () => {
  const [form, setForm] = useState({
    email: "", //currentUser.email,
    message: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  function updateForm(key: string, value: string) {
    setForm({ ...form, [key]: value });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    updateForm(name, value);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    services
      .createNewMessage(form)
      .then(() => {
        enqueueSnackbar("Message successfully sent !", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Incorrect entry !", { variant: "error" });
        console.log(err);
      });
  }

  return (
    <Container id="contact">
      <Wrapper>
        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        <FormContainer onChange={handleChange}>
          <Title>
            Questions? <br /> Let's Get In Touch
          </Title>
          <Form>
            <Input placeholder="Your Email" name="email" />
            <TextArea placeholder="Your Message" name="message" />
            <Button variant="contained" onClick={handleSubmit}>
              Send Message
            </Button>
          </Form>
        </FormContainer>
      </Wrapper>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  height: 100vh;
  background: rgb(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  color: white;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  width: 50%;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 50px;
  margin-top: 0;
  text-align: center;
  @media only screen and (max-width: 480px) {
    margin: 20px;
  }
`;

const Form = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 400px;

  padding: 20px;
  color: white;
  background: rgb(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  @media only screen and (max-width: 900px) {
    padding: 5px;
    width: 200px;
  }
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 80%;
  padding: 20px;
  background: rgb(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  color: white;
  @media only screen and (max-width: 900px) {
    padding: 5px;
    margin-top: 20px;
    width: 200px;
  }
`;
