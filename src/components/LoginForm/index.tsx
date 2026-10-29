"use client";
import { useState } from "react";
import { AuthFormContainer } from "@/components/AuthFormContainer";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Typography from "@/components/Typography";
import { Button } from "@/components/Button";
import banner from "./banner-login.png";
import { IconArrowFoward } from "@/components/icons/IconArrowFoward";
import { IconAssignement } from "@/components/icons/IconAssignement";
import { Form } from "@/components/Form";
import { Fieldset } from "@/components/Fieldset";
import { TextDivider } from "@/components/TextDivider";
import { Providers } from "@/components/Providers";
import { Link } from "@/components/Link";
import styles from "./login.module.css";

export function LoginForm({ nextPath = "/" }: { nextPath?: string }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          remember: formData.get("remember") === "on",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Não foi possível entrar.");
        return;
      }
      window.location.assign(nextPath);
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthFormContainer bannerSrc={banner}>
      <Typography variant="h1" color="--offwhite">
        Login
      </Typography>
      <Typography variant="h2" color="--offwhite">
        Boas-vindas! Faça seu login.
      </Typography>
      <Form onSubmit={onSubmit}>
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
          <Input name="password" id="password" type="password" required />
          <Checkbox name="remember" label="Lembrar-me" />
        </Fieldset>
        {error && (
          <p role="alert" style={{ color: "#ff8a8a", margin: 0 }}>
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? (
            "Entrando..."
          ) : (
            <>
              Login <IconArrowFoward />
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
          Ainda não tem conta?
        </Typography>
        <Link href="/auth/register">
          <Typography variant="body" color="--highlight-green">
            Crie seu cadastro!
          </Typography>
          <IconAssignement />
        </Link>
      </footer>
    </AuthFormContainer>
  );
}
