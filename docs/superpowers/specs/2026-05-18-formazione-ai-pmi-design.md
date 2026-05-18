# Formazione AI per PMI — Service Design Spec

## Service Overview

Formazione pratica su Claude for Business per PMI di Parma. Positioning: "Non teoria — strumenti che funzionano domani." Quattro livelli da entry point (€597) a abbonamento ricorrente (€297/mese).

## Market Context

**Target**: PMI 1-50 dipendenti a Parma e provincia (~1.500 aziende). Primario: studi commercialisti (dati sensibili, compliance). Secondario: studi dentistici (già contatto AI Receptionist). Terziario: PMI manifatturiere e servizi.

**Concorrenza**: Zero formazione Claude-specific a Parma. Corsi AI generici esistono (TalentLMS, hub formativi) ma sono teorici e non verticali su Claude for Business.

**Pricing rationale**: Corso Excel/PBI 1 giorno = €500-800/persona. Consulenza digitale giornata = €800-1.500. Workshop Claude a €597/3 persone (€50/h testa) è sotto mercato. ROI 29x anche al prezzo rivisto.

## Package Architecture

### Livello 1 — Workshop "AI Start" — €597/azienda (max 3 persone, 4h)

Contenuto:
- Panorama AI per PMI: Claude, ChatGPT, differenze, quando usare cosa
- Demo live: Claude risolve 3 problemi reali portati dai partecipanti
- Pratica: ogni partecipante configura account Claude Pro + primo workflow in aula
- Template: "5 use case AI per la tua azienda" (PDF stampabile)
- Casi reali: PMI italiane che usano Claude (anonymized)

Target: imprenditori che vogliono capire se l'AI serve davvero.

Upsell trigger: "In 4h hai visto cosa fa Claude. In 2 settimane lo integri nei processi."

### Livello 2 — Percorso "AI Operativo" — €1.497/azienda (max 5 persone, 4 sessioni da 2h in 2 settimane)

Contenuto:
- Assessment iniziale: mappatura 5 processi aziendali automatizzabili
- Setup Claude for Business: Projects, Knowledge Base, Custom Instructions
- Knowledge Base: caricamento documenti aziendali (policy, manuali, procedure)
- Integrazione: Google Drive, email, tool stack aziendale
- Workflow su misura per reparti: ricerca, copy, analisi, report
- Prompt library aziendale: prompt pronti per attività quotidiane
- Policy uso AI + compliance: cosa può fare Claude, cosa no

Risultato: Claude operativo su 3 processi reali.

### Livello 3 — Consulenza "AI Transformation" — €2.997/azienda (1 mese, 6 sessioni + supporto Slack 30gg)

Contenuto:
- Audit digitale completo: processi, flussi informativi, tool stack
- Roadmap AI personalizzata 6 mesi: cosa automatizzare, come, risparmio atteso
- API integration: se serve Claude API su processi custom (opzionale)
- Custom Knowledge Base avanzata: documenti aziendali organizzati per dominio
- Formazione interna: chi fa cosa con Claude, ruoli e responsabilità
- Template policy uso AI + compliance documentata
- Report ROI atteso: risparmio ore calcolato su processi mappati

Risultato: Claude embedded nei processi aziendali + roadmap 6 mesi.

### Livello 4 — "AI Update Club" — €297/mese (€247/mese se già cliente formazione)

Target: aziende che hanno completato un corso Livello 1-3.

Cosa include:
- Sessione mensile 60min: novità Claude/OpenAI/ecosistema AI rilevante
- Prompt aggiornati ogni mese (Projects update)
- Watchlist personalizzata: cambiamenti nel settore cliente
- Gruppo Slack esclusivo: scambio tra PMI partecipanti
- Early access guide: quando esce nuovo strumento, guida rapida
- Report trimestrale: "Cosa cambia per la tua azienda"

Logica: L'AI evolve ogni settimana. PMI non possono starci dietro da sole.

## ROI Analysis

### Assumptions

