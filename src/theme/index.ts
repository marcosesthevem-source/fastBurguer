// src/theme/index.ts

export const theme = {
  colors: {
    // Cores obrigatórias da avaliação
    primary: '#E63946',   // Vermelho (Splash, Botões Principais, Destaques)
    background: '#FFF8F0',// Creme (Fundo padrão de todas as telas)
    secondary: '#2A9D8F', // Verde (Confirmação do Pedido, Badges e Destaques)

    // Cores de apoio para texto e cartões
    textPrimary: '#1D3557',   // Texto escuro principal
    textSecondary: '#6C757D', // Texto de apoio/descrição
    cardBackground: '#FFFFFF',// Fundo de cards e campos
    border: '#E9ECEF',        // Bordas de inputs e divisores
    white: '#FFFFFF',
    disabled: '#ADB5BD',
    error: '#E63946',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 20,
    pill: 50, // Usado nos CategoryPills do cardápio
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 24,
    hero: 32,
  },
};