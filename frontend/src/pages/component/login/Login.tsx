import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import Link from "next/link";

const schema = yup
  .object({
    EmailAddress: yup.string().email().required(),
    Password: yup.string().required(),
  })
  .required();

type LoginData = yup.InferType<typeof schema>;
export default function Login() {
  const objForm = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginData) => {
    fetch("http://localhost:3031/api/public/login", {
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
        <h4>Login</h4>
        <Form onSubmit={objForm.handleSubmit(onSubmit)}>
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
            <Link href="/register">Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
