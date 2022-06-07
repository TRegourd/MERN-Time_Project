import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { AnyStyledComponent, css } from "styled-components";
import { useSnackbar } from "notistack";
import { IStyledCardProps } from "../Interfaces";
import services from "../services";
import { Button } from "@mui/material";

function Reset() {
  const [body, setBody] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const props = useParams();

  function updateBody(key: string, value: string) {
    setBody({ ...body, [key]: value });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    updateBody(name, value);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const id = props.id;
    services
      .reset(body, id)
      .then(() => {
        enqueueSnackbar("Password successfully reset", {
          variant: "success",
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Incorrect entry !", { variant: "error" });
      });
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
      <CardWrapper>
        <CardHeader>
          <CardHeading>Reset Password</CardHeading>
        </CardHeader>

        <CardBody onChange={handleChange}>
          <CardFieldset>
            <CardInput placeholder="E-mail" type="text" name="email" required />
          </CardFieldset>
          <CardFieldset>
            <CardInput
              placeholder="New Password"
              type="password"
              name="password"
              required
            />
          </CardFieldset>
          <CardFieldset>
            <CardInput
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              required
            />
          </CardFieldset>

          <CardFieldset>
            <Button variant="outlined" onClick={handleSubmit}>
              Reset Password
            </Button>
          </CardFieldset>

          <CardFieldset>
            <CardLink>
              <Link to="/login">{"Go back to login"}</Link>
            </CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
}

export default Reset;

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

const CardIcon: AnyStyledComponent = styled.span`
  color: #666;
  cursor: pointer;
  opacity: 0.25;
  transition: opacity 0.25s ease-in;

  &:hover {
    opacity: 0.95;
  }

  ${(props: IStyledCardProps) =>
    props.big &&
    css`
      font-size: 26px;
    `}

  ${(props: IStyledCardProps) =>
    props.eye &&
    css`
      position: absolute;
      top: 8px;
      right: 0;
    `}

  ${(props: IStyledCardProps) =>
    props.small &&
    css`
      font-size: 14px;
    `}
`;

const CardButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #e5195f;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
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
