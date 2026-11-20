/**
 * Stylesheet of the picker. It uses the Web client's semantic `--dsw-*`
 * tokens only (the same ones the stock model control and menus use), so
 * light and dark themes need no rules of their own. Every selector is
 * scoped to a `dms-` class.
 */

import { CLASS as C } from './classes.ts'
import { SHEET_MEDIA } from './ModelSwitcher.tsx'

const MONO = 'var(--dsw-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)'

/** The plugin's CSS, injected once while the client plugin is loaded. */
export const MODEL_SWITCHER_CSS = `
@property --dms-effort-pos { syntax: '<number>'; inherits: true; initial-value: 0; }
@property --dms-core-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
@keyframes dmsEffortValueIn {
  0% { opacity: 0; transform: translateY(3px) scale(.8); }
  60% { opacity: 1; transform: translateY(-1px) scale(1.06); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes dmsEffortRise {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dmsThumbSettle {
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(91, 140, 255, 0); }
  35% { transform: scale(1.22); box-shadow: 0 0 20px var(--dms-tier-glow, rgba(91, 140, 255, .85)), 0 0 34px var(--dms-tier-soft, rgba(91, 140, 255, .4)); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(91, 140, 255, 0); }
}
@keyframes dmsFillSheen {
  0% { background-position: -70% 0; }
  100% { background-position: 170% 0; }
}
@keyframes dmsTrackGlow {
  0%, 100% { box-shadow: inset 0 1px 2px rgba(0, 0, 0, .32), 0 0 10px var(--dms-tier-soft, rgba(91, 140, 255, .22)); }
  50% { box-shadow: inset 0 1px 2px rgba(0, 0, 0, .32), 0 0 18px var(--dms-tier-glow, rgba(91, 140, 255, .42)); }
}
@keyframes dmsTierBurst {
  0% { opacity: .95; transform: translate(-50%, -50%) scale(.35); }
  70% { opacity: .5; }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(var(--dms-burst, 1.4)); }
}
@keyframes dmsMaxFlow {
  from { background-position: 0% 0; }
  to { background-position: 300% 0; }
}
@keyframes dmsMaxGlow {
  0%, 100% { box-shadow: inset 0 1px 2px rgba(0, 0, 0, .32), 0 0 14px var(--dms-tier-glow, rgba(91, 140, 255, .42)), 0 0 30px var(--dms-tier-soft, rgba(91, 140, 255, .22)); }
  50% { box-shadow: inset 0 1px 2px rgba(0, 0, 0, .32), 0 0 26px var(--dms-tier-glow, rgba(91, 140, 255, .6)), 0 0 48px var(--dms-tier-soft, rgba(91, 140, 255, .34)); }
}
@keyframes dmsMaxHalo {
  0%, 100% { box-shadow: 0 0 0 4px var(--dms-tier-soft, rgba(91, 140, 255, .18)), 0 0 16px var(--dms-tier-glow, rgba(91, 140, 255, .5)), 0 2px 7px rgba(0, 0, 0, .42); }
  50% { box-shadow: 0 0 0 7px var(--dms-tier-soft, rgba(91, 140, 255, .26)), 0 0 30px var(--dms-tier-glow, rgba(91, 140, 255, .75)), 0 2px 7px rgba(0, 0, 0, .42); }
}
@keyframes dmsMaxOrbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes dmsMaxCoreSpin {
  from { --dms-core-angle: 0deg; }
  to { --dms-core-angle: 360deg; }
}
@keyframes dmsMaxRing {
  0% { opacity: .7; transform: translate(-50%, -50%) scale(1); }
  70% { opacity: .22; }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.32); }
}
@keyframes dmsTickPop {
  0% { transform: translate(-50%, -50%) scale(1); }
  45% { transform: translate(-50%, -50%) scale(1.7); }
  100% { transform: translate(-50%, -50%) scale(1); }
}
.${C.root} {
  position: relative; display: inline-flex; align-items: center; gap: 1px;
  min-width: 0; max-width: min(560px, 62cqw);
}
.${C.trigger} {
  display: flex; align-items: center; gap: 4px; min-width: 0;
  max-width: 220px; max-width: min(320px, 42cqw); height: 28px;
  padding: 0 4px 0 8px; border: none; border-radius: 24px; corner-shape: round; outline: none;
  background: transparent; color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 16px; line-height: 22px; font-weight: 500; cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
}
.${C.trigger}:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); }
.${C.trigger}:focus-visible { box-shadow: 0 0 0 2px var(--dsw-alias-border-l3); }
.${C.trigger}:disabled { color: var(--dsw-alias-label-dimmed); cursor: default; }
.${C.triggerLogo} { display: inline-flex; flex: 0 0 auto; color: var(--dsw-alias-label-secondary); }
.${C.triggerLabel} {
  display: var(--dsh-composer-model-text-display, block); flex: 1 1 auto;
  min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.${C.chevron} { flex: 0 0 auto; color: var(--dsw-alias-label-caption); transition: transform 180ms cubic-bezier(.2, .8, .2, 1); }
.${C.chevron}[data-open] { transform: rotate(180deg); }

.${C.effortRoot} { position: relative; display: inline-flex; flex: 0 0 auto; }
.${C.effortTrigger} {
  display: inline-flex; align-items: center; gap: 3px; height: 28px; padding: 0 6px 0 7px;
  border: none; border-radius: 24px; corner-shape: round; outline: none;
  background: transparent; color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 16px; line-height: 22px; font-weight: 500; cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
}
.${C.effortTrigger}:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); }
.${C.effortTrigger}:focus-visible { box-shadow: 0 0 0 2px var(--dsw-alias-border-l3); }
.${C.effortTrigger}:disabled { color: var(--dsw-alias-label-dimmed); cursor: default; }
.${C.effortTrigger}[data-open] { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.${C.effortTriggerIcon} { display: inline-flex; flex: 0 0 auto; color: #8FB0FF; }
.${C.effortTriggerLabel} { max-width: 72px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.${C.panel} {
  position: fixed; z-index: 1100; box-sizing: border-box;
  display: flex; flex-direction: column; gap: 4px;
  width: min(380px, calc(100vw - 24px));
  height: min(560px, calc(100vh - 96px));
  padding: 10px; border: 0; border-radius: 14px;
  background: var(--dsw-specific-menu);
  backdrop-filter: var(--dsw-menu-backdrop-filter);
  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1);
  box-shadow: var(--dsw-elevation-prominent);
  color: var(--dsw-alias-label-primary);
  font-size: 14px; line-height: 20px;
  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);
  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);
}
.${C.scrim} { position: fixed; inset: 0; z-index: 1099; background: var(--dsw-alias-bg-mask-1); }
.${C.panel}[data-sheet] {
  left: 0; right: 0; bottom: 0; top: auto;
  width: 100%; height: min(88vh, 720px); height: min(88dvh, 720px);
  padding: 8px 12px calc(12px + env(safe-area-inset-bottom, 0px));
  border-radius: 16px 16px 0 0;
  background: var(--dsw-alias-bg-layer-2); backdrop-filter: none;
}
.${C.panel}[data-sheet] .${C.groupTitle} { background: var(--dsw-alias-bg-layer-2); }
.${C.sheetHeader} { display: flex; align-items: center; justify-content: space-between; padding: 2px 2px 4px; }
.${C.sheetTitle} { font-size: 15px; line-height: 22px; font-weight: 600; }
.${C.close} {
  display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: none;
  border-radius: 50%; corner-shape: round; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer;
}
.${C.close}:hover, .${C.close}:focus-visible { background: var(--dsw-alias-interactive-bg-hover); }

.${C.providerBar} { position: relative; flex: 0 0 auto; }
.${C.searchRow} { display: flex; align-items: stretch; gap: 8px; flex: 0 0 auto; }
.${C.searchRow} .${C.providerBar} { flex: 0 1 46%; min-width: 0; }
.${C.searchRow} .${C.modelField} { flex: 1 1 auto; min-width: 0; }
.${C.field} {
  display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 10px;
  border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px;
  background: var(--dsw-alias-bg-module-platform, var(--dsw-alias-interactive-bg-hover));
  color: var(--dsw-alias-label-secondary); cursor: text;
}
.${C.field}:focus-within { box-shadow: 0 0 0 1.5px var(--dsw-alias-border-l3); }
.${C.fieldIcon} { display: inline-flex; flex: 0 0 auto; }
.${C.fieldIcon} svg { width: 16px; height: 16px; }
.${C.input} {
  flex: 1; min-width: 0; height: 100%; padding: 0; border: none; outline: none;
  background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 14px;
}
.${C.input}::placeholder { color: var(--dsw-alias-label-tertiary); opacity: 1; }
.${C.searchHint} { flex: 0 0 auto; color: var(--dsw-alias-label-tertiary); font-family: ${MONO}; font-size: 11px; letter-spacing: .3px; }
.${C.providerBar} .${C.input}::placeholder { color: var(--dsw-alias-label-primary); font-weight: 500; }
.${C.providerBar} .${C.input}:focus::placeholder { color: var(--dsw-alias-label-tertiary); font-weight: 400; }
.${C.providerList} {
  position: absolute; left: 0; top: calc(100% + 4px); z-index: 2;
  width: min(320px, calc(100vw - 40px));
  max-height: min(300px, 60vh); overflow-y: auto; padding: 4px; border-radius: 12px;
  background: var(--dsw-alias-bg-layer-3);
  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1);
  box-shadow: var(--dsw-elevation-panel);
}
.${C.providerList}[hidden] { display: none; }
.${C.providerOption} {
  display: flex; align-items: center; gap: 8px; min-height: 32px; padding: 5px 8px;
  border-radius: 8px; cursor: pointer; color: inherit;
}
.${C.option} {
  position: relative; display: flex; align-items: center; gap: 8px;
  height: 36px; min-height: 36px; padding: 0 10px;
  border-radius: 8px; cursor: pointer; color: inherit;
  transition: background-color 120ms ease, transform 120ms ease;
}
.${C.providerOption}[data-active] { background: var(--dsw-alias-interactive-bg-hover); }
.${C.option}:hover, .${C.option}[data-active] { background: var(--dsw-alias-interactive-bg-hover); }
.${C.option}:active { transform: scale(.99); }
.${C.option}[data-selected] {
  background: rgba(91, 140, 255, .12);
}
.${C.option}[data-selected]:hover { background: var(--dsw-alias-interactive-bg-active, rgba(91, 140, 255, .18)); }
.${C.option}[data-selected]::before {
  content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 2px; height: 16px; border-radius: 2px; background: #5B8CFF;
}
.${C.option}[aria-disabled="true"] { color: var(--dsw-alias-label-dimmed); cursor: default; }
.${C.providerName} { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; }
.${C.providerMeta} { display: inline-flex; align-items: center; gap: 6px; flex: 0 0 auto; color: var(--dsw-alias-label-tertiary); font-size: 12px; }
.${C.status} {
  display: inline-flex; align-items: center; gap: 4px; flex: 0 0 auto; padding: 0 6px; height: 18px;
  border-radius: 9px; corner-shape: round; font-size: 11px; line-height: 16px; font-weight: 500; white-space: nowrap;
}
.${C.status}::before { content: ''; width: 6px; height: 6px; border-radius: 50%; corner-shape: round; background: currentColor; }
.${C.status}[data-status="signed-in"], .${C.status}[data-status="ready"] { color: var(--dsw-alias-state-success-primary, var(--dsw-alias-label-secondary)); }
.${C.status}[data-status="needs-key"] { color: var(--dsw-alias-state-warn-label, var(--dsw-alias-state-warn-primary)); }
.${C.status}[data-status="error"] { color: var(--dsw-alias-state-error-primary); }
.${C.modelField} { flex: 0 0 auto; }

.${C.list} { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 2px 0; }
.${C.group} + .${C.group} { margin-top: 6px; }
.${C.groupTitle} {
  position: sticky; top: 0; z-index: 1; display: flex; align-items: center; gap: 6px;
  height: 24px; padding: 0 8px;
  background: var(--dsw-specific-menu);
  color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 16px; font-weight: 600; letter-spacing: .4px;
}
.${C.groupCount} {
  margin-left: auto; font-family: ${MONO}; font-size: 11px; font-weight: 400;
  letter-spacing: 0; color: var(--dsw-alias-label-tertiary);
}
.${C.optionMain} { display: flex; flex: 1; align-items: center; gap: 6px; min-width: 0; }
.${C.optionName} {
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  color: var(--dsw-alias-label-primary); font-size: 15px; line-height: 22px; font-weight: 500;
}
.${C.group}[data-section="recents"] .${C.option},
.${C.group}[data-section="favorites"] .${C.option} { height: 32px; min-height: 32px; }
.${C.group}[data-section="recents"] .${C.optionName},
.${C.group}[data-section="favorites"] .${C.optionName} { font-size: 14px; line-height: 20px; font-weight: 400; }
.${C.badges} { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 4px; }
.${C.badge} {
  display: inline-flex; align-items: center; height: 16px; padding: 0 4px; border-radius: 5px;
  background: var(--dsw-alias-bg-module-platform, var(--dsw-alias-interactive-bg-hover));
  color: var(--dsw-alias-label-secondary); font-size: 10.5px; line-height: 14px; white-space: nowrap;
}
.${C.badge}[data-badge="context"] { font-family: ${MONO}; }
.${C.star} {
  display: grid; place-items: center; flex: 0 0 20px; width: 20px; height: 20px; padding: 0; border: none;
  border-radius: 6px; background: transparent; color: var(--dsw-alias-label-tertiary); cursor: pointer;
  opacity: 0;
}
.${C.option}:hover .${C.star}, .${C.option}[data-active] .${C.star}, .${C.star}[data-favorite] { opacity: 1; }
.${C.star}[data-favorite] { color: var(--dsw-alias-state-warn-primary); }
.${C.star}:hover { background: var(--dsw-alias-interactive-bg-hover); }
.${C.check} { display: grid; place-items: center; flex: 0 0 14px; color: #5B8CFF; }
.${C.check} svg { width: 14px; height: 14px; }
.${C.logo} { flex: 0 0 auto; color: var(--dsw-alias-label-secondary); border-radius: 3px; object-fit: contain; }
.${C.monogram} {
  display: inline-grid; place-items: center; flex: 0 0 auto; border-radius: 4px;
  background: var(--dsw-alias-bg-module-platform, var(--dsw-alias-interactive-bg-hover));
  color: var(--dsw-alias-label-secondary); font-weight: 600; line-height: 1;
}

.${C.notice} {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
  padding: 6px 8px; border-radius: 8px; flex: 0 0 auto;
  background: var(--dsw-alias-bg-module-platform); color: var(--dsw-alias-state-warn-label);
  font-size: 11px; line-height: 16px;
}
.${C.noticeError} { background: var(--dsw-alias-interactive-bg-hover-danger); color: var(--dsw-alias-state-error-primary); }
.${C.empty} {
  display: flex; flex-direction: column; align-items: flex-start; gap: 6px;
  padding: 12px 8px; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 18px;
}
.${C.link} {
  padding: 0; margin-right: 12px; border: none; background: transparent; color: var(--dsw-alias-link, inherit);
  font: inherit; font-weight: 600; cursor: pointer;
}
.${C.link}:focus-visible { text-decoration: underline dotted; text-underline-offset: 3px; }

.${C.effortPanel} {
  position: fixed; z-index: 1101; box-sizing: border-box;
  display: flex; flex-direction: column; gap: 2px;
  width: min(360px, calc(100vw - 24px));
  padding: 14px 16px 12px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, 0) 46%), var(--dsw-specific-menu);
  backdrop-filter: var(--dsw-menu-backdrop-filter);
  box-shadow: var(--dsw-elevation-prominent), inset 0 1px 0 rgba(255, 255, 255, .06);
  color: var(--dsw-alias-label-primary);
  font-size: 15px; line-height: 22px;
  opacity: 0; visibility: hidden; pointer-events: none;
  transform: translateY(10px) scale(.9); transform-origin: 100% 100%;
  transition: opacity 160ms ease, transform 180ms cubic-bezier(.4, 0, .6, 1), visibility 0s linear 180ms;
}
.${C.effortPanel}[data-state="open"] {
  opacity: 1; visibility: visible; pointer-events: auto;
  transform: translateY(0) scale(1);
  transition: opacity 180ms ease, transform 260ms cubic-bezier(.34, 1.56, .64, 1), visibility 0s;
}
.${C.effortPanel}[data-state="open"] .${C.effortHead} { animation: dmsEffortRise 220ms cubic-bezier(.2, .8, .2, 1) both; }
.${C.effortPanel}[data-state="open"] .${C.effortSlider} { animation: dmsEffortRise 220ms cubic-bezier(.2, .8, .2, 1) 50ms both; }
.${C.effortPanel}[data-state="open"] .${C.effortEnds} { animation: dmsEffortRise 220ms cubic-bezier(.2, .8, .2, 1) 90ms both; }
.${C.effortHead} { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.${C.effortHeadMain} { display: inline-flex; align-items: center; gap: 6px; min-width: 0; }
.${C.effortHeadIcon} { display: inline-flex; flex: 0 0 auto; color: var(--dms-tier, #8FB0FF); }
.${C.effortTitle} { color: var(--dsw-alias-label-secondary); font-size: 15px; line-height: 22px; letter-spacing: .2px; }
.${C.effortValue} {
  padding: 1px 9px; border-radius: 999px;
  background: linear-gradient(135deg, var(--dms-tier-soft, rgba(91, 140, 255, .22)), color-mix(in srgb, var(--dms-tier, #5B8CFF) 10%, transparent));
  box-shadow: 0 0 10px var(--dms-tier-soft, rgba(91, 140, 255, .25)), inset 0 1px 0 rgba(255, 255, 255, .08);
  color: var(--dms-tier-ink, #9DB9FF); font-size: 15px; line-height: 22px; font-weight: 600;
  animation: dmsEffortValueIn 240ms cubic-bezier(.34, 1.56, .64, 1);
}
.${C.effortSlider} {
  position: relative; height: 32px; margin: 8px 0 0;
  transition: --dms-effort-pos 260ms cubic-bezier(.34, 1.56, .64, 1);
}
.${C.effortSlider}:not([data-dragging]):hover .${C.effortThumb} { transform: translate(-50%, -50%) scale(1.08); }
.${C.effortSlider}[data-dragging] { transition: --dms-effort-pos 170ms cubic-bezier(.22, .68, .31, 1); }
.${C.effortSlider}[data-disabled] { opacity: .55; }
.${C.effortSlider}[data-max] .${C.effortTrack}::after {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: calc(12px + (100% - 24px) * var(--dms-effort-pos));
  border-radius: 999px; overflow: hidden; pointer-events: none;
  background: linear-gradient(90deg, #A9C4FF 0%, var(--dms-tier, #FF5B8C) 25%, #8B5BFF 50%, var(--dms-tier, #FF5B8C) 75%, #A9C4FF 100%);
  background-size: 300% 100%;
  mix-blend-mode: screen; opacity: .85;
  animation: dmsMaxFlow 3.2s linear infinite;
}
/* Max-tier spectacle: traveling comet band, energy wave, breathing track glow,
   orbiting thumb sparks, spinning energy core, and a recurring ring pulse.
   All clipped to / centered on the animated fill so they stay synced to the
   thumb;收敛 while dragging; disabled under reduced motion; light-mode tuned. */
.${C.effortSlider}[data-max] .${C.effortTrack}::after {
  background: linear-gradient(90deg, #A9C4FF 0%, var(--dms-tier, #FF5B8C) 22%, #8B5BFF 40%, rgba(255, 255, 255, .95) 50%, #8B5BFF 60%, var(--dms-tier, #FF5B8C) 78%, #A9C4FF 100%);
  background-size: 300% 100%;
  opacity: .95; filter: saturate(1.25);
  animation: dmsMaxFlow 2.2s linear infinite;
}
.${C.effortSlider}[data-max] .${C.effortTrack}::before { opacity: .8; animation: dmsFillSheen 1.5s ease-in-out infinite; }
.${C.effortSlider}[data-max] .${C.effortTrack} { animation: dmsMaxGlow 1.8s ease-in-out infinite; }
.${C.effortSlider}[data-max]:not([data-dragging]) .${C.effortThumb} { animation: dmsMaxHalo 1.6s ease-in-out infinite; }
.${C.effortSlider}[data-max]:not([data-dragging]) .${C.effortThumb}::before {
  content: ''; position: absolute; inset: -7px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle at 50% 2.5px, rgba(255, 255, 255, .95) 0 2px, transparent 3px);
  animation: dmsMaxOrbit 1.8s linear infinite;
}
.${C.effortSlider}[data-max]:not([data-dragging]) .${C.effortThumb}::after {
  content: ''; position: absolute; inset: -11px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle at 50% 2.5px, var(--dms-tier, #FF5B8C) 0 2px, transparent 3px);
  animation: dmsMaxOrbit 2.6s linear infinite reverse;
}
.${C.effortSlider}[data-max]:not([data-dragging]) .${C.effortThumbCore} {
  background: conic-gradient(from var(--dms-core-angle, 0deg), transparent 0 62%, color-mix(in srgb, var(--dms-tier, #FF5B8C) 55%, #FFFFFF) 80%, transparent 96%), radial-gradient(circle at 35% 30%, #FFFFFF, color-mix(in srgb, var(--dms-tier, #5B8CFF) 30%, #FFFFFF) 72%);
  animation: dmsMaxCoreSpin 2.4s linear infinite;
}
.${C.effortSlider}[data-max] .${C.effortBurst} { animation: dmsMaxRing 1.8s cubic-bezier(.2, .7, .3, 1) infinite; }
.${C.effortTrack} {
  position: absolute; left: 0; right: 0; top: 50%; height: 16px; transform: translateY(-50%);
  border-radius: 999px;
  background: linear-gradient(to right, #A9C4FF 0, var(--dms-tier-mid, #6E9BFF) calc((12px + (100% - 24px) * var(--dms-effort-pos)) * .5), var(--dms-tier, #5B8CFF) calc(12px + (100% - 24px) * var(--dms-effort-pos)), rgba(255, 255, 255, .16) calc(12px + (100% - 24px) * var(--dms-effort-pos)), rgba(255, 255, 255, .16) 100%);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, .32), 0 0 12px var(--dms-tier-soft, rgba(91, 140, 255, .3));
  animation: dmsTrackGlow 2.8s ease-in-out infinite;
}
.${C.effortTrack}::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: calc(12px + (100% - 24px) * var(--dms-effort-pos));
  border-radius: 999px; overflow: hidden; pointer-events: none;
  background: linear-gradient(100deg, transparent 0%, rgba(255, 255, 255, .5) 45%, rgba(255, 255, 255, .75) 50%, rgba(255, 255, 255, .5) 55%, transparent 100%);
  background-size: 60% 100%; background-repeat: no-repeat;
  mix-blend-mode: screen; opacity: .55;
  animation: dmsFillSheen 2.4s ease-in-out infinite;
}
.${C.effortTick} {
  position: absolute; top: 50%; left: calc(12px + (100% - 24px) * var(--dms-tick, 0));
  width: 5px; height: 5px; transform: translate(-50%, -50%); border-radius: 50%;
  background: rgba(255, 255, 255, .22); pointer-events: none;
  transition: background-color 160ms ease, box-shadow 160ms ease;
}
.${C.effortTick}[data-passed] { background: var(--dms-tick-color, rgba(255, 255, 255, .95)); box-shadow: 0 0 6px var(--dms-tick-color, rgba(255, 255, 255, .8)); }
.${C.effortTick}[data-current] { box-shadow: 0 0 0 3px var(--dms-tier-soft, rgba(91, 140, 255, .3)), 0 0 9px var(--dms-tick-color, #fff); }
.${C.effortThumb} {
  position: absolute; top: 50%; left: calc(12px + (100% - 24px) * var(--dms-effort-pos));
  width: 24px; height: 24px; transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, .85); border-radius: 50%;
  box-shadow: 0 0 0 4px var(--dms-tier-soft, rgba(91, 140, 255, .18)), 0 0 16px var(--dms-tier-glow, rgba(91, 140, 255, .5)), 0 2px 7px rgba(0, 0, 0, .42);
  pointer-events: none;
  transition: transform 140ms ease, box-shadow 140ms ease;
}
.${C.effortBurst} {
  position: absolute; top: 50%; left: calc(12px + (100% - 24px) * var(--dms-effort-pos));
  width: 26px; height: 26px; transform: translate(-50%, -50%);
  border: 2px solid var(--dms-tier, #5B8CFF); border-radius: 50%;
  box-shadow: 0 0 12px var(--dms-tier-glow, rgba(91, 140, 255, .5)), inset 0 0 8px var(--dms-tier-soft, rgba(91, 140, 255, .3));
  pointer-events: none; opacity: 0;
  animation: dmsTierBurst 520ms cubic-bezier(.2, .7, .3, 1) forwards;
}
.${C.effortThumbCore} {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #FFFFFF, color-mix(in srgb, var(--dms-tier, #5B8CFF) 30%, #FFFFFF) 72%);
  animation: dmsThumbSettle 320ms ease;
}
.${C.effortSlider}[data-dragging] .${C.effortThumbCore} { animation: none; }
.${C.effortSlider}[data-dragging] .${C.effortThumb} { transform: translate(-50%, -50%) scale(1.22); box-shadow: 0 0 0 5px var(--dms-tier-soft, rgba(91, 140, 255, .22)), 0 3px 12px rgba(0, 0, 0, .5), 0 0 22px var(--dms-tier-glow, rgba(91, 140, 255, .7)); }
.${C.effortSlider}[data-dragging] .${C.effortTrack} { box-shadow: inset 0 1px 2px rgba(0, 0, 0, .32), 0 0 22px var(--dms-tier-glow, rgba(91, 140, 255, .5)); }
.${C.effortSlider}[data-dragging] .${C.effortTick}[data-passed] { animation: dmsTickPop 220ms cubic-bezier(.34, 1.56, .64, 1); }
.${C.effortSlider}:focus-within .${C.effortThumb} { box-shadow: 0 0 0 3px var(--dms-tier-soft, rgba(91, 140, 255, .3)), 0 2px 7px rgba(0, 0, 0, .42); }
.${C.effortRange} {
  -webkit-appearance: none; appearance: none; position: absolute; inset: 0;
  width: 100%; height: 100%; margin: 0; padding: 0; border: 0; outline: none;
  background: transparent; cursor: pointer;
}
.${C.effortRange}:disabled { cursor: default; }
.${C.effortRange}::-webkit-slider-runnable-track { height: 16px; background: transparent; box-shadow: none; }
.${C.effortRange}::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none; width: 24px; height: 24px; margin-top: -4px;
  background: transparent; border: 0; box-shadow: none;
}
.${C.effortRange}::-moz-range-track { height: 16px; background: transparent; }
.${C.effortRange}::-moz-range-progress { height: 16px; background: transparent; }
.${C.effortRange}::-moz-range-thumb { width: 24px; height: 24px; background: transparent; border: 0; box-shadow: none; }
.${C.effortEnds} {
  position: relative; height: 18px; margin-top: 6px;
  color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 16px;
}
.${C.effortEnds}[data-many] { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; line-height: 18px; }
.${C.effortScaleLabel} {
  position: absolute; top: 0; left: calc(12px + (100% - 24px) * var(--dms-tick, 0));
  transform: translateX(-50%); white-space: nowrap; transition: color 160ms ease;
}
.${C.effortScaleLabel}[data-edge="start"] { transform: none; }
.${C.effortScaleLabel}[data-edge="end"] { transform: translateX(-100%); }
.${C.effortScaleLabel}[data-current] { color: var(--dms-tier-ink, #9DB9FF); font-weight: 600; }
.${C.panel}[data-centered] { left: 50%; top: max(12px, 12vh); transform: translateX(-50%); }
.${C.pickBar} {
  display: flex; align-items: center; justify-content: space-between; gap: 8px; flex: 0 0 auto;
  padding: 6px 4px 2px; border-top: 0.5px solid var(--dsw-alias-border-l1);
}
.${C.pickCount} { color: var(--dsw-alias-label-secondary); font-size: 12px; }
.${C.done} {
  height: 28px; padding: 0 14px; border: none; border-radius: 14px; corner-shape: round;
  background: var(--dsw-alias-label-primary); color: var(--dsw-alias-bg-layer-1);
  font: inherit; font-size: 12px; font-weight: 600; cursor: pointer;
}
.${C.done}:focus-visible { box-shadow: 0 0 0 2px var(--dsw-alias-border-l3); }
.${C.done}:disabled { cursor: default; opacity: 0.5; }
.${C.hints} {
  display: flex; flex-wrap: nowrap; gap: 12px; flex: 0 0 auto; padding: 4px 4px 0; overflow: hidden; white-space: nowrap;
  color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 16px;
}
.${C.hints} > span { display: inline-flex; align-items: center; gap: 3px; }
.${C.kbd} {
  display: inline-grid; place-items: center; min-width: 16px; height: 16px; padding: 0 3px;
  border-radius: 4px; background: var(--dsw-alias-bg-module-platform, var(--dsw-alias-interactive-bg-hover));
  font: inherit; font-size: 10px;
}
.${C.srOnly} {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
@media ${SHEET_MEDIA} {
  .${C.panel}[data-sheet] .${C.input} { font-size: 16px; }
  .${C.panel}[data-sheet] .${C.field} { height: 40px; }
  .${C.panel}[data-sheet] .${C.option}, .${C.panel}[data-sheet] .${C.providerOption} { min-height: 40px; }
  .${C.panel}[data-sheet] .${C.star} { opacity: 1; }
}
/*
 * Light scheme. The host flips its tokens when body loses [data-ds-dark-theme],
 * but the effort slider was authored for dark surfaces: white-alpha groove and
 * ticks vanish on a light menu, white-mixed tier ink turns pale-on-pale, and
 * screen-blended sheen/flow disappear. Re-derive those from the raw tier hue
 * and the theme label token. The tier vars arrive INLINE on the panel, so the
 * light re-definitions sit on the three inner wrappers (inline would win there).
 */
body:not([data-ds-dark-theme]) .${C.effortHead},
body:not([data-ds-dark-theme]) .${C.effortSlider},
body:not([data-ds-dark-theme]) .${C.effortEnds} {
  --dms-tier-ink: color-mix(in srgb, var(--dms-tier, #5B8CFF) 62%, #141A26);
  --dms-tier-mid: color-mix(in srgb, var(--dms-tier, #5B8CFF) 70%, #33405C);
  --dms-tier-soft: color-mix(in srgb, var(--dms-tier, #5B8CFF) 22%, transparent);
  --dms-tier-glow: color-mix(in srgb, var(--dms-tier, #5B8CFF) 36%, transparent);
}
body:not([data-ds-dark-theme]) .${C.effortPanel} {
  background: linear-gradient(180deg, rgba(255, 255, 255, .65), rgba(255, 255, 255, 0) 46%), var(--dsw-specific-menu);
  box-shadow: var(--dsw-elevation-prominent), inset 0 1px 0 rgba(255, 255, 255, .8);
}
body:not([data-ds-dark-theme]) .${C.effortTrack} {
  background: linear-gradient(to right, color-mix(in srgb, var(--dms-tier, #5B8CFF) 55%, #7C9BE0) 0, var(--dms-tier-mid, #6E9BFF) calc((12px + (100% - 24px) * var(--dms-effort-pos)) * .5), var(--dms-tier, #5B8CFF) calc(12px + (100% - 24px) * var(--dms-effort-pos)), color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent) calc(12px + (100% - 24px) * var(--dms-effort-pos)), color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent) 100%);
  box-shadow: inset 0 1px 2px rgba(20, 26, 38, .18), 0 0 12px var(--dms-tier-soft, rgba(91, 140, 255, .22));
}
body:not([data-ds-dark-theme]) .${C.effortSlider}[data-dragging] .${C.effortTrack} { box-shadow: inset 0 1px 2px rgba(20, 26, 38, .2), 0 0 22px var(--dms-tier-glow, rgba(91, 140, 255, .36)); }
body:not([data-ds-dark-theme]) .${C.effortTrack}::before { mix-blend-mode: normal; opacity: .38; }
body:not([data-ds-dark-theme]) .${C.effortSlider}[data-max] .${C.effortTrack}::after { mix-blend-mode: multiply; opacity: .5; }
body:not([data-ds-dark-theme]) .${C.effortSlider}[data-max] .${C.effortThumb}::before,
body:not([data-ds-dark-theme]) .${C.effortSlider}[data-max] .${C.effortThumb}::after { opacity: .7; }
body:not([data-ds-dark-theme]) .${C.effortSlider}[data-max] .${C.effortTrack} { filter: saturate(1.05); }
body:not([data-ds-dark-theme]) .${C.effortTick} { background: color-mix(in srgb, var(--dsw-alias-label-primary) 26%, transparent); }
body:not([data-ds-dark-theme]) .${C.effortThumb} { border-color: color-mix(in srgb, var(--dms-tier, #5B8CFF) 68%, #1E2637); }
body:not([data-ds-dark-theme]) .${C.effortThumbCore} { background: radial-gradient(circle at 35% 30%, #FFFFFF, color-mix(in srgb, var(--dms-tier, #5B8CFF) 55%, #FFFFFF) 72%); }
body:not([data-ds-dark-theme]) .${C.effortValue} { box-shadow: 0 0 10px var(--dms-tier-soft, rgba(91, 140, 255, .25)), inset 0 1px 0 rgba(255, 255, 255, .65); }
body:not([data-ds-dark-theme]) .${C.input}::placeholder { color: var(--dsw-alias-label-tertiary); }
body:not([data-ds-dark-theme]) .${C.searchHint} { color: var(--dsw-alias-label-tertiary); }
@media (prefers-reduced-motion: reduce) {
  .${C.chevron} { transition: none; }
  .${C.effortPanel}, .${C.effortPanel}[data-state="open"] { transition: none; }
  .${C.effortPanel}[data-state="open"] .${C.effortHead},
  .${C.effortPanel}[data-state="open"] .${C.effortSlider},
  .${C.effortPanel}[data-state="open"] .${C.effortEnds} { animation: none; }
  .${C.effortValue} { animation: none; }
  .${C.effortThumbCore} { animation: none; }
  .${C.effortTrack} { animation: none; }
  .${C.effortTrack}::before { animation: none; opacity: 0; }
  .${C.effortSlider}[data-dragging] .${C.effortTick}[data-passed] { animation: none; }
  .${C.effortBurst} { animation: none; opacity: 0; }
  .${C.effortSlider}[data-max] .${C.effortTrack}::after { animation: none; opacity: 0; }
  .${C.effortSlider}[data-max] .${C.effortTrack} { animation: none; }
  .${C.effortSlider}[data-max] .${C.effortThumb} { animation: none; }
  .${C.effortSlider}[data-max] .${C.effortThumb}::before,
  .${C.effortSlider}[data-max] .${C.effortThumb}::after { animation: none; opacity: 0; }
  .${C.effortSlider}[data-dragging] { transition: none; }
  .${C.effortTick} { transition: none; }
  .${C.effortSlider}, .${C.effortThumb} { transition: none; }
  .${C.option}, .${C.providerOption} { transition: none; }
  .${C.option}:active { transform: none; }
  /* keep the centering translate; only drop the hover lift */
  .${C.effortSlider}:not([data-dragging]):hover .${C.effortThumb} { transform: translate(-50%, -50%); }
}
@media (max-width: 520px) {
  .${C.effortScaleLabel}:not([data-edge]) { display: none; }
  .${C.effortPanel} { width: calc(100vw - 16px); }
}
`

