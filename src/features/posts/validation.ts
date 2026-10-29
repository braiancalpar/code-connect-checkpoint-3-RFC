export interface PostFormValues {
  title: string;
  body: string;
  hasImage: boolean;
}
export function validatePostForm({
  title,
  body,
  hasImage,
}: PostFormValues): string {
  if (!title.trim()) return "Informe o nome do projeto.";
  if (!body.trim()) return "Informe a descrição do projeto.";
  if (!hasImage) return "Selecione uma imagem para o projeto.";
  return "";
}
