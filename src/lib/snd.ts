import Snd from 'snd-lib'

const snd = new Snd({ preloadSoundKit: Snd.KITS.SND01 })

export const play = {
  activeButton: () => snd.play(Snd.SOUNDS.BUTTON),
  disableButton: () => snd.play(Snd.SOUNDS.DISABLED),
  toggleOn: () => snd.play(Snd.SOUNDS.TOGGLE_ON),
  toggleOff: () => snd.play(Snd.SOUNDS.TOGGLE_OFF),
  tap: () => snd.play(Snd.SOUNDS.TAP),
  swipe: () => snd.play(Snd.SOUNDS.SWIPE),
  select: () => snd.play(Snd.SOUNDS.SELECT),
  transitionUp: () => snd.play(Snd.SOUNDS.TRANSITION_UP),
  transitionDown: () => snd.play(Snd.SOUNDS.TRANSITION_DOWN),
  progress: () => snd.play(Snd.SOUNDS.PROGRESS_LOOP),
  type: () => snd.play(Snd.SOUNDS.TYPE),
  notification: () => snd.play(Snd.SOUNDS.NOTIFICATION),
  caution: () => snd.play(Snd.SOUNDS.CAUTION),
  celebration: () => snd.play(Snd.SOUNDS.CELEBRATION),
  ringtone: () => snd.play(Snd.SOUNDS.RINGTONE_LOOP),
}

export const stop = {
  progress: () => snd.stop(Snd.SOUNDS.PROGRESS_LOOP),
  ringtone: () => snd.stop(Snd.SOUNDS.RINGTONE_LOOP),
}
