# Poktil

Poktil is a Telegram moderation bot designed to automatically detect and handle toxic messages in Uzbek group chats.

The project focuses on practical moderation problems: message filtering, configurable rules, and reliable behavior in real group environments.

---

## Why Poktil

Telegram communities often lack consistent moderation, especially in Uzbek groups. Poktil addresses this by providing:

- Automated insult detection
- Immediate moderation actions
- Per-chat configurability
- Minimal setup and low overhead

---

## Core Features

- Detects offensive language in Uzbek
- Deletes violating messages in real time
- Issues user warnings
- Supports configurable moderation modes
- Works in large group chats
- Designed for extensibility

---

## Technical Overview

- **Runtime:** Node.js
- **Database:** PostgreSQL
- **Framework:** Telegraf
- **Detection:** Keyword and pattern-based filtering (regex-aware)
- **Deployment:** Webhook-based for reliability
