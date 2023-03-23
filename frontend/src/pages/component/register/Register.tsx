import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

import Link from "next/link";

const schema = yup
  .object({
    Name: yup.string().required(),
    EmailAddress: yup.string().email().required(),
    Password: yup.string().required(),
  })
  .required();

type RegisterData = yup.InferType<typeof schema>;
function Register() {
  const objForm = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterData) => {
    fetch("http://localhost:3031/api/public/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((item) => item.json())
      .then((item) => {
        if (item.status === true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${item.message}`,
          });
        }
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "25px 60px 25px 60px",
          width: "40%",
          border: "1px solid white",
          borderRadius: "25px",
        }}
      >
        <h4>Register</h4>
        <form onSubmit={objForm.handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              {...objForm.register("Name")}
            />
            <Form.Text className="text-muted">
              <p style={{ color: "red" }}>
                {objForm.formState.errors.Name?.message}
              </p>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...objForm.register("EmailAddress")}
            />
            <Form.Text className="text-muted">
              <p style={{ color: "red" }}>
                {objForm.formState.errors.EmailAddress?.message}
              </p>
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...objForm.register("Password")}
            />
            <Form.Text className="text-muted">
              <p style={{ color: "red" }}>
                {objForm.formState.errors.Password?.message}
              </p>
            </Form.Text>
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
          <div>
            <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
