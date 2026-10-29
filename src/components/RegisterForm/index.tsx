"use client";
import { useState } from "react";
import { AuthFormContainer } from "@/components/AuthFormContainer";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Typography from "@/components/Typography";
import { Button } from "@/components/Button";
import banner from "./banner-register.png";
import { IconArrowFoward } from "@/components/icons/IconArrowFoward";
import { IconLogin } from "@/components/icons/IconLogin";
import { Form } from "@/components/Form";
import { Fieldset } from "@/components/Fieldset";
import { TextDivider } from "@/components/TextDivider";
import { Providers } from "@/components/Providers";
import { Link } from "@/components/Link";
import styles from "./register.module.css";

export function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Não foi possível criar a conta.");
        return;
      }
      window.location.assign("/auth/login");
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthFormContainer bannerSrc={banner}>
      <Typography variant="h1" color="--offwhite">
        Cadastro
      </Typography>
      <Typography variant="h2" color="--offwhite">
        Olá! Preencha seus dados.
      </Typography>
      <Form onSubmit={onSubmit}>
        <Fieldset>
          <Label htmlFor="name">Nome</Label>
          <Input name="name" id="name" placeholder="Nome completo" required />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            required
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="password">Senha</Label>
          <Input
            name="password"
            id="password"
            type="password"
            minLength={6}
            required
          />
        </Fieldset>
        {error && (
          <p role="alert" style={{ color: "#ff8a8a", margin: 0 }}>
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? (
            "Cadastrando..."
          ) : (
            <>
              Cadastrar-se <IconArrowFoward />
            </>
          )}
        </Button>
      </Form>
      <div>
        <TextDivider text="ou entre com outras contas" />
        <Providers />
      </div>
      <footer className={styles.footer}>
        <Typography variant="body" color="--offwhite">
          Já tem conta?
        </Typography>
        <Link href="/auth/login">
          <Typography variant="body" color="--highlight-green">
            Faça seu login!
          </Typography>
          <IconLogin color="#81FE88" />
        </Link>
      </footer>
    </AuthFormContainer>
  );
}