/**
 * Optional host-composer restyle, gated by the `composerRestyle` setting
 * (default OFF). These selectors are host-global: shipping them unconditionally
 * would force this plugin's typography/geometry on every installer, so they
 * live in a separate sheet the client only mounts when the user opts in.
 */
export const COMPOSER_RESTYLE_CSS = `
/*
 * Composer input-bar typography, one tier up. The input/placeholder inherit the
 * host content size; lift them and the stock toolbar buttons while leaving this
 * plugin's own triggers to their own rules.
 */
[data-composer-input], [data-composer-placeholder] { font-size: 20px !important; }
[data-composer-card] button:not([data-model-switcher-trigger]):not([data-model-switcher-effort]) { font-size: 14px !important; }
/*
 * Composer geometry & feedback (design-only). The host ships a single-line
 * 36px prompt inside a ~98px card, which reads cramped; give the prompt region
 * ~2.5 lines of air at the 30px line rhythm, a calmer 20px radius, a focus ring
 * on the whole card, and press/hover feedback on its buttons. No layout logic
 * is touched: auto-grow and toolbar wrapping stay host-owned.
 */
[data-composer-card] { padding-top: 10px !important; border-radius: 20px !important; transition: box-shadow 160ms ease; }
[data-composer-card]:focus-within { box-shadow: 0 0 0 1.5px var(--dsw-alias-border-l3), 0 4px 16px rgba(0, 0, 0, .18) !important; }
[data-composer-input] { min-height: 76px !important; line-height: 30px !important; padding: 6px 12px 0 !important; }
[data-composer-placeholder] { line-height: 30px !important; padding-top: 6px !important; }
[data-composer-card] > div:last-child { padding: 4px 10px 8px !important; gap: 8px !important; row-gap: 6px !important; }
[data-composer-card] button { transition: background-color 120ms ease, color 120ms ease, transform 120ms ease, box-shadow 120ms ease; }
[data-composer-card] button:active { transform: scale(.95); }
/* Only the send button lifts on hover: every toolbar control is a :last-child
   of its own group, so a descendant button:last-child would balloon all six. */
[data-composer-card] > div:last-child > *:last-child > button:last-child:hover { transform: scale(1.06); }
@media (max-width: 700px) {
  [data-composer-input], [data-composer-placeholder] { font-size: 18px !important; line-height: 27px !important; }
  [data-composer-input] { min-height: 60px !important; }
}
/* Trailing reduced-motion for the composer feedback (must follow it). */
@media (prefers-reduced-motion: reduce) {
  [data-composer-card], [data-composer-card] button { transition: none; }
  [data-composer-card] button:hover, [data-composer-card] button:active { transform: none; }
}
`
