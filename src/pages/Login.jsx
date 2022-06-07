import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import services from "../services";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useSnackbar } from "notistack";
import styled, { css } from "styled-components";

export default function Login() {
  const { setLogged } = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    services
      .login(body)
      .then((result) => {
        const { jwt } = result.data;
        localStorage.setItem("jwt", jwt);
        setLogged(true);
        enqueueSnackbar("Successfully Login", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Incorrect Login", { variant: "error" });
      });
  }

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    updateBody(name, value);
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
      <CardWrapper>
        <CardHeader>
          <CardHeading>Login</CardHeading>
        </CardHeader>

        <CardBody autoComplete="off" onChange={handleChange}>
          <CardFieldset>
            <CardInput placeholder="E-mail" type="text" name="email" required />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            <CardIcon className="fa fa-eye" eye small />
          </CardFieldset>

          <CardFieldset>
            <Button
              style={{ width: "20%", alignSelf: "center" }}
              variant="outlined"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </CardFieldset>

          <CardFieldset>
            <CardLink>
              <Link to="/signin">{"I do not have an account yet"}</Link>
            </CardLink>
          </CardFieldset>

          <CardFieldset>
            <CardLink>
              <Link to="/forgot">{"Forgot your password ?"}</Link>
            </CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
}

const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 300px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;

const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`;

const CardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;

const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;

  & + & {
    margin-top: 24px;
  }

  &:nth-last-of-type(2) {
    margin-top: 32px;
  }

  &:last-of-type {
    text-align: center;
  }
`;

const CardInput = styled.input`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;

  &:focus {
    border-bottom-color: #1990e5;
    outline: 0;
  }
`;

const CardIcon = styled.span`
  color: #666;
  cursor: pointer;
  opacity: 0.25;
  transition: opacity 0.25s ease-in;

  &:hover {
    opacity: 0.95;
  }

  ${(props) =>
    props.big &&
    css`
      font-size: 26px;
    `}

  ${(props) =>
    props.eye &&
    css`
      position: absolute;
      top: 8px;
      right: 0;
    `}

  ${(props) =>
    props.small &&
    css`
      font-size: 14px;
    `}
`;

const CardLink = styled.a`
  display: inline-block;
  font-size: 12px;
  text-decoration: none;
  color: #aaa;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: color 0.25s ease-in;

  &:hover {
    color: #777;
  }
`;
