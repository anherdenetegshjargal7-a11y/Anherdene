// Web Audio API Synthesizer for high-fidelity interactive haptic game sounds
// Completely client-side and robust, no external assets needed.

class SoundEffectManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  playCorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      
      // Sparkling success arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);
        
        gain.gain.setValueAtTime(0, t + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, t + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.35);
        
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.4);
      });
    } catch (e) {
      console.warn("Audio Context failed to play correct sound", e);
    }
  }

  playWrong() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.linearRampToValueAtTime(80, t + 0.3);
      
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      
      osc.start(t);
      osc.stop(t + 0.35);
    } catch (e) {
      console.warn("Audio Context failed to play wrong sound", e);
    }
  }

  playHint() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      
      // Magical sparkling frequency sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.25);
      
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      
      osc.start(t);
      osc.stop(t + 0.35);
    } catch (e) {
      console.warn("Audio Context failed to play hint sound", e);
    }
  }

  playTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, t);
      
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      
      osc.start(t);
      osc.stop(t + 0.06);
    } catch (e) {
      console.warn("Audio Context failed to play tick sound", e);
    }
  }

  playGameOver() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.linearRampToValueAtTime(110, t + 0.6);
      
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
      
      osc.start(t);
      osc.stop(t + 0.7);
    } catch (e) {
      console.warn("Audio Context failed to play game over sound", e);
    }
  }
}

export const sounds = new SoundEffectManager();
