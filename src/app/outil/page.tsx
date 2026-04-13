import SentinellePulse from '@/Outil/SentinellePulse';

export const metadata = {
  title: 'Outil de Veille - Sentinelle Pulse',
  description: 'Outil de veille conflits temps réel - Détection 30-120 min avant presse',
};

export default function OutilPage() {
  return <SentinellePulse />;
}