- Fonte dati: stime interne basate su benchmark di produttività con assistenti AI (Microsoft Copilot case studies, Anthropic use case library, Harvard Business Review "Generative AI at Work" 2024)
- Dimensione azienda: 10-20 dipendenti (target PMI)
- Costo ora lavoro: €15/h (stima conservativa impiegato PMI Emilia-Romagna)

### Tabella ROI Annuale

Base: €15/h (stima conservativa impiegato PMI). Range realistico per ruoli professionali: €25-35/h.

| Area | Risparmio h/sett | Freq | €/anno (€15/h) | €/anno (€30/h) |
|---|---|---|---|---|
| Ricerca info interna (documenti, policy, procedure su Drive) | 3h | 48 sett | €2.160 | €4.320 |
| Scrittura email/report (bozze, revisioni, comunicazioni) | 4h | 48 sett | €2.880 | €5.760 |
| Analisi documenti (contratti, fatture, report) | 2h | 48 sett | €1.440 | €2.880 |
| Assistenza clienti (FAQ, risposte standard, primo filtro) | 3h | 48 sett | €2.160 | €4.320 |
| **Totale risparmio annuo** | **12h/sett** | | **€8.640** | **€17.280** |

Nota: il risparmio è calcolato su tempo recuperato, non su fatturato aggiuntivo. ROI reale è più alto se il tempo liberato viene reinvestito in attività a valore (vendite, relazioni clienti).

### ROI per Livello

Range: €8.640 (conservativo €15/h) — €17.280 (realistico €30/h).

| Pacchetto | Investimento | ROI (€15/h) | ROI (€30/h) |
|---|---|---|---|
| Workshop €597 | €597 | 14.5x | 29x |
| Operativo €1.497 | €1.497 | 5.8x | 11.5x |
| Transformation €2.997 | €2.997 | 2.9x | 5.8x |
| Update Club €297/mese | €3.564/anno | 2.4x+ | 4.8x+ |

## Selling Points (per sito)

1. **Dati sicuri** — Claude non si allena sui tuoi dati. GDPR compliant. Critico per commercialisti, legali, sanitari.
2. **Knowledge Base aziendale** — Claude conosce la tua azienda. Non AI generica.
3. **Projects + istruzioni custom** — Output coerente con brand e stile azienda.
4. **Costo accessibile** — Da €20/persona/mese (Claude Team). Parte subito, nessun investimento IT.
5. **Ecosistema in crescita** — Tool calling, MCP, API. Compri oggi, migliora domani.
6. **Formazione Parallelis** — Contesto Parma, problemi reali PMI, soluzioni su misura.

## Website Section Structure

Nuova sezione su `parallelis.it/formazione-ai.html` (o integrata in servizi):

1. **Hero**: "Formazione AI per PMI. Non teoria — strumenti che funzionano domani."
2. **Problema**: 3 card dolore (AI cambia ogni settimana, hai Claude ma non lo usi, dipendenti usano ChatGPT senza controllo)
3. **Il metodo Parallelis**: timeline 3 step (Assessment → Workshop → Risultato misurabile)
4. **Pacchetti**: 4 livelli con pricing
5. **Calcolatore ROI**: blocco interattivo — "12 ore/settimana = €8.640/anno"
6. **Target verticali**: Commercialisti | Dentisti | Manifatturiero | Studi legali
7. **FAQ**: 6 domande (durata, requisiti tecnici, GDPR, confronto ChatGPT, risultati, garanzie)
8. **CTA**: "Prenota chiamata conoscitiva gratuita 15min"

## Target Market (Parma)

- Primario: **Studi commercialisti** — dati sensibili, documenti, compliance, report
- Secondario: **Studi dentistici** — già contatto per AI Receptionist, cross-sell
- Terziario: **PMI manifatturiere** — report tecnici, manuali, comunicazione B2B
- Opportunità: **Studi legali** — ricerca, documenti, contratti

## Future Evolutions (non in scope ora)

- Approccio "Agnostico" (AI Start diventa multi-tool, non solo Claude)
- Video corso online con template scaricabili
- Certificazione "PMI AI Ready" da esporre su sito/email
- Partnership con ordini professionali (commercialisti, avvocati)
