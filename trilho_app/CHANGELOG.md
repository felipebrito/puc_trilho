# Changelog - PUC Trilho [2026-04-27]

## 🛠️ Versão: Estabilidade JSON-First (Ponto Zero)

### 🚀 Novas Funcionalidades
- **Arquitetura de Dados**: Implementado o `design_settings.json` como banco de dados central para coordenadas de layout.
- **Injetor de Estilos Dynamico**: Criado `useEffect` no `App.jsx` que injeta variáveis CSS específicas por espécie (`--devonian-{id}-{prop}`) a cada troca de slide.
- **IDs de Navegação**: Atribuídos IDs persistentes (`intro`, `globe`, `dalmanites`, etc.) para garantir que as coordenadas fiquem atreladas ao conteúdo e não ao índice numérico.

### 🎨 Correções e Alinhamento
- **Restauração Global**: Revertidas mudanças estruturais no `SpecimenDetail.css` que causavam regressões no Devoniano/Carbonífero.
- **Correção Meganeura**: Restaurado alinhamento original (96px Name MT) via injeção de dados estáveis.
- **Blindagem Dalmanites**: Aplicadas as coordenadas finais do chat (Box Top: 926px, TopText: 181px) via JSON.
- **Fix Globo Siluriano**: Corrigido header encavalado e texto sobreposto ao globo (-61px header adjustment).

### 🔒 Segurança de Código
- **Isolamento de Estilos**: Implementado padrão de variáveis CSS por ID, garantindo que alterações em uma página não impactem as outras.
- **Persistência**: Configurações do `DesignEditor` agora refletem o estado real do banco de dados JSON.
