import { FeatureFlagControls } from "@/components/FeatureFlagControls";
import { ObservabilityDashboard } from "@/components/ObservabilityDashboard";
import styles from "./decisoes.module.css";

const decisions = [
  {
    title: "Preservar App Router, BFF e integrações existentes",
    context:
      "A aplicação já usa Next.js App Router, Route Handlers e a API oficial; uma reescrita aumentaria o risco sem evidência de necessidade.",
    alternatives:
      "Migrar a aplicação para outra arquitetura ou introduzir microfrontends.",
    consequences:
      "Mantém compatibilidade e entrega incremental; os limites modulares continuam sendo evoluídos por funcionalidade.",
    status: "Aceita",
    date: "2026-10-29",
  },
  {
    title: "Avaliar flags locais por navegador nesta PoC",
    context:
      "Não existe serviço de configuração remota identificado, e o backend não deve ser alterado.",
    alternatives:
      "Usar um serviço remoto ou arquivo público hospedado separadamente.",
    consequences:
      "O controle é editável sem redeploy e persistido no navegador, mas não sincroniza pessoas nem libera grupos. A flag afeta somente a apresentação.",
    status: "Experimental",
    date: "2026-10-29",
  },
  {
    title: "Manter eventos de observabilidade locais",
    context:
      "O projeto não tem integração de monitoramento ou política de envio de eventos configurada.",
    alternatives:
      "Adotar um fornecedor ou enviar eventos a um endpoint próprio.",
    consequences:
      "Erros, Web Vitals e o evento do feed podem ser consultados durante a sessão; os dados não são enviados, persistidos ou monitorados em produção.",
    status: "Experimental",
    date: "2026-10-29",
  },
  {
    title: "Validar respostas de posts no limite da API",
    context:
      "A documentação existente descreve campos da API, mas ainda não havia validação explícita da resposta consumida pelo frontend.",
    alternatives:
      "Confiar apenas em tipos estáticos ou adicionar um validador de schema externo.",
    consequences:
      "O frontend falha explicitamente quando a resposta não tem o formato esperado; o teste baseado em fixture não comprova o contrato do backend real.",
    status: "Experimental",
    date: "2026-10-29",
  },
];

export default function TechnicalDecisionsPage() {
  return (
    <main className={styles.page}>
      <h1>Decisões técnicas</h1>
      <p className={styles.intro}>
        Registro das escolhas desta evolução. As provas de conceito estão
        identificadas como experimentais e não representam serviços de
        produção.
      </p>
      <ol className={styles.decisions}>
        {decisions.map((decision) => (
          <li className={styles.decision} key={decision.title}>
            <h2>{decision.title}</h2>
            <dl>
              <dt>Contexto</dt>
              <dd>{decision.context}</dd>
              <dt>Alternativas</dt>
              <dd>{decision.alternatives}</dd>
              <dt>Consequências</dt>
              <dd>{decision.consequences}</dd>
              <dt>Status</dt>
              <dd>{decision.status}</dd>
              <dt>Data</dt>
              <dd>
                <time dateTime={decision.date}>{decision.date}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <FeatureFlagControls />
      <ObservabilityDashboard />
    </main>
  );
}
