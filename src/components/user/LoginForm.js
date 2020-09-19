import React, { useContext } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LOGIN_USER } from "../../library/mutation";
import { VendorContext } from "../../context/VendorContext";
import GuestAuthentication from "../GuestAuthentication";

export default function LoginForm() {
  const client = useApolloClient();
  const { closeModal } = useContext(VendorContext);
  const [mutation, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser }) {
      localStorage.setItem("token", loginUser.token);
      localStorage.setItem("currentUser", loginUser.user.email);
      localStorage.setItem("role", "USER");
      closeModal(true);
      client.writeData({
        data: {
          isLoggedIn: true,
          currentUser: loginUser.user.email,
          role: "USER",
        },
      });
    },
  });

  const handleGuestLogin = () => {
    mutation({
        variables: {
          input: {
            email: "demo@user.io",
            password: "demo21",
          },
        },
    })
  }
  return (
    <div>
      {error && (
        <pre>
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={(values) => {
          mutation({ variables: { input: values } });
        }}
      >
        <Form className="authForm">
          <label htmlFor="email"></label>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />

          <label htmlFor="password"></label>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" />

          <button disabled={loading} type="submit">
            {loading ? "Logging In..." : "Log In"}
          </button>
        </Form>
      </Formik>

      {/* guest loginUser */}
      <GuestAuthentication loading={loading} login={handleGuestLogin}/>
      
    </div>
  );
}
