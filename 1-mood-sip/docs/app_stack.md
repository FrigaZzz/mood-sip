# MoodSip Application Stack Overview

This document describes the **end-to-end architecture, technologies, and pathways** of the MoodSip solution, focusing on modern web features like **Progressive Web App (PWA)**, end-to-end security (SSL, HTTPS, CORS), **BLE/Web Bluetooth** connectivity, and capability for switching between **Edge AI and LLMs** (Ollama/Gemini).

---

## Stack Summary

| Layer/Component         | Technology / File                                           | Highlights                                                  |
|------------------------ |------------------------------------------------------------|-------------------------------------------------------------|
| Web Frontend (PWA)      | React+TS (`App.tsx`, `moodsip_app.tsx`)                    | Mobile-first, BLE integration, PWA/manifest, SSL            |
| BLE & Web Bluetooth     | JS/Web Bluetooth API                                       | Direct secure pairing browser ↔ device                      |
| Edge/Cloud Backend API  | FastAPI (`edge_vision_engine/app/`)                        | SSL, CORS, model switching, LLM proxy (Ollama, Gemini)      |
| Data Engineering        | Python (`data_splitter.py`)                                | Class, label, split automation for ML ops                   |

---

## 1. Web Frontend: Progressive Web App & BLE Integration

- **Mobile First & PWA:** The frontend is a React Progressive Web App (PWA)—responsive by default, installable on mobile, with manifest/icons included.
    - PWA enables home screen access, push notifications, and offline-ready behaviors.
- **Web Bluetooth API:** Enables the webapp to connect directly and securely (over HTTPS/SSL) to the MoodSip device using Bluetooth Low Energy. 
    - User-initiated pairing ensures privacy and compliance with browser security.
    - Data exchanged: sensor feeds, hydration reminders, user controls.
- **SSL/HTTPS:** The webapp is always served over HTTPS for Bluetooth functionality and secure data transfer.
- **App Entrypoint:** 
    - [`App.tsx`](../src/mood-sip-web/src/App.tsx): Renders the main application (`MoodSipApp`).
    - [`moodsip_app.tsx`](../src/mood-sip-web/src/moodsip_app.tsx): Handles BLE connection, device discovery, sensor syncing, and UI logic.
    - Hooks/components manage Bluetooth pairing, message feeds, mobile notifications, and live hydration/statistics.

**Key Features:**
- BLE device scan and connect/disconnect
- Visualization of real-time states from the bottle (timer, mood)
- Push notifications for hydration reminders
- Manifest for home screen install

**Tags:** `#BluetoothLowEnergy #WebBluetooth #SSL #ProgressiveWebApp #MobileFirst`

---

## 2. Edge/Backend Service: Secure FastAPI, Edge/LLM Switch

- **Service Location:** [`edge_vision_engine/app/`](../src/edge_vision_engine/app)
    - Modular FastAPI application serving ML model inference & analytics endpoint.
- **SSL and CORS:** 
    - SSL is configured via `SSL_KEYFILE`, `SSL_CERTFILE` in `config.py` (read from environment). All external communication is HTTPS.
    - CORS is configurable (via `config.py`) to allow specific origins/methods/headers as needed for web/companion/mobile access.
- **Ollama & Gemini LLM Proxy:**
    - Backend can route analysis to integrated LLMs (Ollama local, Gemini API via Google):
        - `default_model` is set in config (supports dynamic switching: e.g. `"gemma3:12b"`, Gemini etc).
        - `ollama_connected` flag in API responses signals if local LLM backend is available.
        - All models tracked in API responses (`available_models`, etc).
    - Enables running either cloud-based or local LLMs, for edge privacy or enhanced reasoning.
- **API/Router:**
    - `/analyze/` for inference requests with images
    - `/health/` — returns both health of the API and LLM backend state (Ollama)
    - Model/feature schemas defined in [`schemas.py`](../src/edge_vision_engine/app/schemas.py)

**App Factory Entrypoint: [`app_factory.py`](../src/edge_vision_engine/app/app_factory.py)**
```python
def create_app() -> FastAPI:
    app = FastAPI(
        title="MoodSip API",
        ...
        lifespan=lifespan_context,
    )
    app.add_middleware(CORSMiddleware, ...)
    app.include_router(analysis_router)
    return app
```
**Tags:** `#EdgeLLM #Ollama #Gemini #SSL #CORS #FastAPI #MLServing`

---

## 3. Data Engineering Pipeline: Automated Dataset Processing

- **File:** [`data_splitter.py`](../src/cloud_inference/database_utils/data_splitter.py)
- **Purpose:** 
    - Organizes images into structured class folders for training ML models.
    - Automates label renaming, dataset splits (train/val/test), sampling, merging, and stats.
    - CLI utility allows for reproducible splits, large-scale data migration, and prepping datasets for onboarding in Focoos/ONNX workflows.
- **Sample Tasks Handled:**
    - Renaming class folders (relabeling)
    - Balancing dataset by moving/copying images
    - Creating synthetic/total class sets
    - Randomized or deterministic deletion of outliers
    - Exporting splits for local/edge/cloud model training

**Tags:** `#DataOps #DatasetSplitting #Labeling #MLPipeline`

---

## 4. Edge/LLM Switch: How It Works

- Both frontend and backend are ready to switch between:
    - **On-device/Edge ML**: For privacy, real-time detection (runs on Arduino Nicla/MCUs).
    - **Web/LLM/Cloud ML**: For richer context and reasoning (Ollama running locally, Gemini via cloud API).
- Model backend is selectable either at API deployment (config), or dynamically via API param (future).
- Webapp can advertise the currently-active backend and give the user feedback about "where" their data is processed.

---

## 5. Security & Privacy

- **SSL/HTTPS Required:** All browser, backend, and BLE traffic is encrypted.
- **CORS Policies:** Strictly enforced to whitelist allowed origin for both BLE and API calls.
- **BLE Web API:** Only discoverable via user-gesture in browser session. No sensitive user data leaves device unless explicitly allowed.

---

## Architecture Diagram

```plaintext
[Mobile PWA/WebApp]
    |
 (HTTPS, CORS, Web Bluetooth)
    |
[FastAPI/Edge-LLM API] <------> [Ollama LLM Local] / [Gemini Cloud API]
    |
[BLE] <----> [Arduino Nicla Vision: Edge ML]
```

---

## References

- [Web Bluetooth API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [FastAPI docs](https://fastapi.tiangolo.com/)
- [Ollama documentation](https://ollama.com/)
- [Google Gemini API](https://ai.google.dev/)
- [PWA features (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- See also core files in [src/](../src) for each layer

---
