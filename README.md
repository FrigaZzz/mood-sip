<div align="center">
  <img src="img/loghi.png" alt="Hackathon Logos" width="850" />
</div>

<br />

<div align="center">
  <img src="1-mood-sip/assets/logo.png" alt="MoodSip Logo" width="200" />
</div>

# MoodSip — Sip Your Stress Away 🌟

[![YouTube Video Presentation](https://img.shields.io/badge/Video-Demo-red)](https://youtu.be/YI3l9gEI9GM)

**MoodSip** is a smart water bottle that **adapts your hydration rhythm to your needs** by combining water tracking with emotion detection – powered by the Arduino Nicla Vision, Edge AI, and a holistic approach to wellness.

Developed by: [@pitadagosti](https://github.com/pitdagosti), [@davmacario](https://github.com/davmacario), and [@FrigaZzz](https://github.com/frigazzz)  
Tinity Hack | Focus on creativity, well-being, and edge AI.

---

## 🎖️ About This Project

MoodSip is designed to make **hydration smarter** and help you manage stress.  
Most smart bottles only remind you to drink; **MoodSip also senses emotions** and adapts its reminders when you seem stressed, hot, or haven’t had enough water.

<div align="center">
  <img src="1-mood-sip/assets/moodsip-architecture.png" alt="MoodSip System Architecture" width="700" />
</div>

### Why Hydration Matters 💧

- Mild dehydration reduces focus, increases fatigue, irritability, and cortisol spikes.
- Proper hydration = Better physical & mental health.
- Technology can help, but current solutions miss the mind-body connection – **MoodSip fills that gap!**

---

## 🚀 Features

- **Emotion Detection:** Recognizes signs of stress via camera and ML on-board (no cloud).
- **Adaptive Reminders:** Drinking reminders accelerate when you’re stressed or conditions are hot/humid.
- **Smart Intake Estimation:** Uses sensors to track how much you’re *actually* drinking.
- **Interactive LED:** Visual feedback — red for stress, blue to prompt drinking.
- **Completely Offline:** All intelligence runs on Arduino Nicla Vision, no internet required.

<div align="center">
  <img src="1-mood-sip/assets/classification-model.png" alt="Classification Model Diagram" width="600" />
</div>

---

## 🥤 Fun Mode: The Party Game

MoodSip doubles as a party game!
- Keep a poker face; if the camera detects a smile or emotional change, **red LED** lights up and you “lose” – take a sip!
- Brings together social interaction and wellness awareness.

---

## 🏆 Project Impact

- Encourages public health: hydration + stress management.
- Supports well-being for elderly, professionals, athletes.
- Promotes *holistic* wellness — understanding the mind-body connection.
- Potential to reduce dehydration-related health issues.

---

## 👩‍💻 How It Works

### 1. Facial Expressions (Stress Detection)
- Arduino Nicla Vision camera uses FocoosAI model to detect stress (furrowed brows, tired eyes).
- Stressed? LED turns **red** & reminder timer shortens.

### 2. Ambient Temperature & Humidity
- Sensor triggers more frequent reminders when hot/humid.

### 3. Intake Tracking
- Proximity and gyroscope sensors estimate water intake.
- Less intake? Next reminder comes sooner.

> **All logic runs onboard using Edge AI (fully offline).**

---

## ⚙️ Technologies

- **Arduino Nicla Vision:** Camera + sensors + WiFi/BLE
- **Focoos AI:** Computer vision for emotion recognition
- **Zant:** Deployment of quantized ONNX models on MCU
- **ONNX:** Model export format
- **Web App:** For demos and further visualization

---

## 📚 References

- [Dehydration: the enemy of our body](https://medimutua.org/disidratazione-il-nemico-del-nostro-organismo/)
- [Trends in Dehydration in Older People](https://www.mdpi.com/2072-6643/17/2/204)
- [This Simple Everyday Health Tweak Can Help Reduce Anxiety](#)
- [5 Best Smart Water Bottles of 2024](#)
- **Existing products:** HidrateSpark, REBO — track water, but **MoodSip** tracks mood too!

---

## 📝 Technical Overview

For full technical documentation [see here](1-mood-sip/docs/software.md).

---

## 🏅 Hackathon Challenge: Tinity Hack 2025

**This project was developed for the Tinity Hack \[Tiny Hacks\] Edge AI Hackathon!**

- **Challenge:** Build a creative computer vision app using
  - Focoos platform (for model training)
  - ONNX export + quantization
  - Arduino Nicla Vision for deployment
  - Zant for model flashing
- **Submission:** .ino sketch, .onnx file, metadata, docs, slides, and anything extra (web, images, etc.)
- **Judging Trophies:**
  - 🏆 _Impact Trophy_: Most innovative application
  - 💻 _Clean Code Champion_: Best software engineering
  - 🚀 _Technical Trophy_: Most impressive technical solution

[📥 5 slides Template](https://docs.google.com/presentation/d/1c1S4XClzACHqEn-09ESwnSicXFq4gekJ_8vndtCpdOI/edit?usp=sharing)

### h/t to the Tinity Hack organizers for a motivating challenge!
  
---

## 💡 Resources & Credits

- **Focoos Platform:** Model training & ONNX export  
- **Zant:** MCU deployment via quantized ONNX  
- **Arduino Nicla Vision:** Edge AI platform  
- [MoodSip Video Presentation](https://youtu.be/YI3l9gEI9GM)  
- Project repo: [github.com/FrigaZzz/mood-sip](https://github.com/FrigaZzz/mood-sip)  

---

<div align="center" style="font-size:1.2em;">
  <b>Sip your stress away.<br>MoodSip: The water bottle that gets you.</b>
</div>
