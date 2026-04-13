# SENTINELLE PULSE - Telegram Scanner

## Installation

```bash
cd /Users/axel/Desktop/sentinelle-pulse-new/src/Outil

# Créer environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate

# Installer dépendances
pip install -r requirements.txt
```

## Configuration

### 1. Obtenir les credentials Telegram

1. Va sur https://my.telegram.org
2. Clique sur "API development tools"
3. Crée une nouvelle application
4. Note ton `api_id` et `api_hash`

### 2. Variables d'environnement

```bash
# Configurer les variables
export TELEGRAM_API_ID="12345678"
export TELEGRAM_API_HASH="your_api_hash_here"
export DISCORD_WEBHOOK="https://discord.com/api/webhooks/..."  # Optionnel
export TELEGRAM_BOT_TOKEN="123456:ABC-..."  # Optionnel - pour notifications
```

Ou crée un fichier `.env`:

```bash
TELEGRAM_API_ID=12345678
TELEGRAM_API_HASH=your_hash_here
DISCORD_WEBHOOK=https://discord.com/api/webhooks/...
TELEGRAM_BOT_TOKEN=123456:ABC-...
```

## Lancement

```bash
source venv/bin/activate
python telegram_scanner.py
```

## Fonctionnalités

- **Scan automatique** de tous les channels Telegram configurés
- **Détection de burst** (alerte quand volume x3 en 10min)
- **Scoring intelligent** avec 2500+ keywords
- **Filtrage faux positifs** (café, prix, etc.)
- **Notifications Discord** (si webhook configuré)
- **Export SQLite** pour analyse historique

## Structure des fichiers

```
Outil/
├── telegram_scanner.py    # Scanner principal
├── requirements.txt       # Dépendances Python
├── sources.json          # Config des channels
├── keywords.json         # Mots-clés de scoring
├── sentinelle.db         # Base de données (créé automatiquement)
└── sentinelle.log        # Logs (créé automatiquement)
```

## Commandes Discord Webhook

Pour recevoir les alertes directement sur Discord:

1. Crée un webhook dans ton serveur Discord
2. Copie l'URL du webhook
3. Exporte: `export DISCORD_WEBHOOK="https://discord.com/api/webhooks/..."`

Les alertes apparaîtront avec:
- Couleur: 🔴 CRITICAL, 🟠 HIGH, 🟡 MEDIUM
- Source, score, URL du post
- Triggers détectés

## API Next.js

L'interface web (`/outil`) peut afficher les données via:

```bash
# Lancer le scanner en arrière-plan
python telegram_scanner.py &

# L'API est disponible sur /api/feed
curl http://localhost:3000/api/feed
```

## Troubleshooting

### Erreur "Session password needed"
```
Crée un fichier session manuellement ou utilise un numéro de téléphone:
client = TelegramClient('session_name', api_id, api_hash)
```

### Channel non trouvé
```
Vérifie que le username est correct (sans @)
 بعض channels nécessitent un accès direct
```

### Rate limiting
```
Le script attend 0.5s entre chaque channel
Incrémente si tu as des erreurs 429
```
